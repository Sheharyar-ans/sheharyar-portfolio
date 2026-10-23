export interface LeadRecord {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  service?: string;
  details?: string;
  createdAt: string;
  status: 'new' | 'contacted' | 'closed';
  source?: string;
}

const STORAGE_KEY = 'sheharyar_captured_leads_v1';

export function getLeads(): LeadRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading leads from localStorage:', err);
    return [];
  }
}

export function saveLead(data: {
  name: string;
  whatsapp: string;
  email: string;
  service?: string;
  details?: string;
  source?: string;
}): LeadRecord {
  const existing = getLeads();
  const newLead: LeadRecord = {
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name: data.name.trim(),
    whatsapp: data.whatsapp.trim(),
    email: data.email.trim(),
    service: data.service?.trim() || 'General Technical Consultation',
    details: data.details?.trim() || 'Captured via Interactive Sales Assistant',
    createdAt: new Date().toISOString(),
    status: 'new',
    source: data.source || 'AI Sales Chatbot'
  };

  const updated = [newLead, ...existing];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error saving lead to localStorage:', err);
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: 'new' | 'contacted' | 'closed'): LeadRecord[] {
  const existing = getLeads();
  const updated = existing.map((lead) => (lead.id === id ? { ...lead, status } : lead));
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error updating lead status:', err);
  }
  return updated;
}

export function deleteLead(id: string): LeadRecord[] {
  const existing = getLeads();
  const updated = existing.filter((lead) => lead.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Error deleting lead:', err);
  }
  return updated;
}

export function exportLeadsAsJson(): void {
  const leads = getLeads();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(leads, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `sheharyar_leads_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function exportLeadsAsCsv(): void {
  const leads = getLeads();
  if (leads.length === 0) return;

  const headers = ['ID', 'Date', 'Name', 'WhatsApp', 'Email', 'Service', 'Details', 'Status'];
  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString()}"`,
    `"${(l.name || '').replace(/"/g, '""')}"`,
    `"${(l.whatsapp || '').replace(/"/g, '""')}"`,
    `"${(l.email || '').replace(/"/g, '""')}"`,
    `"${(l.service || '').replace(/"/g, '""')}"`,
    `"${(l.details || '').replace(/"/g, '""')}"`,
    `"${l.status}"`
  ]);

  const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `sheharyar_leads_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  link.remove();
}
