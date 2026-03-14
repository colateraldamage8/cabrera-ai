import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import Logo from '../components/Logo';
import { useStore } from '../context/StoreContext';

const toolTypes = [
  'Chatbot / AI Assistant',
  'Web App / Tool',
  'Automation / Bot',
  'WhatsApp / Telegram Bot',
  'Dashboard / Analytics',
  'Content Generator',
  'Data Tool',
  'Other',
];

export default function RequestTool() {
  const { addRequest } = useStore();
  const [searchParams] = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    toolName: searchParams.get('name') || '',
    toolType: '',
    budget: '',
    description: searchParams.get('category')
      ? `I'm looking for a tool similar to something in the ${searchParams.get('category')} category. `
      : '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addRequest({
      name: form.name,
      email: form.email,
      toolName: form.toolName,
      toolType: form.toolType,
      budget: form.budget,
      description: form.description,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center animate-fade-in">
        <div className="text-center max-w-md">
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20"
            style={{ background: 'rgba(37,99,235,0.1)' }}
          >
            <CheckCircle className="w-10 h-10 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white mb-3">Request Received!</h2>
          <p className="text-white/35 text-sm mb-8">
            We'll review your idea and get back to you within 48 hours. We build fast.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-secondary">
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-blue-500/20"
            style={{ background: 'rgba(37,99,235,0.1)' }}
          >
            <Logo size={36} />
          </div>
          <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-2">Custom Build Studio</p>
          <h1 className="text-4xl font-black text-white mb-3">Request a Custom Tool</h1>
          <p className="text-white/35 text-sm">Tell us your idea. We'll build it — fast, clean, and ready to use.</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 space-y-6 border border-blue-500/10"
          style={{ background: 'rgba(6,12,26,0.95)' }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Full Name *</label>
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm({...form, name: e.target.value})}
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Email Address *</label>
              <input
                required
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={e => setForm({...form, email: e.target.value})}
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Tool Name / Project Name *</label>
            <input
              required
              type="text"
              placeholder="e.g. My Business FAQ Bot"
              value={form.toolName}
              onChange={e => setForm({...form, toolName: e.target.value})}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Tool Type *</label>
            <select
              required
              value={form.toolType}
              onChange={e => setForm({...form, toolType: e.target.value})}
              className="input-field"
            >
              <option value="" disabled>Select a type...</option>
              {toolTypes.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Budget (Optional)</label>
            <input
              type="text"
              placeholder="e.g. £100–£500 or open to a quote"
              value={form.budget}
              onChange={e => setForm({...form, budget: e.target.value})}
              className="input-field"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Describe Your Idea *</label>
            <textarea
              required
              rows={5}
              placeholder="What should the tool do? Who is it for? What problem does it solve? The more detail the better."
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="input-field resize-none"
            />
          </div>

          <button type="submit" className="w-full btn-primary py-4 text-sm justify-center gap-2">
            <Send className="w-4 h-4" />
            Submit Request
          </button>

          <p className="text-center text-white/20 text-xs">
            We respond within 48 hours. All ideas are reviewed personally.
          </p>
        </form>
      </div>
    </div>
  );
}
