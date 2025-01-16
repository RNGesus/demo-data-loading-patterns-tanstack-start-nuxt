import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const NamedData = z.object({
  name: z.string(),
  data: z.array(z.union([z.number(), z.null()])),
});
const ProductionModel = z.object({
  unix_seconds: z.union([z.array(z.number().int()), z.null()]).optional(),
  production_types: z.union([z.array(NamedData), z.null()]).optional(),
  deprecated: z.boolean(),
});
const ValidationError = z.object({
  loc: z.array(z.union([z.string(), z.number()])),
  msg: z.string(),
  type: z.string(),
});
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial();
const PublicPowerForecastModel = z.object({
  unix_seconds: z.array(z.number().int()),
  forecast_values: z.array(z.union([z.number(), z.null()])),
  production_type: z.string(),
  forecast_type: z.string(),
  deprecated: z.boolean(),
});
const InstalledModel = z.object({
  time: z.array(z.string()),
  production_types: z.union([z.array(NamedData), z.null()]).optional(),
  deprecated: z.boolean(),
});
const PriceModel = z.object({
  license_info: z.string(),
  unix_seconds: z.union([z.array(z.number().int()), z.null()]).optional(),
  price: z
    .union([z.array(z.union([z.number(), z.null()])), z.null()])
    .optional(),
  unit: z.string(),
  deprecated: z.boolean(),
});
const CrossBorderModel = z.object({
  unix_seconds: z.union([z.array(z.number().int()), z.null()]).optional(),
  countries: z.union([z.array(NamedData), z.null()]).optional(),
  deprecated: z.boolean(),
});
const TrafficModel = z.object({
  unix_seconds: z.array(z.number().int()),
  share: z.array(z.union([z.number(), z.null()])),
  signal: z.array(z.union([z.number(), z.null()])).optional(),
  substitute: z.boolean(),
  deprecated: z.boolean(),
});
const RenShareModel = z.object({
  unix_seconds: z.array(z.number().int()),
  ren_share: z.array(z.union([z.number(), z.null()])),
  solar_share: z.union([z.array(z.number()), z.null()]).optional(),
  wind_onshore_share: z.union([z.array(z.number()), z.null()]).optional(),
  wind_offshore_share: z.union([z.array(z.number()), z.null()]).optional(),
  substitute: z.boolean(),
  deprecated: z.boolean(),
});
const DailyAvgDict = z.object({
  days: z.array(z.string()),
  data: z.array(z.union([z.number(), z.null()])),
  deprecated: z.boolean(),
});
const ShareModel = z.object({
  unix_seconds: z.union([z.array(z.number().int()), z.null()]).optional(),
  data: z
    .union([z.array(z.union([z.number(), z.null()])), z.null()])
    .optional(),
  forecast: z
    .union([z.array(z.union([z.number(), z.null()])), z.null()])
    .optional(),
  deprecated: z.boolean(),
});
const FrequencyModel = z.object({
  unix_seconds: z.union([z.array(z.number().int()), z.null()]).optional(),
  data: z.array(z.union([z.number(), z.null()])),
  deprecated: z.boolean(),
});

