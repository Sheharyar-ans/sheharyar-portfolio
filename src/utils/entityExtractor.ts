/**
 * Conversational Entity Extraction & Automated Lead Dispatch Engine
 * Scans incoming chat and voice messages for contact info (Email, Phone/WhatsApp, Name, Project Details),
 * persists details across conversational turns, and triggers background email notification dispatch.
 */

import { dispatchLeadNotification, sanitizePhoneNumber, isValidPhoneNumber, DispatchResult } from './emailDispatch';

export interface ExtractedLead {
  name?: string;
  email?: string;
  phone?: string;
  projectDetails?: string;
  conversationSummary?: string;
  source: 'Voice Bot' | 'Chatbot';
}

export const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
export const PHONE_REGEX = /(?:\+\d[\d\s().-]{6,}\d)|(?:\(?\d{2,5}\)?[\s-]?[0-9]{3,5}[\s-]?[0-9]{3,5}(?:[\s-]?[0-9]{2,5})?)|\b\d{7,15}\b/;
export const NAME_REGEX = /(?:my name is|i am|i'm|this is|call me|name is|name:)\s+([A-Za-z]+(?:\s+[A-Za-z]+)?)/i;

/**
 * Extracts email address from user text
 */
export function extractEmail(text: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(EMAIL_REGEX);
  return match ? match[0].trim() : undefined;
}

/**
 * Extracts phone / WhatsApp number from user text
 */
export function extractPhone(text: string): string | undefined {
  if (!text) return undefined;

  // 1. Check for international phone with leading +
  const intlMatch = text.match(/\+\d[\d\s().-]{5,}\d/);
  if (intlMatch) {
    const raw = intlMatch[0].trim();
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 7 && digits.length <= 16) {
      return sanitizePhoneNumber(raw);
    }
  }

  // 2. Check for formatted phone sequences
  const formattedMatch = text.match(/(?:\+?[0-9]{1,4}[\s-]?)?(?:\(?[0-9]{2,5}\)?[\s-]?)?[0-9]{3,5}[\s-]?[0-9]{3,5}(?:[\s-]?[0-9]{2,5})?/);
  if (formattedMatch) {
    const raw = formattedMatch[0].trim();
    const digits = raw.replace(/\D/g, '');
    if (digits.length >= 7 && digits.length <= 16) {
      return sanitizePhoneNumber(raw);
    }
  }

  // 3. Check for raw 7-15 consecutive digits
  const rawDigitsMatch = text.match(/\b\d{7,15}\b/);
  if (rawDigitsMatch) {
    return rawDigitsMatch[0];
  }

  return undefined;
}

/**
 * Extracts person's name if explicitly stated
 */
export function extractName(text: string): string | undefined {
  if (!text) return undefined;
  const match = text.match(NAME_REGEX);
  if (match && match[1]) {
    const raw = match[1].trim();
    // Exclude common noise words
    const lower = raw.toLowerCase();
    if (['interested', 'looking', 'calling', 'inquiring', 'here', 'ready', 'test'].includes(lower)) {
      return undefined;
    }
    return raw;
  }
  return undefined;
}

/**
 * Extracts project requirements or scope keywords from conversation
 */
export function extractProjectDetails(text: string): string | undefined {
  if (!text) return undefined;

  // Clean out email and phone occurrences so pre-filled project details are concise
  let clean = text
    .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '')
    .replace(/(?:\+\d[\d\s().\-]{5,}\d)|(?:\(?\d{2,5}\)?[\s\-]?[0-9]{3,5}[\s\-]?[0-9]{3,5}(?:[\s\-]?[0-9]{2,5})?)|\b\d{7,15}\b/g, '')
    .replace(/(?:my\s+email\s+is|my\s+phone\s+is|my\s+whatsapp\s+is|whatsapp\s+number\s+is|email:?|phone:?|whatsapp:?)/gi, '')
    .replace(/\s+/g, ' ')
    .trim();

  clean = clean.replace(/^[,\s.and&]+|[,\s.]+$/gi, '').trim();

  const projectKeywords = [
    'wordpress', 'woocommerce', 'elementor', 'n8n', 'vapi', 'voice', 'automation',
    'make.com', 'architecture', 'speed', 'optimization', 'dashboard', 'power bi',
    'sql', 'redesign', 'migration', 'custom plugin', 'telephony', 'api', 'lead'
  ];

  const lower = clean.toLowerCase();
  const containsKeyword = projectKeywords.some((kw) => lower.includes(kw));

  if (containsKeyword || lower.includes('need') || lower.includes('want') || lower.includes('looking for') || lower.includes('project')) {
    return clean || text.trim();
  }

  if (clean.length > 5) {
    return clean;
  }

  return undefined;
}

