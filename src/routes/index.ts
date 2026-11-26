import { route, route as usuario } from './usuario'
import { route as auth } from './auth'
import { route as conta } from './conta'
import { Hono } from 'hono'
const routes = new Hono()
routes.route("/", usuario)
routes.route("/auth", auth)
routes.route("/", conta)
export { routes }
