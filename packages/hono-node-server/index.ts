import { Buffer } from 'node:buffer'
import http from 'node:http'

export function serve(options: {
  fetch: (request: Request) => Promise<Response> | Response
  port: number
}) {
  const server = http.createServer(async (request, response) => {
    const requestInit: RequestInit & { duplex: 'half' } = {
      method: request.method,
      headers: request.headers as HeadersInit,
      body:
        request.method === 'GET' || request.method === 'HEAD'
          ? undefined
          : (request as unknown as BodyInit),
      duplex: 'half',
    }

    const incomingRequest = new Request(`http://${request.headers.host}${request.url}`, requestInit)

    const outgoingResponse = await options.fetch(incomingRequest)
    response.statusCode = outgoingResponse.status

    outgoingResponse.headers.forEach((value, key) => {
      response.setHeader(key, value)
    })

    const body = Buffer.from(await outgoingResponse.arrayBuffer())
    response.end(body)
  })

  server.listen(options.port)

  return server
}
