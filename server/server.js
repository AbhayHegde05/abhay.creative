import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import nodemailer from 'nodemailer'
import Message from './models/Message.js'
import Hire from './models/Hire.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// MongoDB Connection with fallback
let isDbConnected = false
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio')
  .then(() => {
    console.log('MongoDB Connected Successfully')
    isDbConnected = true
  })
  .catch((err) => {
    console.warn('WARNING: MongoDB connection failed. Continuing server launch for SMTP features. Error:', err.message)
  })

mongoose.connection.on('connected', () => { isDbConnected = true })
mongoose.connection.on('disconnected', () => { isDbConnected = false })
mongoose.connection.on('error', () => { isDbConnected = false })

// Nodemailer SMTP Transporter Setup
let transporter
async function initializeTransporter() {
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS
  const smtpHost = process.env.SMTP_HOST
  const smtpPort = parseInt(process.env.SMTP_PORT || '587')

  if (smtpUser && smtpPass && smtpHost) {
    console.log(`Configuring SMTP connection to ${smtpHost}:${smtpPort}`)
    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use SSL for port 465 (Gmail)
      auth: {
        user: smtpUser,
        pass: smtpPass.replace(/^"(.*)"$/, '$1') // strip quotes if present
      }
    })
  } else {
    console.log('SMTP credentials not provided in .env. Creating test SMTP account via Ethereal Email...')
    try {
      const testAccount = await nodemailer.createTestAccount()
      console.log('Ethereal Test Account created:')
      console.log('  SMTP User:', testAccount.user)
      console.log('  SMTP Pass:', testAccount.pass)
      
      transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass
        }
      })
    } catch (err) {
      console.error('Failed to create Ethereal SMTP test account:', err.message)
    }
  }
}

// Call transporter initialization
initializeTransporter()

// API Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    database: isDbConnected ? 'connected' : 'disconnected',
    smtpReady: !!transporter
  })
})

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, project, message } = req.body

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email and message are required fields.' })
    }

    // 1. Store in MongoDB if connected
    let savedMessage = null
    if (isDbConnected) {
      try {
        const newMessage = new Message({ name, email, phone, project, message })
        savedMessage = await newMessage.save()
        console.log('Message saved to MongoDB:', savedMessage._id)
      } catch (dbErr) {
        console.error('Failed to save message to MongoDB:', dbErr.message)
      }
    } else {
      console.log('Skipping MongoDB save (database not connected). Message details:', { name, email, phone, project })
    }

    // 2. Send notification email to YOU (Abhay) with the visitor's details
    let emailSent = false
    let info = null
    if (transporter) {
      const smtpTo = process.env.SMTP_TO || 'abhayhegde643@gmail.com'
      const mailOptions = {
        // FROM: your Gmail account (required by Gmail SMTP)
        from: `"abhay.creative Portfolio" <${process.env.SMTP_FROM || 'abhayhegde643@gmail.com'}>`,
        // TO: you — you receive this notification
        to: smtpTo,
        // REPLY-TO: visitor's email — so when you hit Reply, it goes to them
        replyTo: email,
        subject: `📬 New message from ${name} — ${project || 'General Inquiry'}`,
        text: `Someone contacted you through your portfolio!

━━━━━━━━━━━━━━━━━━━━━━━━━━
 VISITOR DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${name}
Email:        ${email}
Phone:        ${phone || 'Not provided'}
Service:      ${project || 'General Inquiry'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
 THEIR MESSAGE
━━━━━━━━━━━━━━━━━━━━━━━━━━
${message}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Hit Reply to respond directly to ${name}.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f13; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #7c3aed, #4f46e5); padding: 28px 32px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #fff;">📬 New Contact Message</h1>
              <p style="margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 14px;">Someone reached out through your portfolio</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px; width: 110px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-weight: 600; font-size: 15px;">${name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none; font-size: 15px;">${email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-size: 15px;">${phone ? `<a href="tel:${phone}" style="color: #34d399; text-decoration: none;">${phone}</a>` : '<span style="color:#4a5568">Not provided</span>'}</td></tr>
                <tr><td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Service</td><td style="padding: 10px 0; font-size: 15px;"><span style="background:#312e81; color:#a5b4fc; padding: 3px 10px; border-radius: 20px; font-size: 13px;">${project || 'General Inquiry'}</span></td></tr>
              </table>
              <div style="background: #1a1a2e; border-left: 3px solid #7c3aed; border-radius: 6px; padding: 18px 20px;">
                <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Their Message</p>
                <p style="margin: 0; line-height: 1.7; white-space: pre-wrap; font-size: 15px;">${message}</p>
              </div>
              <div style="margin-top: 28px; padding: 16px; background: #1a1a2e; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 12px; color: #94a3b8; font-size: 13px;">Hit reply to respond directly to ${name}</p>
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #4f46e5); color: #fff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
              </div>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid #1e1e2e; text-align: center;">
              <p style="margin: 0; color: #4a5568; font-size: 12px;">Sent from abhay.creative portfolio · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        `
      }

      info = await transporter.sendMail(mailOptions)
      emailSent = true
      console.log('Notification email sent to Abhay. ID:', info.messageId)
      if (nodemailer.getTestMessageUrl(info)) {
        console.log('Preview Sent Email here:', nodemailer.getTestMessageUrl(info))
      }
    } else {
      console.error('SMTP email transporter is not initialized.')
    }

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully!',
      storedInDatabase: !!savedMessage,
      emailNotification: emailSent,
      previewUrl: info ? nodemailer.getTestMessageUrl(info) : null
    })
  } catch (err) {
    console.error('Error handling contact submission:', err)
    res.status(500).json({ error: 'Server error handling your message. Please try again later.' })
  }
})

