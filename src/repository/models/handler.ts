/**
* @file repository record handling utilities
*/

import type { CoreTypes } from '../../types/core'
import type { PageMetadata } from '../../types/pagination'
import type { PagingDataParams, ThrownOnNotFoundParams } from './types'

interface Dependencies {
  core: CoreTypes,
}

export default function handler(deps: Dependencies) {
  const { core: { NotFoundError } } = deps

  // list response metadata for all models
  function marshalPageData(params: PagingDataParams): PageMetadata {
    const { count, limit, offset } = params
    return { limit, offset, total: count }
  }

  // error handling
  function throwOnNotFound(params: ThrownOnNotFoundParams): void {
    const { id, data, type = 'record' } = params
    if (!data || (Array.isArray(data) && data.length === 0)) {
      throw new NotFoundError(`unable to find ${type} with id '${id}'`)
    }
  }

  return { marshalPageData, throwOnNotFound }
}

export const inject = {
  require: {
    core: 'core',
  },
}
