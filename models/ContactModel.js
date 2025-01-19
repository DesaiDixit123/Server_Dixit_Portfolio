import { model, Schema } from "mongoose";


const contactSchema = Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true
    },
    message: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
})


export const ContactModel=model("contact",contactSchema)