export interface Context {
  req: Request
  json: (payload: unknown) => Response
  text: (payload: string) => Response
  html: (payload: string) => Response
}

export type Handler = (context: Context) => Response | Promise<Response>

interface Route {
  method: 'GET' | 'POST'
  path: string
  handler: Handler
}

export class Hono {
  private readonly routes: Route[] = []

  get(path: string, handler: Handler): this {
    this.routes.push({ method: 'GET', path, handler })
    return this
  }

  post(path: string, handler: Handler): this {
    this.routes.push({ method: 'POST', path, handler })
    return this
  }

  fetch = async (request: Request): Promise<Response> => {
    const url = new URL(request.url)
    const route = this.routes.find(
      (item) => item.method === request.method && item.path === url.pathname,
    )

    if (!route) {
      return new Response('Not Found', { status: 404 })
    }

    return route.handler({
      req: request,
      json: (payload) =>
        new Response(JSON.stringify(payload), {
          status: 200,
          headers: { 'content-type': 'application/json; charset=utf-8' },
        }),
      text: (payload) =>
        new Response(payload, {
          status: 200,
          headers: { 'content-type': 'text/plain; charset=utf-8' },
        }),
      html: (payload) =>
        new Response(payload, {
          status: 200,
          headers: { 'content-type': 'text/html; charset=utf-8' },
        }),
    })
  }
}
