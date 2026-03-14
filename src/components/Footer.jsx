import { Link } from 'react-router-dom';
import { Twitter, Github, Linkedin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="border-t border-cyan-500/8 mt-24" style={{ background: 'rgba(6, 10, 22, 0.95)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 mb-5">
              <Logo size={32} />
              <div className="flex flex-col leading-none">
                <span className="font-bold text-base">
                  <span className="gradient-text">Cabrera</span>
                  <span className="text-white"> AI</span>
                </span>
                <span className="text-[10px] text-cyan-500/60 font-medium tracking-widest uppercase mt-0.5">AI Tool Library</span>
              </div>
            </Link>
            <p className="text-white/35 text-sm leading-relaxed mb-1">All your AI tools in one place.</p>
            <p className="text-white/35 text-sm leading-relaxed mb-6">Discover, access, and build tools that move your world forward.</p>
            <div className="flex gap-2.5">
              {[Twitter, Github, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg border border-cyan-500/15 flex items-center justify-center text-white/30 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
                  style={{ background: 'rgba(6, 182, 212, 0.04)' }}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Platform</h4>
            <ul className="space-y-3">
              {[
                { label: 'Browse Tools', path: '/tools' },
                { label: 'Marketplace', path: '/marketplace' },
                { label: 'Request a Tool', path: '/request' },
                { label: 'My Library', path: '/library' },
              ].map(item => (
                <li key={item.label}>
                  <Link to={item.path} className="text-white/35 hover:text-cyan-400 text-sm transition-colors duration-200">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Categories</h4>
            <ul className="space-y-3">
              {['Productivity', 'Travel', 'Education', 'Automation', 'Business', 'Crypto'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/35 hover:text-cyan-400 text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white text-sm mb-5 tracking-wide">Company</h4>
            <ul className="space-y-3">
              {['About', 'Blog', 'Privacy Policy', 'Terms of Service', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-white/35 hover:text-cyan-400 text-sm transition-colors duration-200">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cyan-500/8 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-sm">© 2026 Cabrera AI · AI Tool Library. All rights reserved.</p>
          <p className="text-white/20 text-sm">All your AI tools in one place.</p>
        </div>
      </div>
    </footer>
  );
}
