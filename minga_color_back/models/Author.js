import {Schema, Types, model} from 'mongoose'

let collection = 'authors' //los nombres de la colecciones van siempre en plural (porque son un conjunto de), van siemore en ingles y tienen que ser descriptivos del recurso (ej.. recurso: category => coleccion: categories)
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    name: {type: String, required: true},
    last_name: {type: String},
    city: {type: String},
    date: {type: Date},
    photo: {type: String, required: true},
    active:{type: Boolean},
    user_id:{type: Types.ObjectId, required:true, ref:'users'}
} , {
    timestamps: true
})

let Author = model(collection, schema)

export default Author