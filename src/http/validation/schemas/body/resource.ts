/**
 * @file validation/schemas/domain.ts
 * @overview domain schemas
 */

import joi from 'joi'

export default function domainResource({ common, core }) {
  const { single } = common

  /**
   * example domain resource schema
   */
  function type({ method }) {
    // TODO: possible error handling on undefined `method`

    type Resource = {
      id?: any,
      type: any,
      properties: any,
    }

    const resource: Resource = {
      type: joi.string().valid(core.Resource.DomainResource).required(),
      properties: joi.object().keys({
        description: joi.string(),
        enabled: joi.boolean(),
        status: joi.number(),
        title: joi.string().required().max(255),
      }).required(),
    }
    if (method === 'PUT') resource.id = joi.string().uuid().required()
    return resource
  }

  return single({ type })
}

export const inject = {
  require: {
    common: 'http/validation/schemas/body/common',
    core: 'core',
  },
}