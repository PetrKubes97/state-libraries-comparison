import express, {Router} from 'express';
import {TodosController} from './slowTodosController'
import cors from 'cors'

const server = express();
server.use(express.json());
server.use(cors())

const routes = Router()
const todosController = TodosController()

routes.get('/', async (req, res) =>
    res.json(await todosController.getTodos(+req.query.page)))

routes.put('/:todoId', async (req, res) =>
    res.json(await todosController.toggleTodo(+req.params.todoId)))

routes.post('/', async (req, res) =>
    res.json(await todosController.addTodo(req.body.text)))

server.use(routes);
server.listen(3000)