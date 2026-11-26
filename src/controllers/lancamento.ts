import type { Context } from "hono"
import { db } from "../database-connect"

export const create = async (c: Context) => {
  const body = await c.req.json()
  const query = db.query(`
    INSERT INTO lancamentos (conta_id, categoria_id, descricao, valor, tipo, data)
    VALUES (:conta_id, :categoria_id, :descricao, :valor, :tipo, :data)
  `)
  const resp = query.run({
    ":conta_id": body.conta_id,
    ":categoria_id": body.categoria_id,
    ":descricao": body.descricao,
    ":valor": body.valor,
    ":tipo": body.tipo,
    ":data": body.data
  })
  return c.json(resp)
}

export const listAll = (c: Context) => {
  const query = db.query(`SELECT * FROM lancamentos`)
  const data = query.all()
  return c.json(data)
}

export const listOne = async (c: Context) => {
  const query = db.query(`SELECT * FROM lancamentos WHERE id=:id`)
  const data = query.get({ ":id": c.req.param("id") })
  return c.json(data)
}

export const deleteOne = async (c: Context) => {
  const query = db.query(`DELETE FROM lancamentos WHERE id=:id LIMIT 1`)
  const data = query.run({ ":id": c.req.param("id") })
  if (data.changes > 0)
    return c.json({}, { status: 204 })
  return c.json("Not found", { status: 404 })
}

export const updateOne = async (c: Context) => {
  const body = await c.req.json()
  const query = db.query(`
    UPDATE lancamentos
    SET conta_id=:conta_id, categoria_id=:categoria_id, descricao=:descricao, valor=:valor, tipo=:tipo, data=:data
    WHERE id=:id LIMIT 1
  `)
  const data = query.run({
    ":id": c.req.param("id"),
    ":conta_id": body.conta_id,
    ":categoria_id": body.categoria_id,
    ":descricao": body.descricao,
    ":valor": body.valor,
    ":tipo": body.tipo,
    ":data": body.data
  })
  return c.json(data)
}
