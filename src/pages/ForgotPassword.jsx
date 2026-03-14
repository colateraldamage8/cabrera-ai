import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';
import Logo from '../components/Logo';

export default function ForgotPassword() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 animate-fade-in" style={{ background: '#080f1e' }}>
        <div className="text-center max-w-md">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 border border-cyan-500/20"
            style={{ background: 'rgba(6,182,212,0.08)' }}
          >
            <Mail className="w-8 h-8 text-cyan-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Check your inbox</h2>
          <p className="text-white/35 text-sm mb-8">
            We sent a reset link to <span className="text-white font-medium">{email}</span>
          </p>
          <Link to="/login" className="btn-primary">Back to Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 animate-fade-in" style={{ background: '#080f1e' }}>

      <div className="glow-blob w-96 h-96 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)' }} />

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
          <h1 className="text-3xl font-black text-white mb-1.5">Reset your password</h1>
          <p className="text-white/35 text-sm">Enter your email and we'll send you a reset link</p>
        </div>

        <div
          className="rounded-2xl p-8 space-y-5 border border-cyan-500/10"
          style={{ background: 'rgba(12,21,38,0.95)' }}
        >
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-field"
            />
          </div>

          <button
            onClick={() => email && setSent(true)}
            className="w-full btn-primary py-3.5 text-sm justify-center"
          >
            Send Reset Link
          </button>

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 text-white/30 hover:text-white/60 text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to login
          </Link>
        </div>
      </div>
    </div>
  );
}
