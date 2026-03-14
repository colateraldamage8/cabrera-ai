import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

const navLinks = [
  { label: 'Home',         path: '/'            },
  { label: 'Tools',        path: '/tools'       },
  { label: 'Marketplace',  path: '/marketplace' },
  { label: 'Request Tool', path: '/request'     },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();
  const active = (p) => p === '/' ? loc.pathname === '/' : loc.pathname.startsWith(p);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav border-b border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[62px]">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <Logo size={32} />
            <div className="flex flex-col leading-none">
              <span className="font-bold text-[15px] tracking-[-0.01em]">
                <span className="text-white">Cabrera</span>
                <span style={{ color: '#60a5fa' }}> AI</span>
              </span>
              <span style={{ fontSize: '9px', letterSpacing: '0.12em', color: 'rgba(96,165,250,0.5)', fontWeight: 600, textTransform: 'uppercase' }}>
                AI Tool Library
              </span>
            </div>
          </Link>

          {/* Desktop centre nav */}
          <div className="hidden md:flex items-center gap-0.5">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                  active(link.path)
                    ? 'bg-blue-500/[0.09]'
                    : 'text-white/55 hover:text-white/90 hover:bg-white/[0.04]'
                }`}
                style={active(link.path) ? { color: '#60a5fa' } : {}}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/library"
              className={`px-3.5 py-2 rounded-lg text-[13.5px] font-medium transition-all duration-150 ${
                active('/library')
                  ? 'bg-blue-500/[0.09]'
                  : 'text-white/55 hover:text-white/90 hover:bg-white/[0.04]'
              }`}
              style={active('/library') ? { color: '#60a5fa' } : {}}
            >
              My Library
            </Link>
            <Link to="/login" className="btn-ghost text-[13px] px-3.5 py-[7px]">Login</Link>
            <Link to="/signup" className="btn-primary text-[13px] px-3.5 py-[7px]">Get Started</Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        className={`md:hidden border-t border-white/[0.04] overflow-hidden transition-all duration-300 ease-in-out ${
          open ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgba(4,14,28,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <div className="px-4 py-4 space-y-0.5">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active(link.path) ? 'bg-blue-500/[0.09]' : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
              }`}
              style={active(link.path) ? { color: '#60a5fa' } : {}}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/library"
            onClick={() => setOpen(false)}
            className={`flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              active('/library') ? 'bg-blue-500/[0.09]' : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
            }`}
            style={active('/library') ? { color: '#60a5fa' } : {}}
          >
            My Library
          </Link>
          <div className="grid grid-cols-2 gap-2.5 pt-3">
            <Link to="/login" onClick={() => setOpen(false)} className="btn-ghost py-2.5 text-sm">Login</Link>
            <Link to="/signup" onClick={() => setOpen(false)} className="btn-primary py-2.5 text-sm">Get Started</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
