import Image from "next/image";
import AiRecommendationForm from "@/components/AiRecommendationForm";
import { getTrending, searchTitles } from "@/lib/tmdb";
import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
  searchParams,
}: {
  params: Promise<{ locale: "en" | "tr" }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("Home");

  const sp = await searchParams;
  const query = sp.q?.trim() || "";

  const data = query
    ? await searchTitles(query, locale)
    : await getTrending(locale);

  const results = data.results.filter(
    (item: any) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      item.poster_path
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-6 flex justify-end gap-3 text-sm">
          <Link href="/" locale="tr" className="text-zinc-400 hover:text-white">
            🇹🇷 TR
          </Link>
          <Link href="/" locale="en" className="text-zinc-400 hover:text-white">
            🇬🇧 EN
          </Link>
        </div>

        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.35em] text-red-500">
          Movie & TV Recommendations
        </p>

        <h1 className="text-4xl font-bold md:text-6xl">
          🎬 What to Watch AI
        </h1>

        <p className="mt-4 text-lg text-zinc-400">{t("subtitle")}</p>

        <AiRecommendationForm />

        <form className="mt-12 flex max-w-2xl gap-3">
          <input
            name="q"
            defaultValue={query}
            placeholder={t("placeholder")}
            className="w-full rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
          />

          <button
            type="submit"
            className="rounded-2xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500"
          >
            {t("button")}
          </button>
        </form>

        <h2 className="mb-7 mt-12 text-2xl font-bold">
          {query ? `${t("searchResults")} “${query}”` : t("trending")}
        </h2>

        {results.length === 0 ? (
          <p className="text-zinc-400">{t("noTitles")}</p>
        ) : (
          <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {results.slice(0, 15).map((item: any) => {
              const title = item.title || item.name || "Unknown title";
              const type = item.media_type === "tv" ? "tv" : "movie";

              return (
                <Link
                  key={`${type}-${item.id}`}
                  href={`/title/${type}/${item.id}`}
                  className="group relative block cursor-pointer overflow-hidden rounded-3xl border border-zinc-900 bg-zinc-950 transition hover:-translate-y-1 hover:border-red-500"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden">
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                      alt={title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="p-4">
                    <p className="mb-2 text-xs font-bold uppercase text-red-500">
                      {type === "movie" ? t("movie") : t("tvShow")}
                    </p>

                    <h3 className="line-clamp-2 text-lg font-bold">{title}</h3>

                    <p className="mt-2 text-sm text-zinc-400">
                      ⭐{" "}
                      {typeof item.vote_average === "number"
                        ? item.vote_average.toFixed(1)
                        : "N/A"}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}