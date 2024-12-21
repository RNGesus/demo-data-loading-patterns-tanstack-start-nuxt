/// <reference types="vinxi/types/server" />

import {
  defaultStreamHandler,
  createStartHandler,
} from "@tanstack/start/server";
import { createRouter } from "./router";
import { getRouterManifest } from "@tanstack/start/router-manifest";

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(defaultStreamHandler);
