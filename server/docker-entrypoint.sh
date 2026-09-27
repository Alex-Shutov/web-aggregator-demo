#!/bin/sh
set -e

touch /app/.env.production

echo "Waiting for Postgres..."
until node -e "
const { Client } = require('pg');
const client = new Client({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT || 5432),
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
client.connect().then(() => client.end()).catch(() => process.exit(1));
"; do
  sleep 2
done

echo "Running migrations..."
node -r module-alias/register ./node_modules/typeorm/cli.js migration:run -d dist/db/config/ormconfig.js

if [ -n "$ADMIN_PASSWORD" ]; then
  echo "Updating admin password..."
  node -e "
const { Client } = require('pg');
const bcrypt = require('bcrypt');
(async () => {
  const hash = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT || 5432),
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  await client.connect();
  const result = await client.query('UPDATE users SET password = \$1 WHERE email = \$2', [hash, 'admin']);
  if (!result.rowCount) {
    console.error('Admin user was not found');
    process.exit(1);
  }
  await client.end();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
"
fi

echo "Starting API..."
exec node -r module-alias/register dist/main.js
