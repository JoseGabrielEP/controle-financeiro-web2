import { route, route as usuario } from './usuario'
import { route as auth } from './auth'
import { route as conta } from './conta'
import { route as categoria } from './categoria'
import { Hono } from 'hono'
const routes = new Hono()
routes.route("/", usuario)
routes.route("/auth", auth)
routes.route("/", conta)
routes.route("/", categoria)
export { routes }
