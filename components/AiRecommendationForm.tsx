"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";

type Recommendation = {
  title: string;
  type: "movie" | "tv";
  year: number;
  reason: string;
  tmdbId: number | null;
  posterPath: string | null;
  voteAverage: number | null;
};

export default function AiRecommendationForm() {
  const t = useTranslations("AIForm");

  const [prompt, setPrompt] = useState("");
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const cleanedPrompt = prompt.trim();

    if (!cleanedPrompt) {
      setError(t("emptyError"));
      return;
    }

    setLoading(true);
    setError("");
    setRecommendations([]);

    try {
      const response = await fetch("/api/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: cleanedPrompt,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || t("fetchError"));
      }

      setRecommendations(data.recommendations);
    } catch (error) {
      setError(error instanceof Error ? error.message : t("unexpectedError"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 md:p-8">
      <p className="text-sm font-bold uppercase tracking-[0.3em] text-red-500">
        {t("label")}
      </p>

      <h2 className="mt-3 text-3xl font-bold">{t("title")}</h2>

      <p className="mt-3 max-w-2xl text-zinc-400">{t("description")}</p>

      <form onSubmit={handleSubmit} className="mt-6">
        <textarea
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
          placeholder={t("placeholder")}
          rows={4}
          className="w-full resize-none rounded-2xl border border-zinc-700 bg-black px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-red-500"
        />

        <button
          type="submit"
          disabled={loading || !prompt.trim()}
          className="mt-4 rounded-2xl bg-red-600 px-7 py-4 font-bold transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? t("loading") : t("submit")}
        </button>
      </form>

      {error && (
        <p className="mt-5 rounded-2xl border border-red-900 bg-red-950/40 p-4 text-red-300">
          {error}
        </p>
      )}

      {recommendations.length > 0 && (
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {recommendations.map((recommendation) => {
            const cardContent = (
              <>
                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
                  {recommendation.posterPath ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${recommendation.posterPath}`}
                      alt={`${recommendation.title} poster`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center px-6 text-center text-zinc-500">
                      {t("noPoster")}
                    </div>
                  )}

                  {recommendation.voteAverage !== null && (
                    <span className="absolute right-3 top-3 rounded-full bg-black/80 px-3 py-2 text-sm font-bold backdrop-blur-md">
                      ⭐ {recommendation.voteAverage.toFixed(1)}
                    </span>
                  )}
                </div>

                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-widest text-red-500">
                    {recommendation.type === "movie" ? t("movie") : t("tvShow")}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {recommendation.title}
                  </h3>

                  <p className="mt-2 text-sm text-zinc-500">
                    {recommendation.year}
                  </p>

                  <p className="mt-4 leading-7 text-zinc-300">
                    {recommendation.reason}
                  </p>

                  {recommendation.tmdbId && (
                    <p className="mt-5 text-sm font-semibold text-red-400">
                      {t("viewDetails")} →
                    </p>
                  )}
                </div>
              </>
            );

            return recommendation.tmdbId ? (
              <Link
                key={`${recommendation.type}-${recommendation.tmdbId}`}
                href={`/title/${recommendation.type}/${recommendation.tmdbId}`}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-black transition hover:-translate-y-1 hover:border-red-500"
              >
                {cardContent}
              </Link>
            ) : (
              <article
                key={`${recommendation.type}-${recommendation.title}-${recommendation.year}`}
                className="group overflow-hidden rounded-3xl border border-zinc-800 bg-black"
              >
                {cardContent}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}