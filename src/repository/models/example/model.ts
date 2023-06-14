/**
 * @file example entity model
 */

import type { CoreTypes } from '../../../types/core'
import type { DomainModel, ExampleDomainObject } from '../../../types/domain-models'
import type { EntityModelMarshaller, ExampleEntityModel, MarshalParams } from '../types'

interface Dependencies {
  core: CoreTypes
}

export default function example(deps: Dependencies): EntityModelMarshaller {
  const { core: { InternalServerError } } = deps

  function marshal(params: MarshalParams): DomainModel {
    const { meta, solo = true } = params

    const result: DomainModel = { data: [], solo }
    if (meta) result.meta = meta

    const data = <ExampleEntityModel[]>params.data

    const { length } = data
    if (solo && length > 1) {
      throw new InternalServerError(`serializer input data with length '${length}' must contain one and only one resource for single resource serialization`)
    }

    result.data = data.reduce((acc: Array<ExampleDomainObject>, elem: ExampleEntityModel) => {
      const marshalled = marshalData({ data: elem })
      acc.push(marshalled)
      return acc
    }, [])
    if (meta) result.meta = meta
    return result
  }

  function marshalData({ data }: { data: ExampleEntityModel }): ExampleDomainObject {
    const {
      created_by,
      created_on,
      description,
      enabled,
      id,
      modified_by,
      modified_on,
      status,
      title,
    } = data

    return {
      attributes: {
        created_by,
        created_on,
        description,
        enabled,
        id,
        modified_by,
        modified_on,
        status,
        title,
      },
      meta: null, // TODO
      related: [], // TODO
    }
  }

  return { marshal }
}

export const inject = {
  require: {
    core: 'core',
  },
}