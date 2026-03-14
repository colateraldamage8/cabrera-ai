import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Check } from 'lucide-react';
import Logo from '../components/Logo';

const perks = [
  'Access 50+ free AI tools',
  'Save tools to your library',
  'Request custom builds',
  'Early access to new tools',
];

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 animate-fade-in" style={{ background: '#060d1a' }}>

      <div className="glow-blob w-96 h-96 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.08) 0%, transparent 70%)' }} />

      <div className="relative w-full max-w-md">

        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <Logo size={36} />
            <div className="flex flex-col leading-none text-left">
              <span className="font-bold text-lg">
                <span className="gradient-text">Cabrera</span><span className="text-white"> AI</span>
              </span>
              <span className="text-[10px] text-cyan-500/60 font-medium tracking-widest uppercase">AI Tool Library</span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-1.5">Create your account</h1>
          <p className="text-white/35 text-sm">Free forever. No credit card needed.</p>
        </div>

        {/* Perks */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {perks.map(p => (
            <span
              key={p}
              className="flex items-center gap-1.5 text-xs text-white/40 px-3 py-1.5 rounded-full border border-cyan-500/10"
              style={{ background: 'rgba(6,182,212,0.04)' }}
            >
              <Check className="w-3 h-3 text-cyan-400 shrink-0" /> {p}
            </span>
          ))}
        </div>

        <div
          className="rounded-2xl p-8 space-y-5 border border-cyan-500/10"
          style={{ background: 'rgba(10,18,36,0.95)' }}
        >
          <button className="w-full btn-secondary py-3 text-sm justify-center gap-3">
            <span>🔵</span> Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.1)' }}></div>
            <span className="text-white/20 text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(6,182,212,0.1)' }}></div>
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Full Name</label>
            <input type="text" placeholder="Your name" value={form.name}
              onChange={e => setForm({...form, name: e.target.value})} className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Email Address</label>
            <input type="email" placeholder="you@email.com" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} className="input-field" />
          </div>

          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Password</label>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Create a password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="input-field pr-11"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-cyan-400 transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="w-full btn-primary py-3.5 text-sm justify-center">Create Account</button>

          <p className="text-center text-white/20 text-xs">
            By signing up you agree to our{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Terms</a>{' '}
            and{' '}
            <a href="#" className="text-cyan-400 hover:text-cyan-300 transition-colors">Privacy Policy</a>
          </p>

          <p className="text-center text-white/25 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
