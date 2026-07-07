const TMDB_BASE_URL = "https://api.themoviedb.org/3";

function getAccessToken() {
  const token = process.env.TMDB_ACCESS_TOKEN?.trim();

  if (!token) {
    throw new Error(
      "TMDB_ACCESS_TOKEN bulunamadı. .env.local dosyasını kontrol et."
    );
  }

  return token;
}

async function fetchFromTMDB(
  endpoint: string,
  params: Record<string, string> = {}
) {
  const searchParams = new URLSearchParams({
    language: "en-US",
    ...params,
  });

  const url = `${TMDB_BASE_URL}${endpoint}?${searchParams.toString()}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (!response.ok) {
    const errorDetails = await response.text();

    console.error("TMDB API error:", {
      endpoint,
      status: response.status,
      details: errorDetails,
    });

    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function getTrending() {
  return fetchFromTMDB("/trending/all/day");
}

export async function searchTitles(query: string) {
  const cleanedQuery = query.trim();

  if (!cleanedQuery) {
    return {
      page: 1,
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }

  return fetchFromTMDB("/search/multi", {
    query: cleanedQuery,
    include_adult: "false",
  });
}

export async function getDetails(
  type: "movie" | "tv",
  id: string
) {
  if (type !== "movie" && type !== "tv") {
    throw new Error("Invalid media type");
  }

  if (!id || !/^\d+$/.test(id)) {
    throw new Error("Invalid TMDB ID");
  }

  const [details, watchProviders] = await Promise.all([
    fetchFromTMDB(`/${type}/${id}`, {
      append_to_response: "videos,credits,recommendations",
    }),

    fetchFromTMDB(`/${type}/${id}/watch/providers`),
  ]);

  return {
    ...details,
    watchProviders,
  };
}