// Hire Me Inquiry Endpoint
app.post('/api/hire', async (req, res) => {
  try {
    const { name, email, phone, service, budget, timeline, details } = req.body

    if (!name || !email || !service || !budget || !details) {
      return res.status(400).json({ error: 'Name, email, service, budget, and details are required fields.' })
    }

    // 1. Store in MongoDB if connected
    let savedInquiry = null
    if (isDbConnected) {
      try {
        const newHire = new Hire({ name, email, phone, service, budget, timeline, details })
        savedInquiry = await newHire.save()
        console.log('Hiring inquiry saved to MongoDB:', savedInquiry._id)
      } catch (dbErr) {
        console.error('Failed to save hiring inquiry to MongoDB:', dbErr.message)
      }
    } else {
      console.log('Skipping MongoDB save (database not connected). Hiring inquiry details:', { name, email, phone, service, budget })
    }

    // 2. Send notification email to YOU (Abhay) with the client's details
    let emailSent = false
    let info = null
    if (transporter) {
      const smtpTo = process.env.SMTP_TO || 'abhayhegde643@gmail.com'
      const mailOptions = {
        // FROM: your Gmail (required by Gmail SMTP)
        from: `"abhay.creative Portfolio" <${process.env.SMTP_FROM || 'abhayhegde643@gmail.com'}>`,
        // TO: you — you receive this notification
        to: smtpTo,
        // REPLY-TO: client's email — hit Reply to respond to them directly
        replyTo: email,
        subject: `💼 Hire Request from ${name} — ${service} (${budget})`,
        text: `Someone wants to hire you through your portfolio!

━━━━━━━━━━━━━━━━━━━━━━━━━━
 CLIENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━
Name:         ${name}
Email:        ${email}
Phone:        ${phone || 'Not provided'}
Service:      ${service}
Budget:       ${budget}
Timeline:     ${timeline || 'Not specified'}

━━━━━━━━━━━━━━━━━━━━━━━━━━
 PROJECT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━
${details}

Submitted: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Hit Reply to respond directly to ${name}.`,
        html: `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f13; color: #e2e8f0; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #2563eb, #4f46e5); padding: 28px 32px;">
              <h1 style="margin: 0; font-size: 22px; font-weight: 700; color: #fff;">💼 New Hire Request</h1>
              <p style="margin: 6px 0 0; color: rgba(255,255,255,0.75); font-size: 14px;">Someone wants to hire you through your portfolio</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px; width: 110px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-weight: 600; font-size: 15px;">${name}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e;"><a href="mailto:${email}" style="color: #818cf8; text-decoration: none; font-size: 15px;">${email}</a></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-size: 15px;">${phone ? `<a href="tel:${phone}" style="color: #34d399; text-decoration: none;">${phone}</a>` : '<span style="color:#4a5568">Not provided</span>'}</td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Service</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-size: 15px;"><span style="background:#1e3a8a; color:#93c5fd; padding: 3px 10px; border-radius: 20px; font-size: 13px;">${service}</span></td></tr>
                <tr><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; color: #94a3b8; font-size: 13px;">Budget</td><td style="padding: 10px 0; border-bottom: 1px solid #1e1e2e; font-size: 15px;"><span style="background:#14532d; color:#86efac; padding: 3px 10px; border-radius: 20px; font-size: 13px; font-weight: 700;">${budget}</span></td></tr>
                <tr><td style="padding: 10px 0; color: #94a3b8; font-size: 13px;">Timeline</td><td style="padding: 10px 0; font-size: 15px;">${timeline || '<span style="color:#4a5568">Not specified</span>'}</td></tr>
              </table>
              <div style="background: #1a1a2e; border-left: 3px solid #2563eb; border-radius: 6px; padding: 18px 20px;">
                <p style="margin: 0 0 8px; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em;">Project Details</p>
                <p style="margin: 0; line-height: 1.7; white-space: pre-wrap; font-size: 15px;">${details}</p>
              </div>
              <div style="margin-top: 28px; padding: 16px; background: #1a1a2e; border-radius: 8px; text-align: center;">
                <p style="margin: 0 0 12px; color: #94a3b8; font-size: 13px;">Hit reply to respond directly to ${name}</p>
                <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #4f46e5); color: #fff; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 14px; font-weight: 600;">Reply to ${name}</a>
              </div>
            </div>
            <div style="padding: 16px 32px; border-top: 1px solid #1e1e2e; text-align: center;">
              <p style="margin: 0; color: #4a5568; font-size: 12px;">Sent from abhay.creative portfolio · ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
          </div>
        `
      }

      info = await transporter.sendMail(mailOptions)
      emailSent = true
      console.log('Notification email sent to Abhay. ID:', info.messageId)
      if (nodemailer.getTestMessageUrl(info)) {
        console.log('Preview Sent Email here:', nodemailer.getTestMessageUrl(info))
      }
    } else {
      console.error('SMTP email transporter is not initialized.')
    }

    return res.status(200).json({
      success: true,
      message: 'Hiring inquiry submitted successfully!',
      storedInDatabase: !!savedInquiry,
      emailNotification: emailSent,
      previewUrl: info ? nodemailer.getTestMessageUrl(info) : null
    })
  } catch (err) {
    console.error('Error handling hiring submission:', err)
    res.status(500).json({ error: 'Server error handling your hiring inquiry. Please try again later.' })
  }
})

app.listen(PORT, () => {
  console.log(`Portfolio API Server running on port ${PORT}`)
})
