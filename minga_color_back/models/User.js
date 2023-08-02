import {Schema, model} from 'mongoose'

let collection = 'users' //los nombres de la colecciones van siempre en plural (porque son un conjunto de), van siemore en ingles y tienen que ser descriptivos del recurso (ej.. recurso: category => coleccion: categories)
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    email: {type: String, required: true},
    password: {type: String, required: true},
    photo: {type: String, required: true},
    role:{type: Number, default:0},
    online:{type: Boolean, default:false},
    verified:{type: Boolean, default: false},
    verify_code:{type: String}
} , {
    timestamps: true
})

let User = model(collection, schema)

export default User