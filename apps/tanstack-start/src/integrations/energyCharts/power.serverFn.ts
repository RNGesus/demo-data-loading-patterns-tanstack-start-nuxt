import { apiClient } from "@project/energy-charts-service/client";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import { query } from "./power.querySchema";

export const powerServerFn = createServerFn({ method: "GET" })
  .inputValidator(zodValidator(query))
  .handler(async ({ data }) => {
    return await apiClient
      .public_power_public_power_get({
        queries: { country: data.country },
        timeout: 1000 * 10,
      })
      .catch((error) => {
        console.error("🧨🧨🧨", error.status, error.message, "🧨🧨🧨");
        throw new Error(error.message);
      });
  });
