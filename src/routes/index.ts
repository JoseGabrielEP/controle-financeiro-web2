import { route, route as usuario } from './usuario'
import { route as auth } from './auth'
import { route as conta } from './conta'
import { route as categoria } from './categoria'
import { route as lancamento } from './lancamento'
import { Hono } from 'hono'
const routes = new Hono()
routes.route("/", usuario)
routes.route("/auth", auth)
routes.route("/", conta)
routes.route("/", categoria)
routes.route("/", lancamento)
export { routes }
