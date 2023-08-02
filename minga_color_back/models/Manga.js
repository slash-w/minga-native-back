import {Schema, model, Types} from "mongoose"

let collection = "mangas"
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    author_id: {type: Types.ObjectId, ref: 'authors', required: true},
    company_id: {type: String},
    title: {type: String},
    cover_photo: {type: String, required: true},
    description:{type: String},
    category_id:{type: Types.ObjectId, ref: 'categories', required:true}
} , {
    timestamps: true
})

let Manga = model(collection,schema)
export default Manga