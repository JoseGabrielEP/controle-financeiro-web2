import type { Context } from "hono"
import { db } from "../database-connect"

export const create = async (c: Context) => {
  const body = await c.req.json()
  const query = db.query(`
    INSERT INTO contas (usuario_id, nome, saldo_inicial)
    VALUES (:usuario_id, :nome, :saldo_inicial)
  `)
  const resp = query.run({
    ":usuario_id": body.usuario_id,
    ":nome": body.nome,
    ":saldo_inicial": body.saldo_inicial
  })
  return c.json(resp)
}

export const listAll = (c: Context) => {
  const query = db.query(`SELECT * FROM contas`)
  const data = query.all()
  return c.json(data)
}

export const listOne = async (c: Context) => {
  const query = db.query(`SELECT * FROM contas WHERE id=:id`)
  const data = query.get({ ":id": c.req.param("id") })
  return c.json(data)
}

export const deleteOne = async (c: Context) => {
  const query = db.query(`DELETE FROM contas WHERE id=:id LIMIT 1`)
  const data = query.run({ ":id": c.req.param("id") })
  if (data.changes > 0)
    return c.json({}, { status: 204 })
  return c.json("Not found", { status: 404 })
}

export const updateOne = async (c: Context) => {
  const body = await c.req.json()
  const query = db.query(`UPDATE contas SET usuario_id=:usuario_id, nome=:nome, saldo_inicial=:saldo_inicial WHERE id=:id LIMIT 1`)
  const data = query.run({
    ":id": c.req.param("id"),
    ":usuario_id": body.usuario_id,
    ":nome": body.nome,
    ":saldo_inicial": body.saldo_inicial
  })
  return c.json(data)
}
