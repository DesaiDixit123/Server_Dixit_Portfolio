import { model, Schema } from "mongoose";

const projectLanguageSchema = Schema({
    name: { type: String, unique: true, required: true, trim: true },
    description: {
        type: String,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

},
{ versionKey: false }
)

export const $ProjectLanguageModel=model("ProjectLanguage",projectLanguageSchema)