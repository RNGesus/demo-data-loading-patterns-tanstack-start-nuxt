import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const GeneralErrorMessage = z
  .object({
    timestamp: z.number().int().optional(),
    status: z.number().int(),
    error: z.string().optional(),
    message: z.string(),
    path: z.string().optional(),
  })
  .passthrough();
const OAuthTokenRequest = z
  .object({
    grant_type: z.enum(["authorization_code", "refresh_token"]),
    refresh_token: z.string().optional(),
    code: z.string().optional(),
    client_id: z.string(),
    redirect_uri: z.string().url(),
    code_verifier: z.string().optional(),
  })
  .passthrough();
const OAuthTokenResponse = z
  .object({
    access_token: z.string(),
    refresh_token: z.string().optional(),
    scope: z.string(),
    token_type: z.literal("Bearer"),
    expires_in: z.number().int().optional(),
  })
  .passthrough();
const OAuthRevokeTokenRequest = z
  .object({
    token: z.string(),
    token_type_hint: z.enum(["access_token", "refresh_token"]).optional(),
  })
  .passthrough();
const PhotoLicense = z
  .object({ id: z.string(), name: z.string(), url: z.string().url() })
  .passthrough();
const Photographer = z
  .object({ name: z.string(), url: z.string().url().optional() })
  .passthrough();
const CountryCode = z.string();
const Photo = z
  .object({
    id: z.number().int(),
    photographer: z.string(),
    path: z.string(),
    createdAt: z.number().int(),
    license: z.string(),
    outdated: z.boolean().optional().default(false),
  })
  .passthrough();
const PhotoStation = z
  .object({
    country: CountryCode.min(2).max(2),
    id: z.string(),
    title: z.string(),
    lat: z.number(),
    lon: z.number(),
    shortCode: z.string().optional(),
    inactive: z.boolean().optional().default(false),
    photos: z.array(Photo),
  })
  .passthrough();
const PhotoStations = z
  .object({
    photoBaseUrl: z.string(),
    licenses: z.array(PhotoLicense),
    photographers: z.array(Photographer),
    stations: z.array(PhotoStation),
  })
  .passthrough();
const Photographers = z.object({}).partial().passthrough();
const CountryCodeOptional = z.string();
const Statistic = z
  .object({
    total: z.number().int(),
    withPhoto: z.number().int(),
    withoutPhoto: z.number().int(),
    photographers: z.number().int(),
    countryCode: CountryCodeOptional.min(2).max(2).nullish(),
  })
  .passthrough();
const ProviderApp = z
  .object({
    type: z.enum(["android", "ios", "web"]),
    name: z.string(),
    url: z.string(),
  })
  .passthrough();
const Country = z
  .object({
    code: CountryCode.min(2).max(2),
    name: z.string(),
    email: z.string().optional(),
    timetableUrlTemplate: z.string().optional(),
    overrideLicense: z.string().optional(),
    active: z.boolean(),
    providerApps: z.array(ProviderApp).optional(),
  })
  .passthrough();
const InboxResponse = z
  .object({
    state: z.enum([
      "REVIEW",
      "LAT_LON_OUT_OF_RANGE",
      "NOT_ENOUGH_DATA",
      "UNSUPPORTED_CONTENT_TYPE",
      "PHOTO_TOO_LARGE",
      "CONFLICT",
      "UNAUTHORIZED",
      "ERROR",
    ]),
    message: z.string().optional(),
    id: z.number().int().optional(),
    filename: z.string().optional(),
    inboxUrl: z.string().optional(),
    crc32: z.number().int().optional(),
  })
  .passthrough();
const ProblemReportType = z.enum([
  "WRONG_LOCATION",
  "STATION_INACTIVE",
  "STATION_ACTIVE",
  "STATION_NONEXISTENT",
  "WRONG_NAME",
  "WRONG_PHOTO",
  "PHOTO_OUTDATED",
  "OTHER",
  "DUPLICATE",
]);
const ProblemReport = z
  .object({
    countryCode: CountryCode.min(2).max(2),
    stationId: z.string(),
    title: z.string().optional(),
    photoId: z.number().int().optional(),
    comment: z.string(),
    type: ProblemReportType,
    lat: z.number().optional(),
    lon: z.number().optional(),
  })
  .passthrough();
const InboxStateQueryResponse = z
  .object({
    id: z.number().int(),
    countryCode: CountryCode.min(2).max(2).optional(),
    stationId: z.string().optional(),
    title: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    newTitle: z.string().optional(),
    newLat: z.number().optional(),
    newLon: z.number().optional(),
    comment: z.string().optional(),
    problemReportType: ProblemReportType.optional(),
    rejectedReason: z.string().optional(),
    filename: z.string().optional(),
    inboxUrl: z.string().optional(),
    crc32: z.number().int().optional(),
    state: z.enum(["UNKNOWN", "REVIEW", "CONFLICT", "ACCEPTED", "REJECTED"]),
    createdAt: z.number().int().optional(),
  })
  .passthrough();
