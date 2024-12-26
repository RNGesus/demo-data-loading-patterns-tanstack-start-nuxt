import { createApiClient, schemas } from "@api/client";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/start";
import type { z } from "vinxi";

type ProviderApp = z.infer<typeof schemas.ProviderApp>;
function ProviderApp({ app }: { app: ProviderApp }) {
  return (
    <>
      <AppType type={app.type} />{" "}
      <Link to={`/app/${app.type}/${app.name}`}>{app.name}</Link>
    </>
  );
}

type AppType = ProviderApp["type"];
function AppType({ type }: { type: AppType }) {
  if (type === "web") {
    return "🌐";
  }
  if (type === "android") {
    return "🤖";
  }
  if (type === "ios") {
    return "🍏";
  }
  return "🤷";
}

type Country = z.infer<typeof schemas.Country>;
function Country({ country }: { country: Country }) {
  const timeTableEntry = !!country.timetableUrlTemplate ? (
    <code
      style={{
        display: "block",
        lineHeight: 1.5,
        wordWrap: "break-word",
        userSelect: "all",
      }}
    >
      {country.timetableUrlTemplate}
    </code>
  ) : (
    "–"
  );

  return (
    <section>
      <h2>
        {country.name} <small>({country.code})</small>
      </h2>
      <p>Time Table Template: {timeTableEntry}</p>
      <p>
        Apps <small>({country.providerApps?.length ?? 0})</small>:
      </p>
      <ul>
        {country.providerApps?.map((app) => (
          <li key={app.name + app.type}>
            <ProviderApp app={app} />
          </li>
        ))}
      </ul>
    </section>
  );
}

const getCountries = createServerFn({ method: "GET" }).handler(async () => {
  const apiClient = createApiClient("https://api.railway-stations.org/");
  const countries = await apiClient.getCountries();
  return countries.filter((entry) => entry.providerApps?.length);
});

export const Route = createFileRoute("/")({
  component: Home,
  loader: async () => await getCountries(),
});

function Home() {
  const router = useRouter();
  const countries = Route.useLoaderData();

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.code}>
          <Country country={country} />
        </li>
      ))}
    </ul>
  );
}
