import { ContactModel } from "../models/ContactModel.js";


export const submitContactForm = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required!' });
    }

    const contact = await ContactModel.create({ name, email, message });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully!',
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};
