/**
 * @file http response logger
 */

import config from 'config'

import type { Context, Middleware, Next } from 'koa'
import type { LoggerConfiguration } from '../../types/logger'

export default function middleware(): Middleware {
  return async function responseLogger(ctx: Context, next: Next) {
    await next()
    const { enabled, level }: LoggerConfiguration = config.get('logger.http.response')
    const { log, response } = ctx
    if (enabled) {
      const { body, header, message, status } = response
      const base = { status, message, header }
      if (level === 'debug') log.debug({ ...base, body })
      else log.info(base)
    }
  }
}

export const inject = {}
