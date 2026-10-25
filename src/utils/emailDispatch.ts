import { CONTACT_INFO } from '../data/portfolioData';
import { saveLead } from './leadStorage';

export interface LeadDispatchPayload {
  source: 'AI Chatbot Assistant' | 'Main Contact Form' | 'Project Inquiry Modal' | 'Interactive Voice Bot' | 'Voice AI Assistant' | string;
  name: string;
  email: string;
  whatsapp?: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  details?: string;
  transcriptExcerpt?: string;
}

export interface DispatchResult {
  success: boolean;
  message?: string;
}

/**
 * Sanitize raw phone inputs into standard international or dialable format
 */
export function sanitizePhoneNumber(phone: string): string {
  if (!phone) return '';
  // Preserve leading plus, digits, spaces, parentheses, hyphens
  return phone.replace(/[^\d+()-\s]/g, '').trim();
}

/**
 * Basic international phone number validation
 * Validates between 7 and 16 numeric digits
 */
export function isValidPhoneNumber(phone: string): boolean {
  if (!phone) return false;
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 16;
}

/**
 * Unified Email Dispatcher using FormSubmit AJAX Delivery to sherryansari870@gmail.com
 * Formats standardized parameters, logs to local Lead Vault, and sends HTML table email
 */
export async function dispatchLeadNotification(
  payload: LeadDispatchPayload
): Promise<DispatchResult> {
  const cleanName = (payload.name || 'Prospective Client').trim();
  const cleanEmail = (payload.email || '').trim();
  const rawPhone = payload.whatsapp || payload.phone || '';
  const cleanWhatsapp = sanitizePhoneNumber(rawPhone);
  const cleanService = payload.service?.trim() || 'Custom Architecture Scoping';
  const cleanBudget = payload.budget?.trim() || 'Not Specified';
  const cleanDetails = (payload.message || payload.details || '').trim();

  const timestamp = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Karachi',
    dateStyle: 'full',
    timeStyle: 'medium'
  });

  // 1. Save to local storage Lead Vault (accessible via /admin or /leads in chat)
  try {
    saveLead({
      name: cleanName,
      whatsapp: cleanWhatsapp || 'N/A',
      email: cleanEmail || 'N/A',
      service: cleanService,
      details: cleanDetails || (payload.transcriptExcerpt ? `Transcript excerpt: ${payload.transcriptExcerpt}` : 'Direct Lead Brief'),
      source: payload.source
    });
  } catch (err) {
    console.warn('Local lead storage error:', err);
  }

  // 2. Prepare FormSubmit outgoing payload
  // Subject format: [New Lead Captured via ${source}] - ${lead.email || lead.phone}
  const leadIdentifier = cleanEmail || cleanWhatsapp || cleanName;
  const isConversationalSource =
    payload.source.toLowerCase().includes('voice') ||
    payload.source.toLowerCase().includes('chatbot') ||
    payload.source.toLowerCase().includes('bot');

  const subjectPrefix = isConversationalSource
    ? `[New Lead Captured via ${payload.source}] - ${leadIdentifier}`
    : `[New Project Inquiry] - ${cleanName} (${cleanService})`;

  const formBody: Record<string, string> = {
    _subject: subjectPrefix,
    _template: 'table',
    _captcha: 'false',
    'Lead Name': cleanName,
    'Full Name': cleanName,
    'Email Address': cleanEmail,
    'WhatsApp Number': cleanWhatsapp || 'Not Provided',
    'WhatsApp / Phone Number': cleanWhatsapp || 'Not Provided',
    'Stated Service Interest / Conversation Excerpt': payload.transcriptExcerpt || payload.message || payload.details || cleanService,
    'Selected Service / Architecture': cleanService,
    'Source': payload.source,
    'Inquiry Source': payload.source,
    'Budget Tier': cleanBudget,
    'Project Requirements': cleanDetails || 'None provided'
  };

  if (payload.timeline) {
    formBody['Target Timeline'] = payload.timeline;
  }

  if (payload.transcriptExcerpt) {
    formBody['Chat Transcript Excerpt'] = payload.transcriptExcerpt;
  }

  formBody['Timestamp'] = `${timestamp} (PKT) / ${new Date().toUTCString()}`;
  formBody['Submission Timestamp'] = `${timestamp} (PKT) / ${new Date().toUTCString()}`;

  // 3. Dispatch to FormSubmit AJAX endpoint
  try {
    const endpoint = `https://formsubmit.co/ajax/${CONTACT_INFO.email}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(formBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.warn('FormSubmit delivery non-200 response:', response.status, errorText);
      return {
        success: false,
        message: 'Delivery service responded with an error.'
      };
    }

    const data = await response.json().catch(() => ({}));
    return {
      success: true,
      message: (data && data.message) || 'Inquiry successfully delivered to Sheharyar Siraj.'
    };
  } catch (err: any) {
    console.error('Email dispatch network error:', err);
    return {
      success: false,
      message: err.message || 'Network error occurred during dispatch.'
    };
  }
}