export const schemas = {
  NamedData,
  ProductionModel,
  ValidationError,
  HTTPValidationError,
  PublicPowerForecastModel,
  InstalledModel,
  PriceModel,
  CrossBorderModel,
  TrafficModel,
  RenShareModel,
  DailyAvgDict,
  ShareModel,
  FrequencyModel,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/cbet",
    alias: "cross_border_electricity_trading_cbet_get",
    description: `Returns the cross-border electricity trading (cbet) in GW between a specified country and its neighbors.
        

Positive values indicate an import of electricity, whereas negative values show electricity exports.
        


        

Response schema:
        

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: [int],
    &quot;countries&quot;: [
        {
        &quot;name&quot;: str,
        &quot;data&quot;: [float]
        }
    ],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: CrossBorderModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/cbpf",
    alias: "cross_border_physical_flows_cbpf_get",
    description: `Returns the cross-border physical flows (cbpfs) of electricity in GW between a specified country and its neighbors.
        

Positive values indicate an import of electricity, whereas negative values show electricity exports.
        


        

Response schema:
        

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: [int],
    &quot;countries&quot;: [
        {
        &quot;name&quot;: str,
        &quot;data&quot;: [float]
        }
    ],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: CrossBorderModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/frequency",
    alias: "frequency_frequency_get",
    description: `Returns the frequency measured at Fraunhofer ISE in Freiburg, Germany. Currently only the frequency in UCTE (Region Continental Europe) is available. The data is available in 1 second timesteps from 1st of May 2022 onwards.
    


    

Response schema:
    

 &#x60;&#x60;&#x60;json
{
  &quot;unix_seconds&quot;: list[int],
  &quot;data&quot;: list[float],
  &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "region",
        type: "Query",
        schema: z.string().optional().default("UCTE"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: FrequencyModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/installed_power",
    alias: "installed_power_installed_power_get",
    description: `Returns the installed power for a specified country in GW except for battery storage capacity, which is given in GWh.
    


    

&lt;b&gt;time_step:&lt;/b&gt; Time step can be either &quot;yearly&quot; or &quot;monthly&quot; (only for Germany)
    &lt;br&gt;&lt;b&gt;installation_decommission:&lt;/b&gt; If true, the net installation / decommission numbers are returned instead of total installed power
    


    

Response schema:
    

 &#x60;&#x60;&#x60;json
{
  &quot;time&quot;: list[str],
  &quot;production_types&quot;: [
    {
        &quot;name&quot;: str,
        &quot;data&quot;: list[float]
    }
  ],
  &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "time_step",
        type: "Query",
        schema: z.string().optional().default("yearly"),
      },
      {
        name: "installation_decommission",
        type: "Query",
        schema: z.boolean().optional().default(false),
      },
    ],
    response: InstalledModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/price",
    alias: "day_ahead_price_price_get",
    description: `Returns the day-ahead spot market price for a specified bidding zone in EUR/MWh.
    


    

Available bidding zones (bzn) are shown above.
    


    

&lt;b&gt;The data for the following bidding zones is licensed as &lt;a href&#x3D;&quot;https://creativecommons.org/licenses/by/4.0/&quot; target&#x3D;&quot;_blank&quot;&gt;CC BY 4.0&lt;/a&gt; from Bundesnetzagentur | SMARD.de and is published without changes:
    &lt;ul&gt;
        &lt;li&gt;AT (Austria)&lt;/li&gt;
        &lt;li&gt;BE (Belgium)&lt;/li&gt;
        &lt;li&gt;CH (Switzerland)&lt;/li&gt;
        &lt;li&gt;CZ (Czech Republic)&lt;/li&gt;
        &lt;li&gt;DE-LU (Germany, Luxembourg)&lt;/li&gt;
        &lt;li&gt;DE-AT-LU (Germany, Austria, Luxembourg)&lt;/li&gt;
        &lt;li&gt;DK1 (Denmark 1)&lt;/li&gt;
        &lt;li&gt;DK2 (Denmark 2)&lt;/li&gt;
        &lt;li&gt;FR (France)&lt;/li&gt;
        &lt;li&gt;HU (Hungary)&lt;/li&gt;
        &lt;li&gt;IT-North (Italy North)&lt;/li&gt;
        &lt;li&gt;NL (Netherlands)&lt;/li&gt;
        &lt;li&gt;NO2 (Norway 2)&lt;/li&gt;
        &lt;li&gt;PL (Poland)&lt;/li&gt;
        &lt;li&gt;SE4 (Sweden 4)&lt;/li&gt;
        &lt;li&gt;SI (Slovenia)
    &lt;/ul&gt;&lt;/b&gt;
    


    

&lt;b&gt;The data for the other bidding zones is for private and internal use only. The utilization of any data&lt;/li&gt;
whether in its raw or derived form, for external or commercial purposes is expressly prohibited. Should you require licensing for market-related data, please direct your inquiries to the original data providers, including but not limited to EPEX SPOT SE.&lt;/b&gt;
    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;license_info&quot;: str,
    &quot;unix_seconds&quot;: [int],
    &quot;price&quot;: [float],
    &quot;unit&quot;: str,
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "bzn",
        type: "Query",
        schema: z.string().optional().default("DE-LU"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: PriceModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/public_power",
    alias: "public_power_public_power_get",
    description: `Returns the public net electricity production for a given country for each production type. Subtype can be &quot;solarlog&quot; for Switzerland (ch).
    


    