const InboxStateQueryRequest = z.object({ id: z.number().int() }).passthrough();
const PublicInboxEntry = z
  .object({
    countryCode: CountryCode.min(2).max(2).optional(),
    stationId: z.string().optional(),
    title: z.string(),
    lat: z.number(),
    lon: z.number(),
  })
  .passthrough();
const InboxCountResponse = z
  .object({ pendingInboxEntries: z.number().int() })
  .passthrough();
const InboxEntry = z
  .object({
    id: z.number().int(),
    countryCode: CountryCode.min(2).max(2).optional(),
    stationId: z.string().optional(),
    title: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    newTitle: z.string().optional(),
    newLat: z.number().optional(),
    newLon: z.number().optional(),
    photographerNickname: z.string(),
    photographerEmail: z.string().optional(),
    photoId: z.number().int().optional(),
    comment: z.string(),
    createdAt: z.number().int(),
    done: z.boolean(),
    filename: z.string().optional(),
    inboxUrl: z.string().optional(),
    hasPhoto: z.boolean(),
    hasConflict: z.boolean().optional(),
    problemReportType: ProblemReportType.optional(),
    isProcessed: z.boolean().optional(),
    active: z.boolean().optional(),
  })
  .passthrough();
const InboxCommand = z
  .object({
    id: z.number().int(),
    countryCode: CountryCode.min(2).max(2).optional(),
    stationId: z.string().optional(),
    title: z.string().optional(),
    lat: z.number().optional(),
    lon: z.number().optional(),
    rejectReason: z.string().optional(),
    DS100: z.string().optional(),
    active: z.boolean().optional(),
    conflictResolution: z
      .enum([
        "DO_NOTHING",
        "OVERWRITE_EXISTING_PHOTO",
        "IMPORT_AS_NEW_PRIMARY_PHOTO",
        "IMPORT_AS_NEW_SECONDARY_PHOTO",
        "IGNORE_NEARBY_STATION",
      ])
      .optional(),
    command: z.enum([
      "IMPORT_PHOTO",
      "IMPORT_MISSING_STATION",
      "ACTIVATE_STATION",
      "DEACTIVATE_STATION",
      "DELETE_STATION",
      "DELETE_PHOTO",
      "MARK_SOLVED",
      "REJECT",
      "CHANGE_NAME",
      "UPDATE_LOCATION",
      "PHOTO_OUTDATED",
    ]),
  })
  .passthrough();
const AdminInboxCommandResponse = z
  .object({ status: z.number().int(), message: z.string() })
  .passthrough();
const ChangePassword = z.object({ newPassword: z.string() }).passthrough();
const License = z.enum([
  "CC0",
  "CC0 1.0 Universell (CC0 1.0)",
  "CC4",
  "CC BY-SA 4.0",
  "UNKNOWN",
]);
const Profile = z
  .object({
    nickname: z.string(),
    email: z.string().email().optional(),
    license: License,
    photoOwner: z.boolean(),
    link: z.string().url().optional(),
    anonymous: z.boolean().optional(),
    admin: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    sendNotifications: z.boolean().optional(),
  })
  .passthrough();
const UpdateProfile = z
  .object({
    nickname: z.string().min(3).max(50),
    email: z.string().min(3).max(100).email(),
    license: License.optional(),
    photoOwner: z.boolean().optional(),
    link: z.string().url().optional(),
    anonymous: z.boolean().optional(),
    sendNotifications: z.boolean().optional(),
  })
  .passthrough();

