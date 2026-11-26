import { Hono } from 'hono'
import * as controller from "../controllers/conta"
import { type } from 'arktype'
import { ffInputType } from '../middleware/inputTest'

const protoSchema: any = {
  usuario_id: "number",
  nome: "string",
  saldo_inicial: "number"
}
const Conta = type(protoSchema)
const ContaId = type({ ...protoSchema, id: "string.numeric" })

const route = new Hono()
route.get('/conta', controller.listAll)
route.post('/conta', ffInputType(Conta), controller.create)
route.get('/conta/:id', controller.listOne)
route.delete('/conta/:id', controller.deleteOne)
route.put('/conta/:id', ffInputType(ContaId), controller.updateOne)
export { route }