Response schema:
    

 &#x60;&#x60;&#x60;json
{
  &quot;unix_seconds&quot;: list[int],
  &quot;production_types&quot;: [
    {
        &quot;name&quot;: str,
        &quot;data&quot;: list[float]
    }
  ],
  &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "subtype",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: ProductionModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/public_power_forecast",
    alias: "public_power_forecast_public_power_forecast_get",
    description: `Returns the forecast of the public net electricity production for a given country for each production type.
    


    

&lt;b&gt;production_type:&lt;/b&gt; Can be solar, wind_onshore, wind_offshore or load
    &lt;br&gt;&lt;b&gt;forecast_type:&lt;/b&gt; Can be current, intraday or day-ahead
    


    

If no dates are provided, values for today until forecast is available are returned. For load only the forecast type &quot;day-ahead&quot; is available.
    


    

Response schema:
    

 &#x60;&#x60;&#x60;json
{
  &quot;unix_seconds&quot;: list[int],
  &quot;forecast_values&quot;: list[float],
  &quot;production_type&quot;: str,
  &quot;forecast_type&quot;: str,
  &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "production_type",
        type: "Query",
        schema: z.string().optional().default("solar"),
      },
      {
        name: "forecast_type",
        type: "Query",
        schema: z.string().optional().default("current"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: PublicPowerForecastModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/ren_share_daily_avg",
    alias: "ren_share_daily_avg_ren_share_daily_avg_get",
    description: `&lt;b&gt;Average daily renewable share of load&lt;/b&gt;
    


    

Returns the average daily renewable share of load of the last 365 days (year &#x3D; -1) or for a given year if provided.
    


    

Response schema:
    

&#x60;&#x60;&#x60;json

    {
        &quot;days&quot;: [&quot;dd.mm.yyyy&quot;],
        &quot;data&quot;: [float],
        &quot;deprecated&quot;: bool
    }

    &#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().int().optional().default(-1),
      },
    ],
    response: DailyAvgDict,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/ren_share_forecast",
    alias: "renewable_share_forecast_ren_share_forecast_get",
    description: `&lt;b&gt;Renewable share forecast&lt;/b&gt;
    


    

Returns the renewable share of load forecast in percent from today until prediction is currently available. It also includes the forecast for solar, wind on- and offshore share of load.
    


    

If no data is available from the primary data providers, a best guess is made from historic data. This is indicated by &quot;substitute&quot; set to True.
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: [int],
    &quot;ren_share&quot;: [float],
    &quot;solar_share&quot;: [float],
    &quot;wind_onshore_share&quot;: [float],
    &quot;wind_offshore_share&quot;: [float],
    &quot;substitute&quot;: bool,
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
    ],
    response: RenShareModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/signal",
    alias: "traffic_signal_signal_get",
    description: `&lt;b&gt;Electricity traffic signal&lt;/b&gt;
    


    

Returns the renewable share of load in percent from today until prediction is currently available and the corresponding traffic light.
    


    

The traffic light &quot;signal&quot; is indicated by the following numbers:
    


    -1: Red (grid congestion),
    0: Red (low renewable share),
    1: Yellow (average renewable share),
    2: Green (high renewable share)
    


    

If no data is available from the primary data providers, a best guess is made from historic data. This is indicated by &quot;substitute&quot; set to True.
    


    

