import twilio from 'twilio';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export class OutboundNotificationService {
  private twilioClient: twilio.Twilio | null = null;
  private twilioFromSms: string | null = null;
  private twilioFromWhatsApp: string | null = null;
  private isTwilioConfigured = false;

  private mailTransporter: nodemailer.Transporter | null = null;
  private mailFrom = 'GSF Global Scholar Finance <loans@globalscholarfinance.com>';
  private isEmailConfigured = false;

  constructor() {
    // 1. Initialize Twilio Client
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const fromSms = process.env.TWILIO_FROM_SMS;
    const fromWhatsApp = process.env.TWILIO_FROM_WHATSAPP || 'whatsapp:+14155238886';

    if (
      accountSid &&
      accountSid.startsWith('AC') &&
      !accountSid.includes('YOUR_TWILIO') &&
      authToken &&
      !authToken.includes('your_twilio')
    ) {
      try {
        this.twilioClient = twilio(accountSid, authToken);
        this.twilioFromSms = fromSms || null;
        this.twilioFromWhatsApp = fromWhatsApp;
        this.isTwilioConfigured = true;
        console.log('✅ Outbound Twilio Messaging Service initialized successfully.');
      } catch (err) {
        console.error('⚠️ Failed to initialize Twilio Messaging Client:', err);
      }
    }

    // 2. Initialize Nodemailer (SMTP Configuration)
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const mailFromEnv = process.env.SMTP_FROM;

    if (mailFromEnv) this.mailFrom = mailFromEnv;

    if (smtpHost && smtpUser && smtpPass) {
      try {
        this.mailTransporter = nodemailer.createTransport({
          host: smtpHost,
          port: smtpPort,
          secure: smtpPort === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass
          }
        });
        this.isEmailConfigured = true;
        console.log('✅ Nodemailer SMTP Transporter initialized successfully.');
      } catch (err) {
        console.error('⚠️ Failed to initialize Nodemailer SMTP Transporter:', err);
      }
    }
  }

  /**
   * Normalizes input phone to E.164 standard format.
   * Default country code is +91 (India) if missing.
   */
  normalizePhone(phone: string): string {
    if (!phone) return '';
    let cleaned = phone.replace(/[^\d+]/g, '');

    if (!cleaned.startsWith('+')) {
      if (cleaned.length === 10) {
        cleaned = `+91${cleaned}`;
      } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
        cleaned = `+${cleaned}`;
      } else {
        cleaned = `+91${cleaned}`;
      }
    }
    return cleaned;
  }

  /**
   * Sends an SMS and/or WhatsApp message to a student lead
   */
  async sendSmsAndWhatsApp(phone: string, name: string, message: string): Promise<void> {
    const formattedPhone = this.normalizePhone(phone);

    // 1. Send SMS via Twilio Messaging
    if (this.isTwilioConfigured && this.twilioClient && this.twilioFromSms) {
      try {
        const sms = await this.twilioClient.messages.create({
          body: message,
          from: this.twilioFromSms,
          to: formattedPhone
        });
        console.log(`📲 [SMS SENT] SID: ${sms.sid} to ${formattedPhone}`);
      } catch (err: any) {
        console.error(`❌ [SMS FAILED] To: ${formattedPhone}, Error: ${err.message}`);
      }
    } else {
      console.log(`📢 [DEMO SMS DISPATCH] To: ${formattedPhone} (${name})`);
      console.log(`Body: "${message}"`);
    }

    // 2. Send WhatsApp via Twilio Messaging
    if (this.isTwilioConfigured && this.twilioClient && this.twilioFromWhatsApp) {
      try {
        const wa = await this.twilioClient.messages.create({
          body: message,
          from: this.twilioFromWhatsApp,
          to: `whatsapp:${formattedPhone}`
        });
        console.log(`💬 [WHATSAPP SENT] SID: ${wa.sid} to ${formattedPhone}`);
      } catch (err: any) {
        console.error(`❌ [WHATSAPP FAILED] To: ${formattedPhone}, Error: ${err.message}`);
      }
    } else {
      console.log(`📢 [DEMO WHATSAPP DISPATCH] To: ${formattedPhone} (${name})`);
      console.log(`Body: "${message}"`);
    }
  }

  /**
   * Sends an email notification to the student lead
   */
  async sendEmail(email: string, name: string, subject: string, htmlContent: string): Promise<void> {
    if (!email) return;

    if (this.isEmailConfigured && this.mailTransporter) {
      try {
        await this.mailTransporter.sendMail({
          from: this.mailFrom,
          to: email,
          subject,
          html: htmlContent
        });
        console.log(`📧 [EMAIL SENT] Subject: "${subject}" to ${email}`);
      } catch (err: any) {
        console.error(`❌ [EMAIL FAILED] To: ${email}, Error: ${err.message}`);
      }
    } else {
      console.log(`📢 [DEMO EMAIL DISPATCH] To: ${email} (${name})`);
      console.log(`Subject: "${subject}"`);
      console.log(`HTML Body: [Length: ${htmlContent.length} chars]`);
    }
  }
}

export const outboundNotificationService = new OutboundNotificationService();
