import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  // Drop the Compound Index wih provider_id
  pgm.dropIndex('users', ['provider', 'provider_id'], {
    ifExists: true,
  });
  // Drop provider_id column from users
  pgm.dropColumn('users', 'provider_id', {
    ifExists: true,
  });

  // USER OAUTH PROVIDERS
  pgm.createTable(
    'user_oauth_providers',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
      },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: 'users',
        onDelete: 'NO ACTION',
      },
      provider: { type: 'varchar(20)', notNull: true },
      provider_user_id: { type: 'varchar(255)', notNull: true },
      provider_email: { type: 'varchar(255)', notNull: false },
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      updated_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      deleted_at: { type: 'timestamptz', notNull: false },
    },
    {
      ifNotExists: true,
    },
  );
  pgm.createIndex('user_oauth_providers', ['provider', 'provider_user_id'], {
    unique: true,
    where: 'deleted_at IS NULL',
    ifNotExists: true,
  });
  pgm.createIndex('user_oauth_providers', ['user_id', 'provider'], {
    where: 'deleted_at IS NULL',
    ifNotExists: true,
  });
  pgm.createIndex('user_oauth_providers', ['provider_email'], {
    where: 'deleted_at IS NULL',
    ifNotExists: true,
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // DROP USER OAUTH PROVIDERS
  pgm.dropTable('user_oauth_providers');
  // Create provider_id column from users
  pgm.addColumn(
    'users',
    {
      provider_id: { type: 'varchar(255)', notNull: false },
    },
    {
      ifNotExists: true,
    },
  );
  // Create the Compound Index wih provider_id
  pgm.createIndex('users', ['provider', 'provider_id'], {
    ifNotExists: true,
  });
}
