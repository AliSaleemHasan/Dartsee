-- CreateTable
CREATE TABLE "game_players" (
    "game_id" INTEGER NOT NULL,
    "player_id" TEXT,
    "id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "games" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT
);

-- CreateTable
CREATE TABLE "players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "throws" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" INTEGER,
    "player_id" TEXT,
    "score" INTEGER,
    "modifier" INTEGER,
    "x" INTEGER,
    "y" INTEGER
);
