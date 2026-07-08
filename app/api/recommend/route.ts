import OpenAI from "openai";
import { z } from "zod";
import { zodTextFormat } from "openai/helpers/zod";
import { searchTitles } from "@/lib/tmdb";

const MAX_PROMPT_LENGTH = 400;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const FilmRecommendations = z.object({
  recommendations: z
    .array(
      z.object({
        title: z.string(),
        type: z.enum(["movie", "tv"]),
        year: z.number().int(),
        reason: z.string(),
      })
    )
    .length(3),
});

function getReleaseYear(item: any) {
  const releaseDate = item.release_date || item.first_air_date || "";
  return releaseDate ? Number(releaseDate.slice(0, 4)) : null;
}

export async function POST(request: Request) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return Response.json(
        { error: "OPENAI_API_KEY bulunamadı. .env.local dosyasını kontrol et." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as {
      prompt?: unknown;
    };

    const prompt = typeof body.prompt === "string" ? body.prompt.trim() : "";

    if (!prompt) {
      return Response.json(
        { error: "Lütfen nasıl bir şey izlemek istediğini yaz." },
        { status: 400 }
      );
    }

    if (prompt.length > MAX_PROMPT_LENGTH) {
      return Response.json(
        {
          error:
            "Mesaj çok uzun. Lütfen 400 karakterden kısa bir istek yaz.",
        },
        { status: 400 }
      );
    }

    const response = await openai.responses.parse({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content: `
You are an expert movie and television recommendation assistant.

Recommend exactly 3 existing movies or TV shows matching the user's request.

Rules:
- Recommend real, released titles.
- Use each title's official English name so it can be found on TMDB.
- Do not recommend the same title more than once.
- Set type to "movie" or "tv".
- Include the original release year.
- Give a short, specific reason for every recommendation.
- Respect requested mood, genre, length, era, and content preferences.
          `.trim(),
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      text: {
        format: zodTextFormat(FilmRecommendations, "film_recommendations"),
      },
    });

    const parsed = response.output_parsed;

    if (!parsed) {
      return Response.json(
        { error: "AI geçerli bir öneri listesi oluşturamadı." },
        { status: 500 }
      );
    }

    const recommendations = await Promise.all(
      parsed.recommendations.map(async (recommendation) => {
        try {
          const tmdbData = await searchTitles(recommendation.title);

          const validResults =
            tmdbData.results?.filter(
              (item: any) =>
                item.media_type === "movie" || item.media_type === "tv"
            ) || [];

          const sameTypeResults = validResults.filter(
            (item: any) => item.media_type === recommendation.type
          );

          const exactMatch = sameTypeResults.find(
            (item: any) => getReleaseYear(item) === recommendation.year
          );

          const match = exactMatch || sameTypeResults[0] || validResults[0];

          if (!match) {
            return {
              ...recommendation,
              tmdbId: null,
              posterPath: null,
              voteAverage: null,
            };
          }

          return {
            ...recommendation,
            type: match.media_type === "tv" ? "tv" : "movie",
            tmdbId: match.id,
            posterPath: match.poster_path || null,
            voteAverage:
              typeof match.vote_average === "number"
                ? match.vote_average
                : null,
          };
        } catch (error) {
          console.error(`TMDB match error for ${recommendation.title}:`, error);

          return {
            ...recommendation,
            tmdbId: null,
            posterPath: null,
            voteAverage: null,
          };
        }
      })
    );

    return Response.json({ recommendations });
  } catch (error) {
    console.error("Recommendation API error:", error);

    return Response.json(
      { error: "Öneriler oluşturulurken bir hata meydana geldi." },
      { status: 500 }
    );
  }
}