&quot;postal_code&quot; is an optional input parameter, which will consider the local grid state (e.g. transmission line overload) in future implementations.
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: [int],
    &quot;share&quot;: [float],
    &quot;signal&quot;: [int],
    &quot;substitute&quot;: bool,
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "postal_code",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: TrafficModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/solar_share",
    alias: "solar_share_solar_share_get",
    description: `&lt;b&gt;Solar Share of Load&lt;/b&gt;
    


    

Returns the solar share of load from today until prediction is currently available
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: list[int],
    &quot;data&quot;: list[float],
    &quot;forecast&quot;: list[float],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
    ],
    response: ShareModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/solar_share_daily_avg",
    alias: "solar_share_daily_avg_solar_share_daily_avg_get",
    description: `&lt;b&gt;Average daily solar share of load&lt;/b&gt;
    


    

Returns the average daily solar share of load of the last 365 days (year &#x3D; -1) or for a given year if provided.
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;days&quot;: [&quot;dd.mm.yyyy&quot;],
    &quot;data&quot;: [float],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().int().optional().default(-1),
      },
    ],
    response: DailyAvgDict,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/total_power",
    alias: "total_power_total_power_get",
    description: `Returns the total net electricity production (including industrial self supply) for a given country for each production type.
    


    

Currently only available for Germany.
    


    

Response schema:
    

 &#x60;&#x60;&#x60;json
{
  &quot;unix_seconds&quot;: list[int],
  &quot;production_types&quot;: [
    {
        &quot;name&quot;: str,
        &quot;data&quot;: list[float]
    }
  ],
  &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "start",
        type: "Query",
        schema: z.string().optional().default(""),
      },
      {
        name: "end",
        type: "Query",
        schema: z.string().optional().default(""),
      },
    ],
    response: ProductionModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/wind_offshore_share",
    alias: "wind_offshore_share_wind_offshore_share_get",
    description: `&lt;b&gt;Wind Offshore Share of Load&lt;/b&gt;
    


    

Returns the wind offshore share of load from today until prediction is currently available
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: list[int],
    &quot;data&quot;: list[float],
    &quot;forecast&quot;: list[float],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
    ],
    response: ShareModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/wind_offshore_share_daily_avg",
    alias: "wind_offshore_share_daily_avg_wind_offshore_share_daily_avg_get",
    description: `&lt;b&gt;Average daily wind offshore share of load&lt;/b&gt;
    


    

Returns the average daily wind offshore share of load of the last 365 days
    


    

Response schema:
    

&#x60;&#x60;&#x60;json

{
    &quot;days&quot;: [&quot;dd.mm.yyyy&quot;],
    &quot;data&quot;: [float],
    &quot;deprecated&quot;: bool
}

&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().int().optional().default(-1),
      },
    ],
    response: DailyAvgDict,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/wind_onshore_share",
    alias: "wind_onshore_share_wind_onshore_share_get",
    description: `&lt;b&gt;Wind Onshore Share of Load&lt;/b&gt;
    


    

Returns the wind onshore share of load from today until prediction is currently available
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;unix_seconds&quot;: list[int],
    &quot;data&quot;: list[float],
    &quot;forecast&quot;: list[float],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
    ],
    response: ShareModel,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/wind_onshore_share_daily_avg",
    alias: "wind_onshore_share_daily_avg_wind_onshore_share_daily_avg_get",
    description: `&lt;b&gt;Average daily wind onshore share of load&lt;/b&gt;
    


    

Returns the average daily wind onshore share of load of the last 365 days
    


    

Response schema:
    

&#x60;&#x60;&#x60;json
{
    &quot;days&quot;: [&quot;dd.mm.yyyy&quot;],
    &quot;data&quot;: [float],
    &quot;deprecated&quot;: bool
}
&#x60;&#x60;&#x60;`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().optional().default("de"),
      },
      {
        name: "year",
        type: "Query",
        schema: z.number().int().optional().default(-1),
      },
    ],
    response: DailyAvgDict,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
