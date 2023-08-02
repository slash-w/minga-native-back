import createHttpError from 'htpp-errors'

const notFound = (req, res, next) => {
    next(createHttpError(404, 'Ruta no encontrada'))
}

export default notFound