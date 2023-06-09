/**
 * @file repository entity type definitions
 */

export type CreateFieldMapParams = {
  attributes: Record<string, string>,
  entity: string,
}

export type EntityData = {
  field: Record<string, string>,
  fields: string[],
  table: string,
}

export type EntityUtilities = {
  createFieldMap: ({ attributes, entity }: CreateFieldMapParams) => Record<string, string>
  entity: Record<string, string>
}
