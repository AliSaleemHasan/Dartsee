-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_game_players" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "game_id" INTEGER NOT NULL,
    "player_id" TEXT,
    CONSTRAINT "game_players_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "game_players_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_game_players" ("game_id", "id", "player_id") SELECT "game_id", "id", "player_id" FROM "game_players";
DROP TABLE "game_players";
ALTER TABLE "new_game_players" RENAME TO "game_players";
CREATE TABLE "new_throws" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "game_id" INTEGER,
    "player_id" TEXT,
    "score" INTEGER,
    "modifier" INTEGER,
    "x" INTEGER,
    "y" INTEGER,
    CONSTRAINT "throws_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "throws_player_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_throws" ("game_id", "id", "modifier", "player_id", "score", "x", "y") SELECT "game_id", "id", "modifier", "player_id", "score", "x", "y" FROM "throws";
DROP TABLE "throws";
ALTER TABLE "new_throws" RENAME TO "throws";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