export const schemas = {
  GeneralErrorMessage,
  OAuthTokenRequest,
  OAuthTokenResponse,
  OAuthRevokeTokenRequest,
  PhotoLicense,
  Photographer,
  CountryCode,
  Photo,
  PhotoStation,
  PhotoStations,
  Photographers,
  CountryCodeOptional,
  Statistic,
  ProviderApp,
  Country,
  InboxResponse,
  ProblemReportType,
  ProblemReport,
  InboxStateQueryResponse,
  InboxStateQueryRequest,
  PublicInboxEntry,
  InboxCountResponse,
  InboxEntry,
  InboxCommand,
  AdminInboxCommandResponse,
  ChangePassword,
  License,
  Profile,
  UpdateProfile,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/adminInbox",
    alias: "getAdminInbox",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.array(InboxEntry),
    errors: [
      {
        status: 401,
        description: `not authorized`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/adminInbox",
    alias: "postAdminInbox",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: InboxCommand,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: AdminInboxCommandResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: AdminInboxCommandResponse,
      },
      {
        status: 401,
        description: `not authorized`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/adminInboxCount",
    alias: "getAdminInboxCount",
    requestFormat: "json",
    response: z.object({ pendingInboxEntries: z.number().int() }).passthrough(),
  },
  {
    method: "post",
    path: "/changePassword",
    alias: "postChangePassword",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `ChangePassword`,
        type: "Body",
        schema: z.object({ newPassword: z.string() }).passthrough(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 404,
        description: `User not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/countries",
    alias: "getCountries",
    requestFormat: "json",
    parameters: [
      {
        name: "onlyActive",
        type: "Query",
        schema: z.boolean().optional(),
      },
    ],
    response: z.array(Country),
  },
  {
    method: "get",
    path: "/emailVerification/:token",
    alias: "getEmailVerification",
    requestFormat: "json",
    parameters: [
      {
        name: "token",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `token not found, verification failed`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/inbox/:filename",
    alias: "getInboxFile",
    requestFormat: "json",
    parameters: [
      {
        name: "filename",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "width",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `file not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/inbox/done/:filename",
    alias: "getInboxDoneFile",
    requestFormat: "json",
    parameters: [
      {
        name: "filename",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "width",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `file not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/inbox/processed/:filename",
    alias: "getInboxProcessedFile",
    requestFormat: "json",
    parameters: [
      {
        name: "filename",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "width",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `file not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/inbox/rejected/:filename",
    alias: "getInboxRejectedFile",
    requestFormat: "json",
    parameters: [
      {
        name: "filename",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "width",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `file not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/myProfile",
    alias: "getMyProfile",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: Profile,
    errors: [
      {
        status: 401,
        description: `authorization failed`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/myProfile",
    alias: "postMyProfile",
    description: `In case the email has been changed, only the email is saved and a new password is send.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Userprofile`,
        type: "Body",
        schema: UpdateProfile,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `authorization failed`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
      {
        status: 409,
        description: `conflict with existing name or email`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "delete",
    path: "/myProfile",
    alias: "deleteMyProfile",
    description: `The delete request closes the account of the logged in user on railway-stations.org.
The account will be changed to anonymous. 
The email-address, nickname, link and credentials will be removed from the account.
All OAuth tokens will be removed as well. No further login will be possible.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 401,
        description: `authorization failed`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/oauth2/authorize",
    alias: "getOAuth2Authorize",
    description: `Redirect the user to this URL to start the authorization code flow.
Specification: https://datatracker.ietf.org/doc/html/rfc6749#section-3.1
PKCE: https://tools.ietf.org/html/rfc7636
`,
    requestFormat: "json",
    parameters: [
      {
        name: "client_id",
        type: "Query",
        schema: z.string(),
      },
      {
        name: "scope",
        type: "Query",
        schema: z.literal("all"),
      },
      {
        name: "response_type",
        type: "Query",
        schema: z.enum(["code", "token"]),
      },
      {
        name: "redirect_uri",
        type: "Query",
        schema: z.string().url(),
      },
      {
        name: "state",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "code_challenge",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "code_challenge_method",
        type: "Query",
        schema: z.literal("S256").optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 302,
        description: `redirect to &#x60;redirect_uri&#x60; with &#x60;code&#x60; and &#x60;state&#x60; query parameter`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/oauth2/revoke",
    alias: "postOAuth2Revoke",
    description: `https://datatracker.ietf.org/doc/html/rfc7009#section-2.1`,
    requestFormat: "form-url",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: OAuthRevokeTokenRequest,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "post",
    path: "/oauth2/token",
    alias: "postOAuth2Token",
    description: `https://datatracker.ietf.org/doc/html/rfc6749#section-3.2`,
    requestFormat: "form-url",
    parameters: [
      {
        name: "body",
        description: `OAuth token request body`,
        type: "Body",
        schema: OAuthTokenRequest,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: OAuthTokenResponse,
  },
  {
    method: "get",
    path: "/photographers",
    alias: "getPhotographers",
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().min(2).max(2).optional(),
      },
    ],
    response: z.object({}).partial().passthrough(),
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: z.object({}).partial().passthrough(),
      },
    ],
  },
  {
    method: "get",
    path: "/photos/:country/:filename",
    alias: "getPhotos",
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Path",
        schema: z.string().min(2).max(2),
      },
      {
        name: "filename",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "width",
        type: "Query",
        schema: z.number().int().optional(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 404,
        description: `file not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/photoStationById/:country/:id",
    alias: "getPhotoStationById",
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Path",
        schema: z.string().min(2).max(2),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: PhotoStations,
    errors: [
      {
        status: 404,
        description: `Station not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/photoStationsByCountry/:country",
    alias: "getPhotoStationByCountry",
    description: `Returns only the primary photo of each station.
Stations can optionally be filtered by &#x27;hasPhoto&#x27; and/or &#x27;isActive&#x27; flag.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Path",
        schema: z.string().min(2).max(2),
      },
      {
        name: "hasPhoto",
        type: "Query",
        schema: z.boolean().optional(),
      },
      {
        name: "isActive",
        type: "Query",
        schema: z.boolean().optional(),
      },
    ],
    response: PhotoStations,
  },
  {
    method: "get",
    path: "/photoStationsByPhotographer/:photographer",
    alias: "getPhotoStationsByPhotographer",
    description: `Returns only the photos of a station which belong to the photographer.
Can return several photos per station, not necessarily the primary photo.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "photographer",
        type: "Path",
        schema: z.string(),
      },
      {
        name: "country",
        type: "Query",
        schema: z.string().min(2).max(2).optional(),
      },
    ],
    response: PhotoStations,
  },
  {
    method: "get",
    path: "/photoStationsByRecentPhotoImports",
    alias: "getPhotoStationsByRecentPhotoImports",
    description: `Returns only the recently imported photos of a station, defined by the sinceHours parameter.
Can return several photos per station, not necessarily the primary photo.
`,
    requestFormat: "json",
    parameters: [
      {
        name: "sinceHours",
        type: "Query",
        schema: z.number().int().gte(1).lte(800).optional().default(10),
      },
    ],
    response: PhotoStations,
  },
  {
    method: "post",
    path: "/photoUpload",
    alias: "postPhotoUpload",
    requestFormat: "binary",
    parameters: [
      {
        name: "body",
        description: `image, required for existing station, optional for missing stations`,
        type: "Body",
        schema: z.string(),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Upload-Token",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Email",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Country",
        type: "Header",
        schema: z.string().min(2).max(2).optional(),
      },
      {
        name: "Station-Id",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Content-Type",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "Station-Title",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Latitude",
        type: "Header",
        schema: z.number().optional(),
      },
      {
        name: "Longitude",
        type: "Header",
        schema: z.number().optional(),
      },
      {
        name: "Comment",
        type: "Header",
        schema: z.string().optional(),
      },
      {
        name: "Active",
        type: "Header",
        schema: z.boolean().optional(),
      },
    ],
    response: InboxResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: InboxResponse,
      },
      {
        status: 401,
        description: `authorization failed`,
        schema: InboxResponse,
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
      {
        status: 409,
        description: `photo already exists`,
        schema: InboxResponse,
      },
      {
        status: 413,
        description: `image too large (maximum 20 MB)`,
        schema: InboxResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/publicInbox",
    alias: "getPublicInbox",
    requestFormat: "json",
    response: z.array(PublicInboxEntry),
  },
  {
    method: "post",
    path: "/reportProblem",
    alias: "postReportProblem",
    requestFormat: "text",
    parameters: [
      {
        name: "body",
        description: `The problem report`,
        type: "Body",
        schema: ProblemReport,
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: InboxResponse,
    errors: [
      {
        status: 400,
        description: `Bad Request`,
        schema: InboxResponse,
      },
      {
        status: 401,
        description: `authorization failed`,
        schema: InboxResponse,
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "post",
    path: "/resendEmailVerification",
    alias: "postResendEmailVerification",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.void(),
  },
  {
    method: "get",
    path: "/stats",
    alias: "getStats",
    requestFormat: "json",
    parameters: [
      {
        name: "country",
        type: "Query",
        schema: z.string().min(2).max(2).optional(),
      },
    ],
    response: Statistic,
    errors: [
      {
        status: 404,
        description: `Country not found`,
        schema: z.void(),
      },
    ],
  },
  {
    method: "get",
    path: "/userInbox",
    alias: "getUserInbox",
    requestFormat: "json",
    parameters: [
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
      {
        name: "showCompletedEntries",
        type: "Query",
        schema: z.boolean().optional(),
      },
    ],
    response: z.array(InboxStateQueryResponse),
  },
  {
    method: "post",
    path: "/userInbox",
    alias: "postUserInbox",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        description: `Inbox state query request`,
        type: "Body",
        schema: z.array(InboxStateQueryRequest),
      },
      {
        name: "Authorization",
        type: "Header",
        schema: z.string(),
      },
    ],
    response: z.array(InboxStateQueryResponse),
  },
  {
    method: "delete",
    path: "/userInbox/:id",
    alias: "deleteUserInbox",
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.number().int(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `bad request, e.g. if the inbox entry is already done and can&#x27;t be deleted anymore`,
        schema: z.void(),
      },
      {
        status: 401,
        description: `authorization failed`,
        schema: z.void(),
      },
      {
        status: 403,
        description: `forbidden`,
        schema: z.void(),
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
