import { type SchemaTypeDefinition } from 'sanity'
import { personaType } from './personaType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [personaType],
}