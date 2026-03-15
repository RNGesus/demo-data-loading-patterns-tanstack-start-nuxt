import { PageHeading } from "@app/components/PageHeading";
import { sampleCountries } from "@project/energy-charts-service/countries";
import {
  calculateEnergyChartHueRotation,
  ENERGY_CHART_HUE_ROTATION_MAX,
  ENERGY_CHART_HUE_ROTATION_MIN,
} from "@project/helpers/chart";
import {
  formatCountryName,
  formatEnergyChartDataPoint,
} from "@project/helpers/formatters";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_shell/_energyChartsHeader")({
  component: RouteComponent,
});

const countries = sampleCountries.map((country) => ({
  code: country,
  name: formatCountryName(country),
}));

function ColorScale({
  steps = 9,
  minValue = ENERGY_CHART_HUE_ROTATION_MIN,
  maxValue = ENERGY_CHART_HUE_ROTATION_MAX,
}) {
  const values = Array.from({ length: steps }, (_, i) => {
    return minValue + (maxValue - minValue) * (i / (steps - 1));
  });
  const ariaLabel = `Color scale from ${minValue} to ${maxValue} MegaWatts (MW)`;

  return (
    <div
      role="img"
      className="rounded-box grid h-12 w-full auto-cols-fr grid-flow-col overflow-hidden text-xs slashed-zero tabular-nums"
      aria-label={ariaLabel}
    >
      {values.map((value, index) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          style={{
            "--color-grade": `${calculateEnergyChartHueRotation({ value })}deg`,
          }}
          className="grid place-items-center bg-blue-600 hue-rotate-(--color-grade)"
        >
          {formatEnergyChartDataPoint(Math.round(value))}
        </div>
      ))}
    </div>
  );
}

function CountrySelector() {
  return (
    <header>
      <ul className="menu menu-horizontal bg-base-200 my-2">
        <li className="menu-title">Selected country:</li>
        {countries.map((countryEntry) => (
          <li key={countryEntry.code}>
            <Link
              activeProps={{ className: "menu-active" }}
              to="/energyCharts/$country"
              params={{ country: countryEntry.code }}
            >
              {countryEntry.name}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
}

function RouteComponent() {
  return (
    <>
      <PageHeading>Energy Production per Region in Megawatts(MW)</PageHeading>

      <CountrySelector />
      <ColorScale />
      <Outlet />
    </>
  );
}
