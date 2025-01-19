
import { $ProjectLanguageModel } from "../models/projectsLanugae.js";

// Add a new language
export const addLanguage = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            throw new Error("Language name is required.");
        }

        const existingLanguage = await $ProjectLanguageModel.findOne({ name });
        if (existingLanguage) {
            throw new Error("Language already exists.");
        }

        const language = new $ProjectLanguageModel({ name });
        await language.save();

        res.status(201).send({
            process: true,
            message: "Language added successfully.",
            data: language,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

// Get all languages
export const getAllLanguages = async (req, res) => {
    try {
        const languages = await $ProjectLanguageModel.find({});
        res.status(200).send({
            process: true,
            message: "Languages fetched successfully.",
            data: languages,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

// Delete a specific language by ID
export const deleteLanguageById = async (req, res) => {
    try {
        const { id } = req.params;

        const language = await $ProjectLanguageModel.findByIdAndDelete(id);

        if (!language) {
            throw new Error("Language not found.");
        }

        res.status(200).send({
            process: true,
            message: "Language deleted successfully.",
            data: language,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};
