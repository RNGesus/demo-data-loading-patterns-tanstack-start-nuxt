import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const endpoints = makeApi([
  {
    method: "get",
    path: "/twenty-four-hr-forecast",
    alias: "getTwentyFourHrForecast",
    description: `**[https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast](https://api-open.data.gov.sg/v2/real-time/api/twenty-four-hr-forecast)**

&lt;br/&gt;

- Updated multiple times throughout the day

&lt;br/&gt;

- Filter for specific date or date-time by providing &#x60;date&#x60; in query parameter.
  - use YYYY-MM-DD format to retrieve all of the readings for that day
  - use YYYY-MM-DDTHH:mm:ss to retrieve the latest readings at that moment in time
  - example: &#x60;?date&#x3D;2024-07-16&#x60; or &#x60;?date&#x3D;2024-07-16T23:59:00&#x60;

&lt;br/&gt;

- Possible values for forecast include:
  - Fair
  - Fair (Day)
  - Fair (Night)
  - Fair and Warm
  - Partly Cloudy
  - Partly Cloudy (Day)
  - Partly Cloudy (Night)
  - Cloudy
  - Hazy
  - Slightly Hazy
  - Windy
  - Mist
  - Fog
  - Light Rain
  - Moderate Rain
  - Heavy Rain
  - Passing Showers
  - Light Showers
  - Showers
  - Heavy Showers
  - Thundery Showers
  - Heavy Thundery Showers
  - Heavy Thundery Showers with Gusty Winds
`,
    requestFormat: "json",
    parameters: [
      {
        name: "date",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "paginationToken",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z
      .object({
        code: z.number().int(),
        errorMsg: z.string(),
        data: z
          .object({
            area_metadata: z.array(
              z
                .object({
                  name: z.string(),
                  label_location: z
                    .object({ latitude: z.number(), longitude: z.number() })
                    .partial(),
                })
                .partial()
            ),
            records: z.array(
              z
                .object({
                  date: z.string(),
                  updatedTimestamp: z.string(),
                  tiemstamp: z.string(),
                  general: z
                    .object({
                      validPeriod: z
                        .object({
                          start: z.string(),
                          end: z.string(),
                          text: z.string(),
                        })
                        .partial(),
                      temperature: z
                        .object({
                          low: z.number(),
                          high: z.number(),
                          unit: z.string(),
                        })
                        .partial(),
                      relativeHumidity: z
                        .object({
                          low: z.number(),
                          high: z.number(),
                          unit: z.string(),
                        })
                        .partial(),
                      forecast: z
                        .object({
                          code: z.string(),
                          text: z.enum([
                            "Fair",
                            "Fair (Day)",
                            "Fair (Night)",
                            "Fair and Warm",
                            "Partly Cloudy",
                            "Partly Cloudy (Day)",
                            "Partly Cloudy (Night)",
                            "Cloudy",
                            "Hazy",
                            "Slightly Hazy",
                            "Windy",
                            "Mist",
                            "Fog",
                            "Light Rain",
                            "Moderate Rain",
                            "Heavy Rain",
                            "Passing Showers",
                            "Light Showers",
                            "Showers",
                            "Heavy Showers",
                            "Thundery Showers",
                            "Heavy Thundery Showers",
                            "Heavy Thundery Showers with Gusty Winds",
                          ]),
                        })
                        .partial(),
                      wind: z
                        .object({
                          speed: z
                            .object({ low: z.number(), high: z.number() })
                            .partial(),
                          direction: z.string(),
                        })
                        .partial(),
                    })
                    .partial(),
                  periods: z.array(
                    z
                      .object({
                        timePeriod: z
                          .object({
                            start: z.string(),
                            end: z.string(),
                            text: z.string(),
                          })
                          .partial(),
                        regions: z
                          .object({
                            west: z
                              .object({
                                code: z.string(),
                                text: z.enum([
                                  "Fair",
                                  "Fair (Day)",
                                  "Fair (Night)",
                                  "Fair and Warm",
                                  "Partly Cloudy",
                                  "Partly Cloudy (Day)",
                                  "Partly Cloudy (Night)",
                                  "Cloudy",
                                  "Hazy",
                                  "Slightly Hazy",
                                  "Windy",
                                  "Mist",
                                  "Fog",
                                  "Light Rain",
                                  "Moderate Rain",
                                  "Heavy Rain",
                                  "Passing Showers",
                                  "Light Showers",
                                  "Showers",
                                  "Heavy Showers",
                                  "Thundery Showers",
                                  "Heavy Thundery Showers",
                                  "Heavy Thundery Showers with Gusty Winds",
                                ]),
                              })
                              .partial(),
                            east: z
                              .object({
                                code: z.string(),
                                text: z.enum([
                                  "Fair",
                                  "Fair (Day)",
                                  "Fair (Night)",
                                  "Fair and Warm",
                                  "Partly Cloudy",
                                  "Partly Cloudy (Day)",
                                  "Partly Cloudy (Night)",
                                  "Cloudy",
                                  "Hazy",
                                  "Slightly Hazy",
                                  "Windy",
                                  "Mist",
                                  "Fog",
                                  "Light Rain",
                                  "Moderate Rain",
                                  "Heavy Rain",
                                  "Passing Showers",
                                  "Light Showers",
                                  "Showers",
                                  "Heavy Showers",
                                  "Thundery Showers",
                                  "Heavy Thundery Showers",
                                  "Heavy Thundery Showers with Gusty Winds",
                                ]),
                              })
                              .partial(),
                            central: z
                              .object({
                                code: z.string(),
                                text: z.enum([
                                  "Fair",
                                  "Fair (Day)",
                                  "Fair (Night)",
                                  "Fair and Warm",
                                  "Partly Cloudy",
                                  "Partly Cloudy (Day)",
                                  "Partly Cloudy (Night)",
                                  "Cloudy",
                                  "Hazy",
                                  "Slightly Hazy",
                                  "Windy",
                                  "Mist",
                                  "Fog",
                                  "Light Rain",
                                  "Moderate Rain",
                                  "Heavy Rain",
                                  "Passing Showers",
                                  "Light Showers",
                                  "Showers",
                                  "Heavy Showers",
                                  "Thundery Showers",
                                  "Heavy Thundery Showers",
                                  "Heavy Thundery Showers with Gusty Winds",
                                ]),
                              })
                              .partial(),
                            north: z
                              .object({
                                code: z.string(),
                                text: z.enum([
                                  "Fair",
                                  "Fair (Day)",
                                  "Fair (Night)",
                                  "Fair and Warm",
                                  "Partly Cloudy",
                                  "Partly Cloudy (Day)",
                                  "Partly Cloudy (Night)",
                                  "Cloudy",
                                  "Hazy",
                                  "Slightly Hazy",
                                  "Windy",
                                  "Mist",
                                  "Fog",
                                  "Light Rain",
                                  "Moderate Rain",
                                  "Heavy Rain",
                                  "Passing Showers",
                                  "Light Showers",
                                  "Showers",
                                  "Heavy Showers",
                                  "Thundery Showers",
                                  "Heavy Thundery Showers",
                                  "Heavy Thundery Showers with Gusty Winds",
                                ]),
                              })
                              .partial(),
                            south: z
                              .object({
                                code: z.string(),
                                text: z.enum([
                                  "Fair",
                                  "Fair (Day)",
                                  "Fair (Night)",
                                  "Fair and Warm",
                                  "Partly Cloudy",
                                  "Partly Cloudy (Day)",
                                  "Partly Cloudy (Night)",
                                  "Cloudy",
                                  "Hazy",
                                  "Slightly Hazy",
                                  "Windy",
                                  "Mist",
                                  "Fog",
                                  "Light Rain",
                                  "Moderate Rain",
                                  "Heavy Rain",
                                  "Passing Showers",
                                  "Light Showers",
                                  "Showers",
                                  "Heavy Showers",
                                  "Thundery Showers",
                                  "Heavy Thundery Showers",
                                  "Heavy Thundery Showers with Gusty Winds",
                                ]),
                              })
                              .partial(),
                          })
                          .partial(),
                      })
                      .partial()
                  ),
                })
                .partial()
            ),
            paginationToken: z.string(),
          })
          .partial(),
      })
      .partial(),
    errors: [
      {
        status: 400,
        description: `Invalid HTTP request body`,
        schema: z
          .object({
            code: z.number(),
            name: z.string(),
            data: z.object({}).partial(),
            errorMsg: z.enum([
              "Invalid date format. Date format must be YYYY-MM-DD (2024-06-01) or YYYY-MM-DDTHH:mm:ss (2024-06-01T08:30:00).",
              "Invalid pagination token.",
            ]),
          })
          .partial(),
      },
      {
        status: 404,
        description: `Weather data not found`,
        schema: z
          .object({
            code: z.number(),
            name: z.string(),
            data: z.object({}).partial(),
            errorMsg: z.string(),
          })
          .partial(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
