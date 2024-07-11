import _ from 'lodash';
import validator from 'validator';
import dotenv from 'dotenv';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import Logger from '../tools/logger.js';
import { EmailServiceError } from '../constants/commonErrors.js';

dotenv.config();

let EMAIL_CLIENT;

function setupClient() {
  if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
    Logger.error(`
      Email Service: The following environment variables are required:
        - MAILGUN_API_KEY
        - MAILGUN_DOMAIN
      You can run the API without this but you will not be able to send emails.
      `);
    return;
  }
  if (!EMAIL_CLIENT) {
    const mailgun = new Mailgun(formData);
    EMAIL_CLIENT = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });
  }
}

function isValidString(string) {
  return _.isString(string) && !_.isEmpty(string.trim());
}

function validateText(text) {
  if (!isValidString(text)) {
    throw new EmailServiceError(`Cannot send email without valid text`);
  }
}
function validateHtml(html) {
  if (!isValidString(html)) {
    throw new EmailServiceError(`Cannot send email without valid html`);
  }
}
function validateSubject(subject) {
  if (!isValidString(subject)) {
    throw new EmailServiceError(`Cannot send email without valid subject`);
  }
}
function validateRecipient(to) {
  if (!isValidString(to) || !validator.isEmail(to.trim())) {
    throw new EmailServiceError(`Cannot send email without valid recipient`);
  }
}

export async function sendEmail({ to, subject, text }) {
  validateSubject(subject);
  validateText(text);
  validateRecipient(to);
  setupClient();
  await EMAIL_CLIENT.messages.create(process.env.MAILGUN_DOMAIN, {
    from: `Hello@${process.env.MAILGUN_DOMAIN}`,
    to: to,
    subject: subject,
    text: text,
  });
}

export async function sendHtmlEmail({ to, subject, html }) {
  validateSubject(subject);
  validateHtml(html);
  validateRecipient(to);
  setupClient();
  await EMAIL_CLIENT.messages.create(process.env.MAILGUN_DOMAIN, {
    from: `Hello@${process.env.MAILGUN_DOMAIN}`,
    to: to,
    subject: subject,
    html: html,
  });
}
