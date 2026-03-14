import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '../components/Logo';

export default function Login() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-20 animate-fade-in" style={{ background: '#060d1a' }}>

      {/* Background glow */}
      <div className="glow-blob w-96 h-96 top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.1) 0%, transparent 70%)' }} />

      <div className="relative w-full max-w-md">

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <Logo size={36} />
            <div className="flex flex-col leading-none text-left">
              <span className="font-bold text-lg">
                <span className="gradient-text">Cabrera</span><span className="text-white"> AI</span>
              </span>
              <span className="text-[10px] text-blue-500/60 font-medium tracking-widest uppercase">AI Tool Library</span>
            </div>
          </Link>
          <h1 className="text-3xl font-black text-white mb-1.5">Welcome back</h1>
          <p className="text-white/35 text-sm">Sign in to your account</p>
        </div>

        {/* Card */}
        <div
          className="rounded-2xl p-8 space-y-5 border border-blue-500/10"
          style={{ background: 'rgba(6,12,26,0.95)' }}
        >
          {/* Google */}
          <button className="w-full btn-secondary py-3 text-sm justify-center gap-3">
            <span>🔵</span> Continue with Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px" style={{ background: 'rgba(37,99,235,0.12)' }}></div>
            <span className="text-white/20 text-xs">or</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(37,99,235,0.12)' }}></div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-medium text-white/40 mb-2 uppercase tracking-wide">Email Address</label>
            <input
              type="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              className="input-field"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-medium text-white/40 uppercase tracking-wide">Password</label>
              <Link to="/forgot-password" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <input
                type={show ? 'text' : 'password'}
                placeholder="Enter your password"
                value={form.password}
                onChange={e => setForm({...form, password: e.target.value})}
                className="input-field pr-11"
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-blue-400 transition-colors"
              >
                {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button className="w-full btn-primary py-3.5 text-sm justify-center">Sign In</button>

          <p className="text-center text-white/25 text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
              Sign up free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
