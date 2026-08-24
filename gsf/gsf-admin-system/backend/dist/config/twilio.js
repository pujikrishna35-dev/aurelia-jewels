"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTwilioConfigured = exports.getTwilioConfig = void 0;
const getTwilioConfig = () => {
    return {
        accountSid: process.env.TWILIO_ACCOUNT_SID || '',
        authToken: process.env.TWILIO_AUTH_TOKEN || '',
        serviceSid: process.env.TWILIO_VERIFY_SERVICE_SID || ''
    };
};
exports.getTwilioConfig = getTwilioConfig;
const isTwilioConfigured = () => {
    const { accountSid, authToken, serviceSid } = (0, exports.getTwilioConfig)();
    return (accountSid.startsWith('AC') &&
        !accountSid.includes('YOUR_TWILIO') &&
        authToken.length > 10 &&
        !authToken.includes('your_twilio') &&
        serviceSid.startsWith('VA') &&
        !serviceSid.includes('YOUR_TWILIO'));
};
exports.isTwilioConfigured = isTwilioConfigured;
