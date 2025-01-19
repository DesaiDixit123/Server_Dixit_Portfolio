import { model, Schema } from "mongoose";

const projectSchema = Schema({
    title: { type: String },
    description: { type: String },
    projectLanguage: { type: String },
    image1: { type: String },
    image2:{type:String},
    image3:{type:String},
    image4:{type:String},
    image5: { type: String },
    githubLink:{type:String}

}) 

export const $ProjectModel=model("project",projectSchema)