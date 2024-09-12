import express from 'express';
import { createTransport } from 'nodemailer';
import cors from 'cors';

const app = express();
const PORT = 5000;


app.use(express.json());
app.use(cors());

const transporter = createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "baranovskiy.andrey@gmail.com",
    pass: "mppf apzq prom eosl",  
  },
});

app.post('/api/send-email', async (req, res) => {
  const { name, email, message, phone } = req.body;

  try {
    const info = await transporter.sendMail({
      from: email,
      to: "baranovskiy.andrey@gmail.com",
      subject: "New Message from Feedback Form",
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`,
    });

    console.log("Message sent: %s", info.messageId);
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to send email' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
