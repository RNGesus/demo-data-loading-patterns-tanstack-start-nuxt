import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const ValidationError = z.object({
  loc: z.array(z.string()),
  msg: z.string(),
  type: z.string(),
});
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial();

export const schemas = {
  ValidationError,
  HTTPValidationError,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/books",
    alias: "read_api_books_api_books_get",
    requestFormat: "json",
    parameters: [
      {
        name: "bibkeys",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "format",
        type: "Query",
        schema: z.string().optional().default("json"),
      },
      {
        name: "callback",
        type: "Query",
        schema: z.unknown().optional(),
      },
      {
        name: "jscmd",
        type: "Query",
        schema: z.string().optional().default("viewapi"),
      },
    ],
    response: z.unknown(),
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
    path: "/api/volumes/brief/:key_type/:value.json",
    alias:
      "read_api_volumes_brief_api_volumes_brief__key_type___value__json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "key_type",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "value",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "callback",
        type: "Query",
        schema: z.unknown().optional(),
      },
    ],
    response: z.unknown(),
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
    path: "/authors/:olid.json",
    alias: "read_authors_authors__olid__json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "olid",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
    path: "/authors/:olid/works.json",
    alias: "read_authors_works_authors__olid__works_json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "olid",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.unknown(),
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
    path: "/books/:olid",
    alias: "read_books_books__olid__get",
    requestFormat: "json",
    parameters: [
      {
        name: "olid",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
    path: "/covers/:key_type/:value-:size.jpg",
    alias:
      "read_covers_key_type_value_size_jpeg_covers__key_type___value___size__jpg_get",
    requestFormat: "json",
    parameters: [
      {
        name: "key_type",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "value",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "size",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
    path: "/isbn/:isbn",
    alias: "read_isbn_isbn__isbn__get",
    requestFormat: "json",
    parameters: [
      {
        name: "isbn",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
    path: "/search.json",
    alias: "read_search_json_search_json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: z.unknown(),
      },
      {
        name: "page",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.unknown(),
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
    path: "/search/authors.json",
    alias: "read_search_authors_json_search_authors_json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "q",
        type: "Query",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
    path: "/subjects/:subject.json",
    alias: "read_subjects_subjects__subject__json_get",
    requestFormat: "json",
    parameters: [
      {
        name: "subject",
        type: "Path",
        schema: z.unknown(),
      },
      {
        name: "details",
        type: "Query",
        schema: z.boolean().optional().default(false),
      },
    ],
    response: z.unknown(),
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
    path: "/works/:olid",
    alias: "read_works_works__olid__get",
    requestFormat: "json",
    parameters: [
      {
        name: "olid",
        type: "Path",
        schema: z.unknown(),
      },
    ],
    response: z.unknown(),
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
