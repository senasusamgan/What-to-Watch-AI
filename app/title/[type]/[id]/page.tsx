import Image from "next/image";
import Link from "next/link";
import { getDetails } from "@/lib/tmdb";

export default async function TitleDetail({
  params,
}: {
  params: Promise<{
    type: "movie" | "tv";
    id: string;
  }>;
}) {
  const { type, id } = await params;
  const item = await getDetails(type, id);

  const title = item.title || item.name || "Unknown title";
  const releaseDate = item.release_date || item.first_air_date;
  const year = releaseDate ? releaseDate.slice(0, 4) : "N/A";

  const duration =
    type === "movie"
      ? item.runtime
      : item.episode_run_time?.[0];

  const trailer =
    item.videos?.results?.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer" &&
        video.official
    ) ||
    item.videos?.results?.find(
      (video: any) =>
        video.site === "YouTube" &&
        video.type === "Trailer"
    ) ||
    item.videos?.results?.find(
      (video: any) => video.site === "YouTube"
    );

  const cast =
    item.credits?.cast
      ?.filter((person: any) => person.profile_path)
      .slice(0, 10) || [];

  const recommendations =
    item.recommendations?.results
      ?.filter((recommendation: any) => recommendation.poster_path)
      .slice(0, 10) || [];

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Sinematik üst alan */}
      <section className="relative min-h-[720px] overflow-hidden">
        {item.backdrop_path && (
          <Image
            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
            alt={`${title} background`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
          <Link
            href="/"
            className="inline-flex items-center rounded-full border border-white/20 bg-black/40 px-5 py-2 text-sm backdrop-blur-md transition hover:border-red-500 hover:text-red-400"
          >
            ← Back to home
          </Link>

          <div className="mt-12 grid items-end gap-10 md:grid-cols-[280px_1fr]">
            <div className="hidden md:block">
              {item.poster_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={title}
                  width={500}
                  height={750}
                  priority
                  className="w-full rounded-3xl border border-white/10 object-cover shadow-2xl shadow-black"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center rounded-3xl bg-zinc-900 text-zinc-500">
                  No poster
                </div>
              )}
            </div>

            <div className="max-w-4xl pb-4">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-red-500">
                {type === "movie" ? "Movie" : "TV Show"}
              </p>

              <h1 className="text-5xl font-black tracking-tight md:text-7xl">
                {title}
              </h1>

              {item.tagline && (
                <p className="mt-4 text-xl italic text-zinc-300">
                  “{item.tagline}”
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm font-semibold">
                <span className="rounded-full bg-yellow-500 px-4 py-2 text-black">
                  ⭐{" "}
                  {typeof item.vote_average === "number"
                    ? item.vote_average.toFixed(1)
                    : "N/A"}
                </span>

                <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                  {year}
                </span>

                {duration && (
                  <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                    {duration} min
                  </span>
                )}

                {type === "tv" && item.number_of_seasons && (
                  <span className="rounded-full border border-white/20 bg-black/40 px-4 py-2 backdrop-blur-md">
                    {item.number_of_seasons}{" "}
                    {item.number_of_seasons === 1
                      ? "season"
                      : "seasons"}
                  </span>
                )}
              </div>

              {item.genres?.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {item.genres.map(
                    (genre: { id: number; name: string }) => (
                      <span
                        key={genre.id}
                        className="rounded-full border border-zinc-600 bg-zinc-950/60 px-4 py-2 text-sm text-zinc-200 backdrop-blur-md"
                      >
                        {genre.name}
                      </span>
                    )
                  )}
                </div>
              )}

              <p className="mt-8 max-w-3xl text-lg leading-8 text-zinc-200">
                {item.overview ||
                  "No description is available for this title."}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {trailer && (
                  <a
                    href="#trailer"
                    className="rounded-2xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
                  >
                    ▶ Watch trailer
                  </a>
                )}

                <Link
                  href="/"
                  className="rounded-2xl border border-white/20 bg-white/10 px-7 py-4 font-bold backdrop-blur-md transition hover:bg-white/20"
                >
                  Browse titles
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-20 px-6 pb-20">
        {/* Fragman */}
        {trailer && (
          <section id="trailer" className="scroll-mt-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red-600" />
              <h2 className="text-3xl font-bold">Official Trailer</h2>
            </div>

            <div className="aspect-video overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl">
              <iframe
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title={`${title} trailer`}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* Oyuncular */}
        {cast.length > 0 && (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red-600" />
              <h2 className="text-3xl font-bold">Cast</h2>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
              {cast.map((person: any) => (
                <article
                  key={person.id}
                  className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950"
                >
                  <div className="relative aspect-[2/3]">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold">{person.name}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {person.character || "Unknown role"}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Öneriler */}
        {recommendations.length > 0 && (
          <section>
            <div className="mb-6 flex items-center gap-3">
              <div className="h-8 w-1 rounded-full bg-red-600" />
              <h2 className="text-3xl font-bold">
                You May Also Like
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-5">
              {recommendations.map((recommendation: any) => {
                const recommendationTitle =
                  recommendation.title ||
                  recommendation.name ||
                  "Unknown title";

                const recommendationType =
                  recommendation.media_type === "tv"
                    ? "tv"
                    : type;

                return (
                  <Link
                    key={recommendation.id}
                    href={`/title/${recommendationType}/${recommendation.id}`}
                    className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 transition hover:-translate-y-1 hover:border-red-500"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden">
                      <Image
                        src={`https://image.tmdb.org/t/p/w500${recommendation.poster_path}`}
                        alt={recommendationTitle}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                        className="object-cover transition duration-300 group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="line-clamp-2 font-bold">
                        {recommendationTitle}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-400">
                        ⭐{" "}
                        {typeof recommendation.vote_average === "number"
                          ? recommendation.vote_average.toFixed(1)
                          : "N/A"}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}