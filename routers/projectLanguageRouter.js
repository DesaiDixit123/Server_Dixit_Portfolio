import { Router } from "express";
import { addLanguage, deleteLanguageById, getAllLanguages } from "../controllers/projectLanguage.js";


export const projectsLanguageRouter = Router();

// Add a new language
projectsLanguageRouter.post("/languages", addLanguage);

// Get all languages
projectsLanguageRouter.get("/languages", getAllLanguages);

// Delete a language by ID
projectsLanguageRouter.delete("/languages/:id", deleteLanguageById);
