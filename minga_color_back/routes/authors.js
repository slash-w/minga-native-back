import Router from 'express';
import read from '../controllers/authors/read.js'

let author_router = Router();

// author_router.post() //crea un autor
author_router.get('/', read) //leer uno o todos
// author_router.purge() //actualizar un autor
// author_router.delete() //elimina un autor


export default author_router;