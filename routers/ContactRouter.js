
import { Router } from 'express';
import { submitContactForm } from '../controllers/ContactController.js';


export const ContactRouter =Router();


ContactRouter.post('/submit', submitContactForm);


