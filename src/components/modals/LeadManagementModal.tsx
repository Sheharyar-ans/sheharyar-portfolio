import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Trash2, 
  Download, 
  Mail, 
  Phone, 
  Clock, 
  ExternalLink, 
  Search, 
  ShieldCheck, 
  Lock, 
  LogOut, 
  KeyRound, 
  AlertCircle, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  UserCheck
} from 'lucide-react';
import { getLeads, deleteLead, updateLeadStatus, exportLeadsAsCsv, exportLeadsAsJson, LeadRecord } from '../../utils/leadStorage';

interface LeadManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AUTH_SESSION_KEY = 'sheharyar_vault_authenticated_v1';
const STORED_PASS_KEY = 'sheharyar_vault_password_v1';
const STORED_USER_KEY = 'sheharyar_vault_username_v1';
const DEFAULT_USER = 'sheharyar';
const DEFAULT_PASS = 'sheharyar2026';

export const LeadManagementModal: React.FC<LeadManagementModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  
  // Vault data state
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');

  // Change password drawer state
  const [isChangingPass, setIsChangingPass] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);

  // Check existing session
  useEffect(() => {
    if (isOpen) {
      const isAuth = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
      setIsAuthenticated(isAuth);
      if (isAuth) {
        setLeads(getLeads());
      }
      setAuthError('');
      setIsChangingPass(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const savedUser = (localStorage.getItem(STORED_USER_KEY) || DEFAULT_USER).toLowerCase().trim();
    const savedPass = localStorage.getItem(STORED_PASS_KEY) || DEFAULT_PASS;

    const enteredUser = usernameInput.toLowerCase().trim();
    const enteredPass = passwordInput.trim();

    // Allow 'admin' or 'sheharyar' by default
    const isUserValid = enteredUser === savedUser || enteredUser === 'admin' || enteredUser === 'sheharyar';
    const isPassValid = enteredPass === savedPass;

    if (isUserValid && isPassValid) {
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      setIsAuthenticated(true);
      setLeads(getLeads());
      setUsernameInput('');
      setPasswordInput('');
    } else {
      setAuthError('Access Denied: Invalid administrator username or password.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    setIsAuthenticated(false);
    setLeads([]);
    setUsernameInput('');
    setPasswordInput('');
    setIsChangingPass(false);
  };

  const handleSaveNewPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }
    localStorage.setItem(STORED_PASS_KEY, newPassword.trim());
    setChangeSuccess(true);
    setNewPassword('');
    setTimeout(() => {
      setChangeSuccess(false);
      setIsChangingPass(false);
    }, 1800);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this captured lead?')) {
      const updated = deleteLead(id);
      setLeads(updated);
    }
  };

  const handleStatusChange = (id: string, status: 'new' | 'contacted' | 'closed') => {
    const updated = updateLeadStatus(id, status);
    setLeads(updated);
  };

  const filtered = leads.filter((lead) => {
    const matchesSearch = 
      lead.name.toLowerCase().includes(search.toLowerCase()) ||
      lead.whatsapp.includes(search) ||
      lead.email.toLowerCase().includes(search.toLowerCase()) ||
      (lead.details || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div 
      data-lenis-prevent="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in overscroll-contain"
      onWheel={(e) => e.stopPropagation()}
    >
      <div 
        data-lenis-prevent="true"
        className="relative w-full max-w-4xl max-h-[90vh] bg-surface-1 border border-brand-border rounded-2xl shadow-2xl flex flex-col overflow-hidden overscroll-contain font-body"
      >
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-brand-border flex items-center justify-between bg-surface-2/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Database size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-heading font-bold text-base sm:text-lg text-white">Client Inquiries & Lead Vault</h2>
                {isAuthenticated && (
                  <span className="px-2 py-0.5 rounded-full bg-accent/10 text-accent font-mono text-[10px] font-bold">
                    {leads.length} Records
                  </span>
                )}
              </div>
              <p className="text-[11px] text-brand-secondary font-mono">
                {isAuthenticated 
                  ? 'Real-time captured leads from your interactive AI sales & support agent'
                  : 'Restricted administrative access • Client privacy protected'
                }
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                {leads.length > 0 && (
                  <>
                    <button
                      onClick={exportLeadsAsCsv}
                      className="px-3 py-1.5 rounded-lg bg-surface-3 border border-brand-border text-white text-xs font-mono flex items-center gap-1.5 hover:border-accent transition-colors"
                      title="Export CSV"
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">CSV</span>
                    </button>
                    <button
                      onClick={exportLeadsAsJson}
                      className="px-3 py-1.5 rounded-lg bg-surface-3 border border-brand-border text-white text-xs font-mono flex items-center gap-1.5 hover:border-accent transition-colors"
                      title="Export JSON"
                    >
                      <Download size={13} />
                      <span className="hidden sm:inline">JSON</span>
                    </button>
                  </>
                )}

                <button
                  onClick={() => setIsChangingPass(!isChangingPass)}
                  className="px-2.5 py-1.5 rounded-lg bg-surface-3 border border-brand-border text-brand-muted hover:text-accent text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Change Admin Passcode"
                >
                  <KeyRound size={13} />
                  <span className="hidden sm:inline">Security</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="px-2.5 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Lock Vault & Log Out"
                >
                  <LogOut size={13} />
                  <span className="hidden sm:inline">Lock</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg hover:bg-surface-3 text-brand-muted hover:text-white transition-colors flex items-center justify-center"
              title="Close modal"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Change Password Drawer (if toggled) */}
        {isAuthenticated && isChangingPass && (
          <div className="p-4 bg-surface-2 border-b border-brand-border animate-fade-in">
            <form onSubmit={handleSaveNewPassword} className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex-1 w-full relative">
                <input
                  type="password"
                  placeholder="Enter new master passcode (min 6 chars)..."
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-surface-1 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent font-mono"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-accent text-black font-mono font-bold text-xs hover:bg-white transition-colors shadow-md shadow-accent/20 flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 size={13} />
                <span>Save Passcode</span>
              </button>
              {changeSuccess && (
                <span className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                  ✓ Passcode updated successfully!
                </span>
              )}
            </form>
          </div>
        )}

        {/* BODY AREA: Login Screen vs. Vault Content */}
        {!isAuthenticated ? (
          /* ================= ADMIN AUTHENTICATION GATE ================= */
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center my-auto">
            <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mb-4 shadow-[0_0_30px_rgba(183,255,60,0.15)]">
              <Lock size={28} />
            </div>

            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2">
              Admin Authentication Required
            </h3>
            <p className="text-xs sm:text-sm text-brand-secondary font-body max-w-md mb-6 leading-relaxed">
              This client vault contains private contact inquiries and project requirements. Please enter your administrator credentials to proceed.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4 text-left">
              <div>
                <label className="block text-[11px] font-mono text-brand-muted uppercase mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <UserCheck size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type="text"
                    required
                    placeholder="Enter username (e.g. sheharyar)"
                    value={usernameInput}
                    onChange={(e) => setUsernameInput(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-brand-muted uppercase mb-1.5">
                  Master Passcode
                </label>
                <div className="relative">
                  <Lock size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter master passcode"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-white"
                  >
                    {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
                  <AlertCircle size={14} className="shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-accent text-black font-mono font-bold text-xs hover:bg-white transition-all shadow-lg shadow-accent/20 flex items-center justify-center gap-2 active:scale-95"
              >
                <ShieldCheck size={15} />
                <span>Verify Credentials & Unlock Vault</span>
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] font-mono text-brand-muted">
                  Default credentials: <code className="text-accent bg-accent/10 px-1 py-0.5 rounded">sheharyar</code> / <code className="text-accent bg-accent/10 px-1 py-0.5 rounded">sheharyar2026</code>
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* ================= AUTHENTICATED LEADS VIEW ================= */
          <>
            {/* Search and Filters Bar */}
            <div className="p-4 border-b border-brand-border/60 bg-surface-1 flex flex-col sm:flex-row items-center gap-3">
              <div className="relative flex-1 w-full">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                <input
                  type="text"
                  placeholder="Search leads by name, WhatsApp, email, or requirements..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface-2 border border-brand-border text-white text-xs placeholder-brand-muted focus:outline-none focus:border-accent font-mono"
                />
              </div>

              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <span className="text-xs font-mono text-brand-muted pl-1">Status:</span>
                {(['all', 'new', 'contacted', 'closed'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => setStatusFilter(status)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
                      statusFilter === status
                        ? 'bg-accent text-black font-bold shadow-sm shadow-accent/20'
                        : 'bg-surface-2 text-brand-secondary hover:text-white border border-brand-border/60'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads List Container with Scroll Isolation */}
            <div 
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar overscroll-contain touch-pan-y"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {filtered.length === 0 ? (
                <div className="py-16 text-center">
                  <div className="w-12 h-12 rounded-full bg-surface-2 border border-brand-border flex items-center justify-center text-brand-muted mx-auto mb-3">
                    <Database size={20} />
                  </div>
                  <p className="text-sm font-heading font-medium text-white">No captured leads found</p>
                  <p className="text-[11px] text-brand-muted mt-1 font-mono">
                    Client inquiries captured through the AI Sales Chatbot appear here instantly.
                  </p>
                </div>
              ) : (
                filtered.map((lead) => (
                  <div
                    key={lead.id}
                    className="p-4 rounded-xl bg-surface-2/40 border border-brand-border/70 hover:border-brand-border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-heading font-bold text-white text-sm sm:text-base">
                          {lead.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            lead.status === 'new'
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : lead.status === 'contacted'
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-zinc-500/15 text-zinc-400 border border-zinc-500/30'
                          }`}
                        >
                          {lead.status}
                        </span>
                        <span className="text-[11px] font-mono text-brand-muted flex items-center gap-1">
                          <Clock size={11} />
                          {new Date(lead.createdAt).toLocaleString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-brand-secondary">
                        <a
                          href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20Sheharyar%20Siraj%20here%20following%20up%20on%20your%20project%20inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-emerald-400 hover:underline flex items-center gap-1 font-semibold"
                        >
                          <Phone size={12} />
                          {lead.whatsapp}
                        </a>
                        <a
                          href={`mailto:${lead.email}?subject=Project%20Discussion%20-%20Sheharyar%20Siraj`}
                          className="text-accent hover:underline flex items-center gap-1"
                        >
                          <Mail size={12} />
                          {lead.email}
                        </a>
                        {lead.service && (
                          <span className="text-brand-muted">
                            Service: <span className="text-white">{lead.service}</span>
                          </span>
                        )}
                      </div>

                      {lead.details && (
                        <p className="text-xs text-brand-muted bg-surface-1/60 p-2.5 rounded-lg border border-brand-border/40 font-body leading-relaxed mt-2">
                          {lead.details}
                        </p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-brand-border/40">
                      <a
                        href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(lead.name)},%20Sheharyar%20Siraj%20here%20regarding%20your%20project%20inquiry.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#25D366] border border-[#25D366]/30 text-xs font-mono flex items-center gap-1 transition-colors"
                      >
                        <span>WhatsApp</span>
                        <ExternalLink size={11} />
                      </a>

                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as any)}
                        className="px-2.5 py-1.5 rounded-lg bg-surface-1 border border-brand-border text-white text-xs font-mono focus:outline-none focus:border-accent"
                      >
                        <option value="new">Mark New</option>
                        <option value="contacted">Mark Contacted</option>
                        <option value="closed">Mark Closed</option>
                      </select>

                      <button
                        onClick={() => handleDelete(lead.id)}
                        className="w-8 h-8 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 flex items-center justify-center transition-colors"
                        title="Delete Lead"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="p-3.5 bg-surface-2/60 border-t border-brand-border flex items-center justify-between text-[11px] font-mono text-brand-muted">
              <span>Admin Session: Active</span>
              <span>Sub-2h Follow-Up Protocol</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
