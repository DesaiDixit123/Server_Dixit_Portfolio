import { $ProjectModel } from "../models/projectsModel.js";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { $ProjectLanguageModel } from "../models/projectsLanugae.js";

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDE_NAME,
    api_key: process.env.CLOUDE_API_KEY,
    api_secret: process.env.CLOUDE_API_SECRET_KEY,
});

export const upload = multer({
    storage: new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            format: async (req, file) => "png",
            folder: "Project-Portfolio",
            allowed_format: ["jpg", "png", "jpeg", "gif"],
            transformation: [{ width: 500, height: 500 }],
        },
    }),

    fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
            return cb(new Error("Only image files are allowed!"), false);
        }
        cb(null, true);
    },
    limits: { fileSize: 1024 * 1024 * 5 },
});

export const uploadImages = upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 2 },
    { name: "image3", maxCount: 3 },
    { name: "image4", maxCount: 4 },
    { name: "image5", maxCount: 5 },
]);

export const projects = async (req, res) => {
    try {
        const { title, description, projectLanguage, githubLink,previewLink } = req.body;

        // Assigning file paths from req.files to variables
        const image1 = req.files.image1 ? req.files.image1[0].path : null;
        const image2 = req.files.image2 ? req.files.image2[0].path : null;
        const image3 = req.files.image3 ? req.files.image3[0].path : null;
        const image4 = req.files.image4 ? req.files.image4[0].path : null;
        const image5 = req.files.image5 ? req.files.image5[0].path : null;

        // Check if all required fields are provided
        if (!title || !description || !projectLanguage || !image1 || !githubLink) {
            throw new Error("All fields are required.");
        }

        const validLanguage = await $ProjectLanguageModel.findOne({ name: projectLanguage });
        if (!validLanguage) {
            throw new Error(`Invalid language: ${projectLanguage}. Please select a valid language.`);
        }

        // Check if a project with the same GitHub link already exists
        const findProject = await $ProjectModel.findOne({ githubLink });
        if (findProject) {
            throw new Error("Project with this GitHub link already exists.");
        }

        // Save the project if it does not exist
        const project = await new $ProjectModel({
            title,
            description,
            image1,
            image2,
            image3,
            image4,
            image5,
            projectLanguage,
            githubLink,
            previewLink
        }).save();

        // Send success response
        res.status(201).send({
            process: true,
            message: "Project added successfully to the portfolio.",
            data: project,
        });
    } catch (error) {
        // Send error response
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};



export const getAllProjects = async (req, res) => {
    try {
        const projectData = await $ProjectModel.find({});
        
        res.status(201).send({
            process: true,
            message: "All Projects Fetch Successfully.",
            data: projectData,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};



export const getProjectsByLanguage = async (req, res) => {
    try {
        const { projectLanguage } = req.query;

        // Check if projectLanguage is provided
        if (!projectLanguage) {
            throw new Error("Project language is required.");
        }

        // Fetch projects that match the given projectLanguage
        const projects = await $ProjectModel.find({ projectLanguage });

        // If no projects are found, send an appropriate response
        if (projects.length === 0) {
            return res.status(404).send({
                process: false,
                message: "No projects found for the selected language.",
                data: [],
            });
        }

        // Send success response with the filtered projects
        res.status(200).send({
            process: true,
            message: "Projects fetched successfully.",
            data: projects,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};


export const deleteAllProjects = async (req, res) => {
    try {
        await $ProjectModel.deleteMany({});
        res.status(200).send({
            process: true,
            message: "All projects deleted successfully.",
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};


export const deleteProjectById = async (req, res) => {
    try {
        const { id } = req.params;
        const project = await $ProjectModel.findByIdAndDelete(id);

        if (!project) {
            throw new Error("Project not found.");
        }

        res.status(200).send({
            process: true,
            message: "Project deleted successfully.",
            data: project,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};


export const getProjectById = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ID
        if (!id) {
            throw new Error("Project ID is required.");
        }

        // Find the project by ID
        const project = await $ProjectModel.findById(id);

        if (!project) {
            return res.status(404).send({
                process: false,
                message: "Project not found.",
            });
        }

        // Success response
        res.status(200).send({
            process: true,
            message: "Project fetched successfully.",
            data: project,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};

export const updateProject = async (req, res) => {
    try {
        const { title, description, projectLanguage, githubLink,previewLink } = req.body;
        const { projectId } = req.params;

        // Validate project ID
        if (!projectId) {
            throw new Error("Project ID is required.");
        }

        const project = await $ProjectModel.findById(projectId);
        if (!project) {
            throw new Error("Project not found.");
        }

        // Assign new images if uploaded
        const image1 = req.files.image1 ? req.files.image1[0].path : project.image1;
        const image2 = req.files.image2 ? req.files.image2[0].path : project.image2;
        const image3 = req.files.image3 ? req.files.image3[0].path : project.image3;
        const image4 = req.files.image4 ? req.files.image4[0].path : project.image4;
        const image5 = req.files.image5 ? req.files.image5[0].path : project.image5;

        // Check if the provided language is valid
        if (projectLanguage) {
            const validLanguage = await $ProjectLanguageModel.findOne({ name: projectLanguage });
            if (!validLanguage) {
                throw new Error(`Invalid language: ${projectLanguage}. Please select a valid language.`);
            }
        }

        // Update project details
        project.title = title || project.title;
        project.description = description || project.description;
        project.projectLanguage = projectLanguage || project.projectLanguage;
        project.githubLink = githubLink || project.githubLink;
        project.previewLink = previewLink || project.previewLink;
        project.image1 = image1;
        project.image2 = image2;
        project.image3 = image3;
        project.image4 = image4;
        project.image5 = image5;

        // Save updated project
        await project.save();

        res.status(200).send({
            process: true,
            message: "Project updated successfully.",
            data: project,
        });
    } catch (error) {
        res.status(400).send({
            process: false,
            message: error.message,
        });
    }
};
