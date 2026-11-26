import { Hono } from 'hono'
import * as controller from "../controllers/categoria"
import { type } from 'arktype'
import { ffInputType } from '../middleware/inputTest'

const protoSchema: any = {
  nome: "string"
}
const Categoria = type(protoSchema)
const CategoriaId = type({ ...protoSchema, id: "string.numeric" })

const route = new Hono()
route.get('/categoria', controller.listAll)
route.post('/categoria', ffInputType(Categoria), controller.create)
route.get('/categoria/:id', controller.listOne)
route.delete('/categoria/:id', controller.deleteOne)
route.put('/categoria/:id', ffInputType(CategoriaId), controller.updateOne)
export { route }
