import type * as types from "@project/railway-station-service/types";
import type { PropsWithChildren } from "react";

function AppTypeIcon({ type }: { type: types.AppType }) {
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

export function AppLink({ app }: { app: types.ProviderApp }) {
  const capitalizedAppType = app.type.replace(/^./, (char) =>
    char.toUpperCase(),
  );
  return (
    <>
      <AppTypeIcon type={app.type} />{" "}
      <a
        href={app.url}
        target="_blank"
        rel="noreferrer"
        title={`${app.name} (${capitalizedAppType})`}
        className="link"
      >
        {app.name} ↗️
      </a>
    </>
  );
}

export function TimeTableTemplate({
  template: timetableUrlTemplate,
}: {
  template?: string;
}) {
  return (
    <p>
      Time Table Template:
      <code className="block leading-normal wrap-break-word select-all">
        {timetableUrlTemplate ?? "–"}
      </code>
    </p>
  );
}

export function ProviderApps({
  apps: providerApps,
}: {
  apps?: types.ProviderApp[];
}) {
  return (
    <div className="flex flex-col gap-1">
      <p>
        {providerApps?.length ?? 0} App(s)
        {providerApps != null && providerApps.length > 0 && ":"}
      </p>
      {!!providerApps && (
        <ul>
          {providerApps.map((app) => (
            <li key={app.name + app.type} className="ps-4">
              <AppLink app={app} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function StationCountrySection({
  country,
  children,
}: { country: types.Country } & PropsWithChildren) {
  return (
    <section className="card bg-base-300 flex flex-col gap-2 shadow-sm">
      <div className="card-body">
        <h2 className="card-title">
          {country.name}{" "}
          <small className="leading-relaxed">({country.code})</small>
        </h2>
        {children}
      </div>
    </section>
  );
}
