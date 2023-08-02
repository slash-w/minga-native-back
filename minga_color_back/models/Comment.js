import {Schema, model, Types} from "mongoose"

let collection = "comments"
let schema = new Schema({ //defino el primer objeto con las propiedades necesarias para el modelo
    chapter_id: {type: Types.ObjectId, ref: 'chapters', required: true},
    user_id: {type: Types.ObjectId, ref: 'users', required: true},
    text: {type: String}
} , {
    timestamps: true
})

let Comment = model(collection,schema)
export default Comment