import { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  // EXTENSIONS (Good practice to ensure UUID gen works)
  pgm.createExtension('pgcrypto', { ifNotExists: true });

  // USERS
  pgm.createTable(
    'users',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
      },
      email: { type: 'varchar(255)', unique: true, notNull: true },
      username: { type: 'varchar(50)', unique: true, notNull: true },
      password_hash: { type: 'varchar(255)', notNull: false },
      avatar_url: { type: 'varchar(255)', notNull: false },
      provider: { type: 'varchar(20)', notNull: true, default: 'email' }, // Shows how did the user register initially
      provider_id: { type: 'varchar(255)', notNull: false },
      token_version: { type: 'integer', notNull: true, default: 1 },
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      updated_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      deleted_at: { type: 'timestamptz', notNull: false },
    },
    { ifNotExists: true },
  );
  pgm.createIndex('users', ['provider', 'provider_id'], { ifNotExists: true });

  // PLAYGROUNDS
  pgm.createTable(
    'playgrounds',
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
      name: { type: 'varchar(100)', notNull: true },
      description: { type: 'text', default: '' },
      visibility: { type: 'varchar(20)', default: 'private' },
      access_code: { type: 'varchar(20)', default: null }, // Nullable
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      updated_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      deleted_at: { type: 'timestamptz', notNull: false },
    },
    { ifNotExists: true },
  );

  // Partial Unique Index instead of Constraint
  // "Name must be unique per user, but only for active playgrounds"
  pgm.createIndex('playgrounds', ['user_id', 'name'], {
    unique: true,
    where: 'deleted_at IS NULL',
    ifNotExists: true,
  });
  pgm.createIndex('playgrounds', ['visibility'], { ifNotExists: true });
  pgm.createIndex('playgrounds', ['name'], { ifNotExists: true });

  // FILES
  pgm.createTable(
    'files',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
      },
      playground_id: {
        type: 'uuid',
        notNull: true,
        references: 'playgrounds',
        onDelete: 'NO ACTION', // If playground is HARD deleted, files MUST go.
      },
      name: { type: 'varchar(255)', notNull: true },
      content: { type: 'text', notNull: true, default: '' },
      type: { type: 'varchar(50)', notNull: true },
      order: { type: 'integer', default: 0 },
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      updated_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      deleted_at: { type: 'timestamptz', notNull: false },
    },
    { ifNotExists: true },
  );

  // Partial Unique Index
  pgm.createIndex('files', ['playground_id', 'name'], {
    unique: true,
    where: 'deleted_at IS NULL',
    ifNotExists: true,
  });

  // PLAYGROUND_USERS (Permissions)
  pgm.createTable(
    'playground_users',
    {
      playground_id: {
        type: 'uuid',
        notNull: true,
        references: 'playgrounds',
        onDelete: 'NO ACTION', // If playground gone, permission gone
      },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: 'users',
        onDelete: 'NO ACTION', // If user gone, permission gone
      },
      role: { type: 'varchar(20)', notNull: true, default: 'viewer' },
      last_viewed_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
    },
    {
      // Composite Primary Key syntax
      constraints: {
        primaryKey: ['playground_id', 'user_id'],
      },
      ifNotExists: true,
    },
  );
  pgm.createIndex('playground_users', ['user_id'], { ifNotExists: true });

  // MESSAGES
  pgm.createTable(
    'messages',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
      },
      playground_id: {
        type: 'uuid',
        notNull: true,
        references: 'playgrounds',
        onDelete: 'NO ACTION',
      },
      user_id: {
        type: 'uuid',
        notNull: true,
        references: 'users',
        onDelete: 'NO ACTION',
      },
      content: { type: 'text', notNull: true },
      type: { type: 'varchar(20)', default: 'text' },
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
      deleted_at: { type: 'timestamptz', notNull: false },
    },
    { ifNotExists: true },
  );
  // Index for "Recent messages in room"
  pgm.createIndex('messages', ['playground_id', 'created_at'], { ifNotExists: true });

  // EXECUTIONS
  pgm.createTable(
    'executions',
    {
      id: {
        type: 'uuid',
        primaryKey: true,
        default: pgm.func('gen_random_uuid()'),
      },
      playground_id: {
        type: 'uuid',
        notNull: true,
        references: 'playgrounds',
        onDelete: 'NO ACTION',
      },
      user_id: {
        type: 'uuid',
        notNull: false, // Maybe system triggered? Safe to be nullable.
        references: 'users',
        onDelete: 'SET NULL',
      },
      code_snapshot: { type: 'text' },
      language: { type: 'varchar(50)', notNull: true },
      output: { type: 'text' },
      status: { type: 'varchar(20)' },
      execution_time_ms: { type: 'integer' },
      created_at: { type: 'timestamptz', default: pgm.func('now()'), notNull: true },
    },
    { ifNotExists: true },
  );
  pgm.createIndex('executions', ['playground_id', 'created_at'], { ifNotExists: true });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  // DROP IN REVERSE ORDER
  pgm.dropTable('executions');
  pgm.dropTable('messages');
  pgm.dropTable('playground_users');
  pgm.dropTable('files');
  pgm.dropTable('playgrounds');
  pgm.dropTable('users');
}
