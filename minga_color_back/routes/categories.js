import Router from 'express';
import read from '../controllers/categories/read.js'

let category_router = Router();

// category_router.post() //crea un autor
category_router.get('/', read) //leer uno o todos
// category_router.purge() //actualizar un autor
// category_router.delete() //elimina un autor


export default category_router;