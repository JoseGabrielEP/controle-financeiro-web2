import { Database } from "bun:sqlite"

const db = new Database("database.sqlite")

db.run(`
  CREATE TABLE IF NOT EXISTS usuarios (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    nome           TEXT NOT NULL,
    idade          INTEGER,
    email          TEXT NOT NULL UNIQUE,
    password_hash  TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS contas (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id     INTEGER NOT NULL REFERENCES usuarios(id),
    nome           TEXT NOT NULL,
    saldo_inicial  REAL NOT NULL DEFAULT 0
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS categorias (
    id    INTEGER PRIMARY KEY AUTOINCREMENT,
    nome  TEXT NOT NULL
  );
`);

db.run(`
  CREATE TABLE IF NOT EXISTS lancamentos (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    conta_id      INTEGER NOT NULL REFERENCES contas(id),
    categoria_id  INTEGER NOT NULL REFERENCES categorias(id),
    descricao     TEXT NOT NULL,
    valor         REAL NOT NULL,
    tipo          TEXT NOT NULL CHECK (tipo IN ('entrada', 'saida')),
    data          TEXT NOT NULL
  );
`);

export { db }
