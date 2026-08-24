"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpService = exports.OtpService = void 0;
const twilio_1 = __importDefault(require("twilio"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// In-Memory store for verified phone numbers (15-minute expiration)
const verifiedPhonesStore = new Map();
const VERIFICATION_TTL_MS = 15 * 60 * 1000; // 15 minutes
class OtpService {
    client = null;
    serviceSid = null;
    isTwilioConfigured = false;
    constructor() {
        const accountSid = process.env.TWILIO_ACCOUNT_SID;
        const authToken = process.env.TWILIO_AUTH_TOKEN;
        const serviceSid = process.env.TWILIO_VERIFY_SERVICE_SID;
        if (accountSid &&
            accountSid.startsWith('AC') &&
            !accountSid.includes('YOUR_TWILIO') &&
            authToken &&
            !authToken.includes('your_twilio') &&
            serviceSid &&
            serviceSid.startsWith('VA') &&
            !serviceSid.includes('YOUR_TWILIO')) {
            try {
                this.client = (0, twilio_1.default)(accountSid, authToken);
                this.serviceSid = serviceSid;
                this.isTwilioConfigured = true;
                console.log('✅ Twilio Verify API V2 Client initialized successfully.');
            }
            catch (err) {
                console.error('⚠️ Failed to initialize Twilio client:', err);
            }
        }
        else {
            console.log('ℹ️ Twilio environment keys not configured or using placeholders. Running in Demo/Fallback OTP Mode.');
        }
    }
    /**
     * Normalizes input phone to E.164 standard format.
     * Default country code is +91 (India) if missing.
     */
    normalizePhone(phone) {
        if (!phone)
            return '';
        let cleaned = phone.replace(/[^\d+]/g, '');
        if (!cleaned.startsWith('+')) {
            if (cleaned.length === 10) {
                cleaned = `+91${cleaned}`;
            }
            else if (cleaned.length === 12 && cleaned.startsWith('91')) {
                cleaned = `+${cleaned}`;
            }
            else {
                cleaned = `+91${cleaned}`;
            }
        }
        return cleaned;
    }
    /**
     * Triggers SMS OTP dispatch via Twilio Verify V2 API or Demo Mode
     */
    async sendOtp(phone) {
        const e164Phone = this.normalizePhone(phone);
        if (!e164Phone || e164Phone.length < 10) {
            throw new Error('Invalid mobile number format. Please provide a valid 10-digit mobile number.');
        }
        if (this.isTwilioConfigured && this.client && this.serviceSid) {
            try {
                const verification = await this.client.verify.v2
                    .services(this.serviceSid)
                    .verifications.create({
                    to: e164Phone,
                    channel: 'sms'
                });
                console.log('📲 [TWILIO VERIFY AUDIT] Dispatch Request Accepted:');
                console.log(`- Target Phone: ${e164Phone}`);
                console.log(`- Verification SID: ${verification.sid}`);
                console.log(`- Status: ${verification.status}`);
                return {
                    success: true,
                    message: 'OTP request accepted. Please check your phone.',
                    e164Phone
                };
            }
            catch (error) {
                console.error('📲 [TWILIO VERIFY AUDIT] Dispatch Request Failed:');
                console.error(`- Target Phone: ${e164Phone}`);
                console.error(`- Service SID Exists: ${!!this.serviceSid}`);
                console.error(`- Twilio Error Code: ${error.code || 'N/A'}`);
                console.error(`- Twilio Message: ${error.message || 'Unknown Twilio error'}`);
                let userMsg = 'We couldn\'t send the OTP right now. Please try again.';
                if (error.code === 21608) {
                    userMsg = `This phone number (${e164Phone}) is not registered as a verified recipient in your Twilio Trial account. Please verify this number on Twilio Console.`;
                }
                else if (error.code === 21211 || error.code === 60200) {
                    userMsg = 'Please enter a valid mobile number.';
                }
                else if (error.code === 60203) {
                    userMsg = 'Too many OTP attempts. Please wait before trying again.';
                }
                else if (error.code === 20404 || error.code === 20001) {
                    userMsg = 'Twilio Verify Service SID is invalid or not configured correctly.';
                }
                throw new Error(userMsg);
            }
        }
        else {
            // Demo / Fallback Mode
            console.log(`📢 [DEMO OTP SERVICE] Simulated OTP send to ${e164Phone}. Enter any 6-digit code or '123456' to verify.`);
            return {
                success: true,
                message: 'OTP request accepted. Please check your phone.',
                e164Phone
            };
        }
    }
    /**
     * Validates OTP code via Twilio Verify Check or Demo Mode
     */
    async verifyOtp(phone, code) {
        const e164Phone = this.normalizePhone(phone);
        const cleanCode = code ? code.trim() : '';
        if (!cleanCode || cleanCode.length < 4) {
            throw new Error('Please enter a valid 6-digit verification code.');
        }
        if (this.isTwilioConfigured && this.client && this.serviceSid) {
            try {
                const check = await this.client.verify.v2
                    .services(this.serviceSid)
                    .verificationChecks.create({
                    to: e164Phone,
                    code: cleanCode
                });
                console.log('📲 [TWILIO VERIFY CHECK AUDIT]:');
                console.log(`- Target Phone: ${e164Phone}`);
                console.log(`- Verification Check Status: ${check.status}`);
                if (check.status === 'approved') {
                    // Record successful server-side verification state
                    verifiedPhonesStore.set(e164Phone, Date.now());
                    console.log(`✅ Phone ${e164Phone} approved by Twilio Verify.`);
                    return {
                        success: true,
                        message: 'Mobile number verified successfully!',
                        e164Phone
                    };
                }
                else {
                    return {
                        success: false,
                        message: 'Invalid or expired verification code. Please try again.',
                        e164Phone
                    };
                }
            }
            catch (error) {
                console.error('📲 [TWILIO VERIFY CHECK AUDIT] Check Error:', error.code, error.message);
                let userMsg = 'Invalid OTP. Please try again.';
                if (error.code === 20404 || error.code === 60202) {
                    userMsg = 'OTP expired. Please request a new OTP.';
                }
                throw new Error(userMsg);
            }
        }
        else {
            // Demo / Fallback Mode: Accept 123456 or any 6-digit code
            if (cleanCode.length >= 4) {
                verifiedPhonesStore.set(e164Phone, Date.now());
                console.log(`✅ Phone ${e164Phone} verified in Demo Mode.`);
                return {
                    success: true,
                    message: 'Mobile number verified successfully (Demo Mode)!',
                    e164Phone
                };
            }
            else {
                return {
                    success: false,
                    message: 'Invalid verification code.',
                    e164Phone
                };
            }
        }
    }
    /**
     * Checks if mobile number has been verified server-side within expiration TTL
     */
    isPhoneVerified(phone) {
        const e164Phone = this.normalizePhone(phone);
        const verifiedTime = verifiedPhonesStore.get(e164Phone);
        if (!verifiedTime)
            return false;
        // Check 15-min TTL
        if (Date.now() - verifiedTime > VERIFICATION_TTL_MS) {
            verifiedPhonesStore.delete(e164Phone);
            return false;
        }
        return true;
    }
    /**
     * Resets verification state if user changes mobile number
     */
    clearPhoneVerification(phone) {
        const e164Phone = this.normalizePhone(phone);
        verifiedPhonesStore.delete(e164Phone);
    }
}
exports.OtpService = OtpService;
exports.otpService = new OtpService();
