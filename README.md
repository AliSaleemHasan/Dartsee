# Dartsee

## Overview

This repository contains the full-stack Dartsee application. It is structured as a monorepo using Turborepo and pnpm. 
- **Backend:** NestJS (located in `apps/api`)
- **Frontend:** React / Next.js (located in `apps/web`)
- **Database:** SQLite with Prisma ORM

## Prerequisites

- [Node.js](https://nodejs.org/)
- [pnpm](https://pnpm.io/)

## Database Setup

The SQLite database has been decoupled from the API package and is strictly managed within the root `/database` directory.

To initialize the local SQLite database, the raw SQL dump files must first be placed in the `/database` directory:
1. Ensure `schema.sql` is present in `/database`.
2. Ensure `data.sql` is present in `/database`.

Once the files are present, make the setup script executable and run it from the root of the Turborepo project:

```bash
chmod +x setup.sh
./setup.sh
```

**The setup script performs the following background tasks:**
- Installs the `sqlite3` CLI tool on the native system if it is not already present.
- Deletes any existing `dev.db` to prevent corrupted states.
- Creates a fresh `dev.db` database inside the `/database` directory.
- Imports `schema.sql` to construct the tables.
- Leverages a custom, temporary `fast-import.sql` script (using `MEMORY` journal mode) to ingest the massive `data.sql` file efficiently.
- Automatically generates `.env` files precisely mapped to the local machine's absolute paths inside both `apps/api` and `packages/prisma`.
- Executes `prisma:generate` across the workspace to compile the Prisma Client.

## Running the Application

After the setup script finishes successfully, install all dependencies if not already done:

```bash
pnpm install
```

Start the development servers for all applications and packages:

```bash
pnpm turbo run dev
```

### Running the API individually
If only the backend NestJS service is needed:

```bash
pnpm turbo run dev --filter=api
```

### Building the Project
To build all applications and packages:

```bash
pnpm turbo run build
```

### Running Tests
To execute the test suites:

```bash
pnpm turbo run test
```
