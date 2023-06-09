/**
 * @file postgres migrator
 */

/* eslint-disable no-console */

import * as path from 'path'
import { promises as fs } from 'fs'

import { FileMigrationProvider, Migrator } from 'kysely'
import type { PostgresClientType } from './types'

interface Dependencies {
  db: PostgresClientType
}

export default function postgresMigrator({ db }: Dependencies) {
  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      fs,
      path,
      migrationFolder: path.join(__dirname, './migrations'),
    }),
  })

  async function migrateToLatest() {
    console.log('migrating to latest') // TODO: logger

    const { error, results } = await migrator.migrateToLatest()

    const statusMap = {
      Success: 'succeeded',
      Error: 'failed',
      NotExecuted: 'skipped',
    }

    results?.forEach((mr) => {
      const { status, migrationName } = mr
      console.log(`migration '${migrationName}' ${statusMap[status]}`)
    })

    if (error) {
      console.error('failed to migrate', error)
      process.exit(1)
    }

    await db.destroy()
    console.log('migrations complete')
  }

  return { migrateToLatest }
}

export const inject = {
  init: 'migrateToLatest',
  require: {
    db: 'postgres/client',
  },
}
