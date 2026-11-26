import { Hono } from 'hono'
import * as controller from "../controllers/lancamento"
import { type } from 'arktype'
import { ffInputType } from '../middleware/inputTest'

const protoSchema: any = {
  conta_id: "number",
  categoria_id: "number",
  descricao: "string",
  valor: "number",
  tipo: "'entrada' | 'saida'",
  data: "string"
}
const Lancamento = type(protoSchema)
const LancamentoId = type({ ...protoSchema, id: "string.numeric" })

const route = new Hono()
route.get('/lancamento', controller.listAll)
route.post('/lancamento', ffInputType(Lancamento), controller.create)
route.get('/lancamento/:id', controller.listOne)
route.delete('/lancamento/:id', controller.deleteOne)
route.put('/lancamento/:id', ffInputType(LancamentoId), controller.updateOne)
export { route }
