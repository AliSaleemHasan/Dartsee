#!/bin/bash

# Configuration



if command -v sqlite3 >/dev/null 2>&1; then
    echo "sqlite3 is installed on this system!"
    # You can print the version just to be sure
    sqlite3 --version
else
    echo "Installing sqlite3"
    sudo apt install sqlite3 -y
fi

DB_PATH="$(cd database && pwd)/dev.db"
DB_URL="file:$DB_PATH"

#
# check if schema.sql and data.sql exist
#

cd database

if [ ! -f "schema.sql" ]; then
    echo "schema.sql not found"
    exit 1
fi


if [ ! -f "data.sql" ]; then
    echo "data.sql not found"
    exit 1
fi

#
# now migrate schema to the database
#

sqlite3 $DB_PATH < schema.sql

# create a new fast-import script in database folder


if [ ! -f "fast-import.sql" ]; then

cat << 'EOF' > fast-import.sql
-- Turn off disk syncing temporarily for speed
PRAGMA synchronous = OFF;
PRAGMA journal_mode = MEMORY;

BEGIN TRANSACTION;

.read data.sql

COMMIT;
EOF

fi

#
# now import data using fast-import script
#

sqlite3 $DB_PATH < fast-import.sql



cd ../

echo "Setting up Dartsee environment variables..."
echo "Resolved Absolute Database Path: $DB_PATH"
echo ""

# Write to API .env
API_ENV_PATH="./apps/api/.env"
echo "DATABASE_URL=\"$DB_URL\"" > $API_ENV_PATH
echo "Wrote DATABASE_URL to $API_ENV_PATH"

# Write to Prisma .env
PRISMA_ENV_PATH="./packages/prisma/.env"
echo "DATABASE_URL=\"$DB_URL\"" > $PRISMA_ENV_PATH
echo "Wrote DATABASE_URL to $PRISMA_ENV_PATH"

# Generate Prisma client
echo "Reset Migration if found"
cd packages/prisma
pnpm dlx prisma migrate reset

echo ""
echo "Generate Prisma client"
cd ../../
turbo run prisma:generate


echo ""
echo "Setup complete! You can now run the project."