/**
 * Parses user message for contact info and merges with previous turn's state
 */
export function parseAndMergeLead(
  userInput: string,
  existingLead?: Partial<ExtractedLead>,
  source: 'Voice Bot' | 'Chatbot' = 'Chatbot'
): {
  mergedLead: ExtractedLead;
  hasContactInfo: boolean;
  isNewContact: boolean;
} {
  const foundEmail = extractEmail(userInput);
  const foundPhone = extractPhone(userInput);
  const foundName = extractName(userInput);
  const foundDetails = extractProjectDetails(userInput);

  const prevEmail = existingLead?.email;
  const prevPhone = existingLead?.phone;
  const prevName = existingLead?.name;
  const prevDetails = existingLead?.projectDetails;

  const mergedEmail = foundEmail || prevEmail || '';
  const mergedPhone = foundPhone || prevPhone || '';
  const mergedName = foundName || prevName || '';
  const mergedDetails = foundDetails || prevDetails || '';

  const mergedLead: ExtractedLead = {
    source,
    name: mergedName,
    email: mergedEmail,
    phone: mergedPhone,
    projectDetails: mergedDetails
  };

  const hasContactInfo = Boolean(
    (mergedEmail && mergedEmail.includes('@')) ||
    (mergedPhone && isValidPhoneNumber(mergedPhone))
  );

  const isNewContact = Boolean(
    (foundEmail && foundEmail !== prevEmail) ||
    (foundPhone && foundPhone !== prevPhone)
  );

  return {
    mergedLead,
    hasContactInfo,
    isNewContact
  };
}

/**
 * Automated Background Lead Dispatcher
 * Dispatches notification to site owner sherryansari870@gmail.com without waiting for manual form click
 */
export async function autoDispatchLead(
  lead: ExtractedLead,
  conversationHistorySummary: string = ''
): Promise<DispatchResult> {
  const sourceLabel = lead.source === 'Voice Bot' ? 'Zack Voice Assistant' : 'On-Site Chatbot';
  const cleanName = lead.name?.trim() || 'Prospective Client';
  const cleanEmail = lead.email?.trim() || '';
  const cleanPhone = lead.phone?.trim() || '';
  const cleanDetails = lead.projectDetails?.trim() || 'Conversational Scoping Inquiry';

  console.log(`[Lead Dispatch] Initiating automatic background dispatch via ${sourceLabel}:`, {
    name: cleanName,
    email: cleanEmail,
    phone: cleanPhone,
    details: cleanDetails
  });

  try {
    const result = await dispatchLeadNotification({
      source: sourceLabel,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      whatsapp: cleanPhone,
      service: cleanDetails,
      details: cleanDetails,
      transcriptExcerpt: conversationHistorySummary
    });

    if (result.success) {
      console.log(`[Lead Dispatch] Successfully delivered background lead to site owner:`, result);
    } else {
      console.warn(`[Lead Dispatch] Delivery returned warning, falling back:`, result);
    }

    return result;
  } catch (err: any) {
    console.error(`[Lead Dispatch] Error executing background dispatch:`, err);
    return {
      success: false,
      message: err.message || 'Network error during automated dispatch.'
    };
  }
}

/**
 * Standard confirmation messages
 */
export const LEAD_CONFIRMATION_SPEECH =
  'Thank you! I have securely dispatched your contact details directly to Sheharyar Siraj. He will review your project and get back to you within 2 hours.';

export const LEAD_FALLBACK_NOTICE =
  'Thank you! I noted your project details. To ensure Sheharyar gets this immediately without delay, please connect directly on WhatsApp at +92 313 2080033.';
