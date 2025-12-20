import Joi from 'joi';
import nodemailer from 'nodemailer';
import Contact from '../models/Contact.js';

const contactSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  message: Joi.string().min(10).required()
});

export const createContact = async (req, res) => {
  try {
    const { error, value } = contactSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const saved = await Contact.create(value);

    // Email notification
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: Boolean(process.env.SMTP_SECURE === 'true'),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    const mailOptions = {
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.MAIL_TO || process.env.SMTP_USER,
      subject: `New Contact from ${value.name}`,
      text: `Name: ${value.name}\nEmail: ${value.email}\n\n${value.message}`
    };

    if (process.env.SMTP_HOST) {
      await transporter.sendMail(mailOptions);
    }

    res.status(201).json({ ok: true, saved });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
