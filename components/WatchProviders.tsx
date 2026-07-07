import Image from "next/image";

type Provider = {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
};

type CountryWatchProviders = {
  link?: string;
  flatrate?: Provider[];
  free?: Provider[];
  ads?: Provider[];
  rent?: Provider[];
  buy?: Provider[];
};

type WatchProvidersProps = {
  providers?: CountryWatchProviders;
};

export default function WatchProviders({
  providers,
}: WatchProvidersProps) {
  const groups = [
    {
      key: "flatrate",
      title: "Abonelikle İzle",
      providers: providers?.flatrate ?? [],
    },
    {
      key: "free",
      title: "Ücretsiz İzle",
      providers: providers?.free ?? [],
    },
    {
      key: "ads",
      title: "Reklamlı İzle",
      providers: providers?.ads ?? [],
    },
    {
      key: "rent",
      title: "Kirala",
      providers: providers?.rent ?? [],
    },
    {
      key: "buy",
      title: "Satın Al",
      providers: providers?.buy ?? [],
    },
  ].filter((group) => group.providers.length > 0);

  return (
    <section>
      <div className="mb-6 flex items-center gap-3">
        <div className="h-8 w-1 rounded-full bg-red-600" />

        <div>
          <h2 className="text-3xl font-bold">
            Türkiye&apos;de Nereden İzlenir?
          </h2>

          <p className="mt-1 text-sm text-zinc-500">
            Türkiye için mevcut izleme seçenekleri
          </p>
        </div>
      </div>

      {groups.length > 0 ? (
        <div className="space-y-8">
          {groups.map((group) => (
            <div key={group.key}>
              <h3 className="mb-4 text-lg font-bold text-zinc-200">
                {group.title}
              </h3>

              <div className="flex flex-wrap gap-4">
                {group.providers.map((provider) => (
                  <article
                    key={`${group.key}-${provider.provider_id}`}
                    className="flex min-w-48 items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 transition hover:border-red-500"
                  >
                    {provider.logo_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w92${provider.logo_path}`}
                        alt={`${provider.provider_name} logo`}
                        width={56}
                        height={56}
                        className="rounded-xl"
                      />
                    ) : (
                      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-zinc-800 text-xs text-zinc-500">
                        Logo yok
                      </div>
                    )}

                    <span className="font-semibold">
                      {provider.provider_name}
                    </span>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 p-6">
          <p className="text-zinc-400">
            Bu yapım için şu anda Türkiye&apos;de bir izleme seçeneği
            bulunamadı.
          </p>
        </div>
      )}

      <div className="mt-6 flex flex-wrap items-center gap-4">
        {providers?.link && (
          <a
            href={providers.link}
            target="_blank"
            rel="noreferrer"
            className="rounded-2xl bg-white px-5 py-3 font-bold text-black transition hover:bg-zinc-200"
          >
            Tüm izleme seçeneklerini görüntüle ↗
          </a>
        )}

        <p className="text-xs text-zinc-500">
          Availability data provided by JustWatch.
        </p>
      </div>
    </section>
  );
}