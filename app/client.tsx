/// <reference types="vinxi/types/client" />

import { createRouter } from "./router";
import { hydrateRoot } from "react-dom/client";
import { StartClient } from "@tanstack/start";

const router = createRouter();
hydrateRoot(document, <StartClient router={router}></StartClient>);
