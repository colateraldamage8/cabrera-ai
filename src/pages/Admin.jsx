import { useState } from 'react';
import { Wrench, ShoppingBag, MessageSquare, Tag, Plus, Trash2, ChevronDown, RotateCcw, X } from 'lucide-react';
import { useStore, toSlug } from '../context/StoreContext';

// ── Helpers ───────────────────────────────────────────────────────────────────

const TOOL_STATUSES  = ['Live', 'Beta', 'Coming Soon'];
const TOOL_BADGES    = ['', 'Popular', 'Premium', 'New'];
const MKT_TYPES      = ['Template', 'Web App', 'Education Tool', 'Dashboard', 'Chatbot', 'Fitness Tool'];
const MKT_BADGES     = ['', 'Popular', 'Premium', 'Custom', 'New'];
const REQ_STATUSES   = ['New', 'In Review', 'Building', 'Done', 'Declined'];

const statusPill = {
  'Live':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Beta':        'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Coming Soon': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'New':         'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'In Review':   'bg-amber-500/10 text-amber-400 border-amber-500/20',
  'Building':    'bg-blue-500/10 text-blue-400 border-blue-500/20',
  'Done':        'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  'Declined':    'bg-red-500/10 text-red-400 border-red-500/20',
};

function Pill({ label }) {
  return (
    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${statusPill[label] ?? 'bg-white/5 text-white/30 border-white/10'}`}>
      {label || '—'}
    </span>
  );
}

function Label({ children }) {
  return <label className="block text-[10.5px] font-semibold uppercase tracking-widest text-white/30 mb-1.5">{children}</label>;
}

function Field({ children }) {
  return <div>{children}</div>;
}

function SectionTitle({ children }) {
  return (
    <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(96,165,250,0.65)' }}>
      {children}
    </h3>
  );
}

function EmptyState({ message }) {
  return (
    <div className="text-center py-16">
      <div className="text-4xl mb-3">📭</div>
      <p className="text-white/30 text-sm">{message}</p>
    </div>
  );
}

// ── Default form states ───────────────────────────────────────────────────────

const blankTool = {
  name: '', slug: '', category: 'Productivity', status: 'Live', badge: '',
  icon: '', description: '', longDescription: '', featuresText: '', tagsText: '', url: '',
};

const blankProduct = {
  name: '', type: 'Template', badge: '', icon: '', description: '',
  featuresText: '', price: '', priceNum: '', rating: '', sales: '',
};

// ── Tabs ─────────────────────────────────────────────────────────────────────

function ToolsTab() {
  const { tools, categories, addTool, deleteTool } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankTool);
  const [confirm, setConfirm] = useState(null);

  const set = k => e => {
    const v = e.target.value;
    setForm(f => ({
      ...f,
      [k]: v,
      ...(k === 'name' ? { slug: toSlug(v) } : {}),
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    const features = form.featuresText.split('\n').map(s => s.trim()).filter(Boolean);
    const tags     = form.tagsText.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    addTool({
      name: form.name,
      slug: form.slug || toSlug(form.name),
      category: form.category,
      status: form.status,
      badge: form.badge || null,
      icon: form.icon || '🔧',
      description: form.description,
      longDescription: form.longDescription,
      features,
      tags,
      url: form.url || '#',
    });
    setForm(blankTool);
    setShowForm(false);
  };

  return (
    <div>
      {/* Stats */}
      <div className="flex flex-wrap gap-3 mb-6">
        {['Live', 'Beta', 'Coming Soon'].map(s => (
          <div key={s} className={`text-[11px] font-semibold px-3 py-1.5 rounded-full border ${statusPill[s]}`}>
            {tools.filter(t => t.status === s).length} {s}
          </div>
        ))}
        <div className="text-[11px] text-white/30 px-3 py-1.5">{tools.length} total</div>
      </div>

      {/* Add form toggle */}
      <button
        onClick={() => setShowForm(v => !v)}
        className="btn-primary text-[12px] px-4 py-2.5 mb-5 gap-2"
      >
        {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        {showForm ? 'Cancel' : 'Add Tool'}
      </button>

      {/* Add form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 mb-6 border space-y-4"
          style={{ background: 'rgba(37,99,235,0.04)', borderColor: 'rgba(6,182,212,0.15)' }}
        >
          <SectionTitle>New Tool</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <Label>Name *</Label>
              <input required value={form.name} onChange={set('name')} placeholder="Tool name" className="input-field" />
            </Field>
            <Field>
              <Label>Slug (auto)</Label>
              <input value={form.slug} onChange={set('slug')} placeholder="url-slug" className="input-field" />
            </Field>
            <Field>
              <Label>Icon (emoji)</Label>
              <input value={form.icon} onChange={set('icon')} placeholder="🔧" className="input-field" />
            </Field>
            <Field>
              <Label>Category *</Label>
              <select required value={form.category} onChange={set('category')} className="input-field">
                {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field>
              <Label>Status *</Label>
              <select required value={form.status} onChange={set('status')} className="input-field">
                {TOOL_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
            <Field>
              <Label>Badge</Label>
              <select value={form.badge} onChange={set('badge')} className="input-field">
                {TOOL_BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </Field>
            <Field>
              <Label>External URL</Label>
              <input value={form.url} onChange={set('url')} placeholder="https://..." className="input-field" />
            </Field>
          </div>
          <Field>
            <Label>Short Description *</Label>
            <input required value={form.description} onChange={set('description')} placeholder="One-line description" className="input-field" />
          </Field>
          <Field>
            <Label>Long Description</Label>
            <textarea rows={3} value={form.longDescription} onChange={set('longDescription')} placeholder="Full paragraph description for the detail page" className="input-field resize-none" />
          </Field>
          <Field>
            <Label>Features (one per line)</Label>
            <textarea rows={4} value={form.featuresText} onChange={set('featuresText')} placeholder={"Feature one\nFeature two\nFeature three"} className="input-field resize-none" />
          </Field>
          <Field>
            <Label>Tags (comma separated)</Label>
            <input value={form.tagsText} onChange={set('tagsText')} placeholder="tag1, tag2, tag3" className="input-field" />
          </Field>
          <button type="submit" className="btn-primary text-[12px] px-5 py-2.5">Save Tool</button>
        </form>
      )}

      {/* Table */}
      {tools.length === 0 ? <EmptyState message="No tools yet. Add your first one above." /> : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(37,99,235,0.12)' }}>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr style={{ background: 'rgba(37,99,235,0.06)', borderBottom: '1px solid rgba(37,99,235,0.12)' }}>
                {['Icon', 'Name', 'Category', 'Status', 'Badge', 'URL', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10.5px] font-semibold uppercase tracking-widest text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tools.map((t, i) => (
                <tr
                  key={t.id}
                  style={{
                    background: i % 2 === 0 ? 'rgba(6,12,26,0.92)' : 'rgba(10,18,36,0.6)',
                    borderBottom: '1px solid rgba(37,99,235,0.06)',
                  }}
                >
                  <td className="px-4 py-3 text-lg">{t.icon}</td>
                  <td className="px-4 py-3 text-white font-medium">{t.name}</td>
                  <td className="px-4 py-3 text-white/40">{t.category}</td>
                  <td className="px-4 py-3"><Pill label={t.status} /></td>
                  <td className="px-4 py-3"><Pill label={t.badge} /></td>
                  <td className="px-4 py-3 text-white/25 truncate max-w-[100px]">{t.url === '#' ? '—' : t.url}</td>
                  <td className="px-4 py-3">
                    {confirm === t.id ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { deleteTool(t.id); setConfirm(null); }} className="text-[11px] text-red-400 hover:text-red-300 font-medium">Confirm</button>
                        <button onClick={() => setConfirm(null)} className="text-[11px] text-white/25 hover:text-white/50">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirm(t.id)} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function MarketplaceTab() {
  const { marketplace, addProduct, deleteProduct } = useStore();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(blankProduct);
  const [confirm, setConfirm] = useState(null);

  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const features = form.featuresText.split('\n').map(s => s.trim()).filter(Boolean);
    addProduct({
      name: form.name,
      type: form.type,
      badge: form.badge || null,
      icon: form.icon || '📦',
      description: form.description,
      features,
      price: form.price,
      priceNum: parseFloat(form.priceNum) || 0,
      rating: parseFloat(form.rating) || 5.0,
      sales: parseInt(form.sales, 10) || 0,
    });
    setForm(blankProduct);
    setShowForm(false);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        {MKT_TYPES.map(t => {
          const count = marketplace.filter(m => m.type === t).length;
          return count > 0 ? (
            <div key={t} className="text-[11px] text-white/30 px-3 py-1.5 rounded-full border border-white/8">
              {count} {t}
            </div>
          ) : null;
        })}
        <div className="text-[11px] text-white/30 px-3 py-1.5">{marketplace.length} total</div>
      </div>

      <button
        onClick={() => setShowForm(v => !v)}
        className="btn-primary text-[12px] px-4 py-2.5 mb-5 gap-2"
      >
        {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        {showForm ? 'Cancel' : 'Add Product'}
      </button>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-6 mb-6 border space-y-4"
          style={{ background: 'rgba(37,99,235,0.04)', borderColor: 'rgba(6,182,212,0.15)' }}
        >
          <SectionTitle>New Product</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field>
              <Label>Name *</Label>
              <input required value={form.name} onChange={set('name')} placeholder="Product name" className="input-field" />
            </Field>
            <Field>
              <Label>Icon (emoji)</Label>
              <input value={form.icon} onChange={set('icon')} placeholder="📦" className="input-field" />
            </Field>
            <Field>
              <Label>Type *</Label>
              <select required value={form.type} onChange={set('type')} className="input-field">
                {MKT_TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </Field>
            <Field>
              <Label>Badge</Label>
              <select value={form.badge} onChange={set('badge')} className="input-field">
                {MKT_BADGES.map(b => <option key={b} value={b}>{b || 'None'}</option>)}
              </select>
            </Field>
            <Field>
              <Label>Price (display) *</Label>
              <input required value={form.price} onChange={set('price')} placeholder="£29 or From £99" className="input-field" />
            </Field>
            <Field>
              <Label>Price (number)</Label>
              <input type="number" value={form.priceNum} onChange={set('priceNum')} placeholder="29" className="input-field" />
            </Field>
            <Field>
              <Label>Rating (0–5)</Label>
              <input type="number" step="0.1" min="0" max="5" value={form.rating} onChange={set('rating')} placeholder="4.8" className="input-field" />
            </Field>
            <Field>
              <Label>Sales count</Label>
              <input type="number" value={form.sales} onChange={set('sales')} placeholder="0" className="input-field" />
            </Field>
          </div>
          <Field>
            <Label>Description *</Label>
            <input required value={form.description} onChange={set('description')} placeholder="One-line description" className="input-field" />
          </Field>
          <Field>
            <Label>Features (one per line)</Label>
            <textarea rows={4} value={form.featuresText} onChange={set('featuresText')} placeholder={"Feature one\nFeature two"} className="input-field resize-none" />
          </Field>
          <button type="submit" className="btn-primary text-[12px] px-5 py-2.5">Save Product</button>
        </form>
      )}

      {marketplace.length === 0 ? <EmptyState message="No products yet." /> : (
        <div className="rounded-2xl border overflow-hidden" style={{ borderColor: 'rgba(37,99,235,0.12)' }}>
          <table className="w-full text-[12.5px]">
            <thead>
              <tr style={{ background: 'rgba(37,99,235,0.06)', borderBottom: '1px solid rgba(37,99,235,0.12)' }}>
                {['Icon', 'Name', 'Type', 'Price', 'Badge', 'Rating', 'Sales', ''].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10.5px] font-semibold uppercase tracking-widest text-white/25">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {marketplace.map((m, i) => (
                <tr
                  key={m.id}
                  style={{
                    background: i % 2 === 0 ? 'rgba(6,12,26,0.92)' : 'rgba(10,18,36,0.6)',
                    borderBottom: '1px solid rgba(37,99,235,0.06)',
                  }}
                >
                  <td className="px-4 py-3 text-lg">{m.icon}</td>
                  <td className="px-4 py-3 text-white font-medium">{m.name}</td>
                  <td className="px-4 py-3 text-white/40">{m.type}</td>
                  <td className="px-4 py-3 text-white font-semibold">{m.price}</td>
                  <td className="px-4 py-3"><Pill label={m.badge} /></td>
                  <td className="px-4 py-3 text-white/40">{m.rating}</td>
                  <td className="px-4 py-3 text-white/40">{m.sales}</td>
                  <td className="px-4 py-3">
                    {confirm === m.id ? (
                      <div className="flex items-center gap-2">
                        <button onClick={() => { deleteProduct(m.id); setConfirm(null); }} className="text-[11px] text-red-400 hover:text-red-300 font-medium">Confirm</button>
                        <button onClick={() => setConfirm(null)} className="text-[11px] text-white/25 hover:text-white/50">Cancel</button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirm(m.id)} className="text-white/20 hover:text-red-400 transition-colors">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function RequestsTab() {
  const { requests, updateRequestStatus, deleteRequest } = useStore();
  const [confirm, setConfirm] = useState(null);

  if (requests.length === 0) {
    return (
      <div>
        <p className="text-white/20 text-[12px] mb-6">Submissions from the Request Tool form appear here automatically.</p>
        <EmptyState message="No requests submitted yet." />
      </div>
    );
  }

  return (
    <div>
      <p className="text-white/25 text-[12px] mb-5">{requests.length} submission{requests.length !== 1 ? 's' : ''}</p>
      <div className="space-y-3">
        {requests.map(r => (
          <div
            key={r.id}
            className="rounded-2xl p-5 border"
            style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-white font-semibold text-[13.5px]">{r.toolName}</span>
                  <Pill label={r.status} />
                  <span className="text-white/25 text-[11px]">{r.toolType}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-[12px] text-white/40 mb-3">
                  <span><span className="text-white/25">From:</span> {r.name} — {r.email}</span>
                  {r.budget && <span><span className="text-white/25">Budget:</span> {r.budget}</span>}
                  <span><span className="text-white/25">Submitted:</span> {new Date(r.submittedAt).toLocaleDateString('en-GB')}</span>
                </div>
                {r.description && (
                  <p className="text-white/30 text-[12px] leading-relaxed border-l-2 border-blue-500/20 pl-3 italic">
                    {r.description}
                  </p>
                )}
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <div className="relative">
                  <select
                    value={r.status}
                    onChange={e => updateRequestStatus(r.id, e.target.value)}
                    className="input-field text-[11px] py-1.5 pr-7 appearance-none"
                    style={{ minWidth: '110px' }}
                  >
                    {REQ_STATUSES.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-white/25 pointer-events-none" />
                </div>
                {confirm === r.id ? (
                  <div className="flex items-center gap-2">
                    <button onClick={() => { deleteRequest(r.id); setConfirm(null); }} className="text-[11px] text-red-400 font-medium">Delete</button>
                    <button onClick={() => setConfirm(null)} className="text-[11px] text-white/25">Cancel</button>
                  </div>
                ) : (
                  <button onClick={() => setConfirm(r.id)} className="text-white/20 hover:text-red-400 transition-colors">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoriesTab() {
  const { categories, addCategory, deleteCategory } = useStore();
  const [input, setInput] = useState('');

  const handleAdd = e => {
    e.preventDefault();
    if (input.trim()) {
      addCategory(input.trim());
      setInput('');
    }
  };

  return (
    <div>
      <p className="text-white/25 text-[12px] mb-6">
        These categories are used in the Tool filter panel. "All" cannot be removed.
      </p>

      {/* Current categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(c => (
          <div
            key={c}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[12px] border"
            style={{ background: 'rgba(37,99,235,0.07)', borderColor: 'rgba(6,182,212,0.15)', color: 'rgba(96,165,250,0.7)' }}
          >
            {c}
            {c !== 'All' && (
              <button
                onClick={() => deleteCategory(c)}
                className="text-white/25 hover:text-red-400 transition-colors ml-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Add category */}
      <form onSubmit={handleAdd} className="flex gap-3 max-w-sm">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="New category name"
          className="input-field flex-1"
        />
        <button type="submit" className="btn-primary text-[12px] px-4 py-2.5 gap-1.5 shrink-0">
          <Plus className="w-3.5 h-3.5" /> Add
        </button>
      </form>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { id: 'tools',       label: 'Tools',       icon: Wrench },
  { id: 'marketplace', label: 'Marketplace',  icon: ShoppingBag },
  { id: 'requests',    label: 'Requests',     icon: MessageSquare },
  { id: 'categories',  label: 'Categories',   icon: Tag },
];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('tools');
  const { tools, marketplace, requests, resetToSeedData } = useStore();
  const [confirmReset, setConfirmReset] = useState(false);

  const counts = { tools: tools.length, marketplace: marketplace.length, requests: requests.length };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-start justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'rgba(96,165,250,0.65)' }}>
              Internal
            </p>
            <h1 className="text-3xl font-black text-white">Admin Panel</h1>
            <p className="text-white/30 text-sm mt-1">Manage tools, products, requests, and categories</p>
          </div>
          <div>
            {confirmReset ? (
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-white/40">Reset to seed data?</span>
                <button
                  onClick={() => { resetToSeedData(); setConfirmReset(false); }}
                  className="text-[12px] text-red-400 hover:text-red-300 font-medium transition-colors"
                >
                  Yes, reset
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="text-[12px] text-white/25 hover:text-white/50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => setConfirmReset(true)}
                className="btn-ghost text-[12px] px-4 py-2 gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset data
              </button>
            )}
          </div>
        </div>

        {/* Tab nav */}
        <div
          className="flex gap-1 p-1 rounded-xl mb-8"
          style={{ background: 'rgba(6,12,26,0.92)', border: '1px solid rgba(37,99,235,0.12)' }}
        >
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[12.5px] font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-white/30 hover:text-white/60'
                }`}
                style={isActive ? {
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.15) 0%, rgba(37,99,235,0.12) 100%)',
                  border: '1px solid rgba(6,182,212,0.2)',
                } : {}}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">{tab.label}</span>
                {counts[tab.id] !== undefined && (
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ml-0.5 ${
                      isActive ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-white/25'
                    }`}
                  >
                    {counts[tab.id]}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div
          className="rounded-2xl p-6 sm:p-8 border"
          style={{ background: 'rgba(6,12,26,0.8)', borderColor: 'rgba(37,99,235,0.1)' }}
        >
          {activeTab === 'tools'       && <ToolsTab />}
          {activeTab === 'marketplace' && <MarketplaceTab />}
          {activeTab === 'requests'    && <RequestsTab />}
          {activeTab === 'categories'  && <CategoriesTab />}
        </div>

      </div>
    </div>
  );
}
