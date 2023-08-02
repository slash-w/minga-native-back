import {Schema, Types, model} from 'mongoose'

let collection = 'categories' //los nombres de la colecciones van siempre en plural (porque son un conjunto de), van siemore en ingles y tienen que ser descriptivos del recurso (ej.. recurso: category => coleccion: categories)
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    name: {type: String, required: true},
    color: {type: String},
    hover: {type: String},
    description: {type: String},
    cover_photo: {type: String, required: true},
    character_photo:{type: String},
    admin_id:{type: Types.ObjectId, required:true, ref:'users'}
} , {
    timestamps: true
})

let Category = model(collection, schema)

export default Category
