import {Schema, model, Types} from "mongoose"

let collection = "chapters"
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    manga_id: {type: Types.ObjectId, ref: 'mangas', required: true},
    title: {type: String},
    cover_photo: {type: String, required: true},
    pages:{type: Array},
    order:{type: Number}
} , {
    timestamps: true
})

let Chapter = model(collection,schema)
export default Chapter