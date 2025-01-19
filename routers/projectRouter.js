import { Router } from "express";
import { deleteAllProjects, deleteProjectById, getAllProjects, getProjectById, getProjectsByLanguage, projects, updateProject, uploadImages } from "../controllers/projects.js";

export const projectRouter=Router()

projectRouter.post("/projects", uploadImages, projects)
projectRouter.put("/project/:projectId", uploadImages, updateProject)
projectRouter.get("/projects", getAllProjects);
projectRouter.get("/project/:id", getProjectById);
projectRouter.get("/projectsByLanguage", getProjectsByLanguage);
projectRouter.delete("/projects", deleteAllProjects);
projectRouter.delete("/projects/:id", deleteProjectById);