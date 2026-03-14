import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Layers, ShoppingBag, Wrench, BookMarked, CheckCircle, BookmarkCheck, Search, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ToolCard from '../components/ToolCard';
import Logo from '../components/Logo';

const categories = [
  { name: 'Productivity', icon: '⚡', count: 12 },
  { name: 'Travel',       icon: '✈️', count: 8  },
  { name: 'Fitness',      icon: '💪', count: 6  },
  { name: 'Education',    icon: '📚', count: 10 },
  { name: 'Automation',   icon: '🤖', count: 14 },
  { name: 'Business',     icon: '💼', count: 9  },
  { name: 'Crypto',       icon: '₿',  count: 5  },
  { name: 'Health',       icon: '🏥', count: 7  },
];

const whatItIs = [
  { icon: <Layers    className="w-5 h-5 text-blue-400" />,  title: 'Use ready-made tools',    desc: 'Access useful apps instantly.' },
  { icon: <ShoppingBag className="w-5 h-5 text-blue-400" />, title: 'Buy premium tools',      desc: 'Unlock advanced features and templates.' },
  { icon: <Wrench    className="w-5 h-5 text-blue-400" />,  title: 'Request custom builds',   desc: 'Send your idea and get your own app built.' },
  { icon: <BookMarked className="w-5 h-5 text-blue-400" />, title: 'Build your own library',  desc: 'Save and manage your favourite tools.' },
];

const steps = [
  { num: '01', title: 'Browse tools',     desc: 'Discover useful AI tools, bots, and web apps.' },
  { num: '02', title: 'Use or save',      desc: 'Open tools instantly or add them to your personal library.' },
  { num: '03', title: 'Request your own', desc: 'Need something custom? Send your idea and get it built.' },
];

const whyPoints = [
  'All your tools in one place',
  'Built for real use',
  'Custom tools available',
  'Growing ecosystem',
];

export default function Home() {
  const { tools } = useStore();
  const featuredTools = tools.slice(0, 6);

  return (
    <div className="animate-fade-in">

      {/* ── HERO ──────────────────────────────── */}
      <section className="relative pt-32 pb-28 px-4 overflow-hidden hero-grid">
        <div className="glow-blob w-[800px] h-[500px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/3"
          style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.10) 0%, transparent 65%)' }} />
        <div className="glow-blob w-72 h-72 top-24 right-4 sm:right-16"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8 border"
            style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(6,182,212,0.2)', color: '#60a5fa' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0"></span>
            AI Tool Library — Now Live
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-[3.75rem] md:text-[4.5rem] font-black leading-[1.04] tracking-[-0.02em] mb-6">
            <span className="text-white">AI tools, bots, and</span>
            <br />
            <span className="gradient-text">smart apps</span>
            <span className="text-white"> — all in</span>
            <br className="hidden sm:block" />
            <span className="text-white"> one library.</span>
          </h1>

          {/* Sub */}
          <p className="text-[1.0625rem] sm:text-lg text-white/45 max-w-xl mx-auto leading-relaxed mb-2.5 font-light">
            Discover ready-made AI tools, explore useful web apps, and request custom solutions built for your needs.
          </p>
          <p className="text-[13px] text-white/22 mb-10">
            Built for creators, businesses, and everyday users who want smarter tools.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-20">
            <Link to="/tools" className="btn-primary btn-primary-lg gap-2 w-full sm:w-auto">
              Explore Tools <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/request" className="btn-ghost btn-ghost-lg gap-2 w-full sm:w-auto">
              Request a Tool
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-5 pt-8"
            style={{ borderTop: '1px solid rgba(37,99,235,0.08)' }}>
            {[['50+','AI Tools'],['1,200+','Active Users'],['8','Categories'],['Weekly','New Tools']].map(([n,l]) => (
              <div key={l} className="text-center">
                <div className="text-2xl font-bold gradient-text">{n}</div>
                <div className="text-[12px] text-white/25 mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT IT IS ────────────────────────── */}
      <section className="py-24 px-4 section-alt">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-12">
            <p className="label-tag mb-3">The Platform</p>
            <h2 className="text-[1.875rem] font-bold text-white tracking-tight mb-4">
              One platform. Unlimited tools.
            </h2>
            <p className="text-[14px] text-white/40 leading-relaxed">
              AI Tool Library is a growing collection of AI-powered tools, web apps, and automations. Use existing tools, buy premium solutions, or request your own custom build — all from one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatItIs.map((item, i) => (
              <div key={item.title} className="card p-5">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
                    style={{ background: 'rgba(37,99,235,0.08)', borderColor: 'rgba(37,99,235,0.14)' }}>
                    {item.icon}
                  </div>
                  <span className="text-white/15 font-bold text-xs">0{i+1}</span>
                </div>
                <h3 className="font-semibold text-white text-[13.5px] mb-1.5">{item.title}</h3>
                <p className="text-white/35 text-[13px] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="label-tag mb-3">Categories</p>
            <h2 className="text-[1.875rem] font-bold text-white tracking-tight mb-2.5">Explore tools by category</h2>
            <p className="text-[14px] text-white/35">Find tools designed for everyday life, work, and business.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            {categories.map(cat => (
              <Link
                key={cat.name}
                to={`/tools?category=${cat.name}`}
                className="card p-5 text-center group"
              >
                <div className="text-2xl mb-2.5">{cat.icon}</div>
                <div className="font-semibold text-white text-[13.5px] mb-1 group-hover:text-blue-400 transition-colors">{cat.name}</div>
                <div className="text-white/25 text-xs">{cat.count} tools</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TOOLS ─────────────────────── */}
      <section className="py-24 px-4 section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="label-tag mb-2.5">Trending</p>
              <h2 className="text-[1.875rem] font-bold text-white tracking-tight">Popular tools</h2>
            </div>
            <Link to="/tools" className="hidden sm:flex items-center gap-1 text-[13px] font-medium text-blue-400/80 hover:text-blue-400 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredTools.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
          <div className="sm:hidden mt-6 text-center">
            <Link to="/tools" className="text-sm text-blue-400 font-medium">View all tools →</Link>
          </div>
        </div>
      </section>

      {/* ── BUILD YOUR STACK ──────────────────── */}
      <section className="py-28 px-4 relative overflow-hidden">
        {/* Background glows */}
        <div className="glow-blob w-[600px] h-[400px] top-0 left-1/2 -translate-x-1/2 -translate-y-1/4"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.10) 0%, transparent 65%)' }} />
        <div className="glow-blob w-64 h-64 bottom-0 left-8"
          style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
        <div className="glow-blob w-48 h-48 top-10 right-8"
          style={{ background: 'radial-gradient(ellipse, rgba(96,165,250,0.07) 0%, transparent 70%)' }} />

        <div className="relative max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-14">
            <p className="label-tag mb-3">Your Personal Stack</p>
            <h2 className="text-[2rem] sm:text-[2.5rem] font-black text-white tracking-tight leading-tight mb-5">
              Build your own <span className="gradient-text">AI stack</span>
            </h2>
            <p className="text-[15px] text-white/45 max-w-lg mx-auto leading-relaxed">
              Use ready tools, save them, or request custom ones.<br className="hidden sm:block" />
              Cabrera AI lets you build your own personal tool library.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {[
              {
                icon: <Search className="w-5 h-5 text-blue-400" />,
                num: '01',
                title: 'Discover tools',
                desc: 'Browse a growing library of AI tools built for real tasks — productivity, health, business and more.',
                color: 'rgba(37,99,235,0.08)',
                border: 'rgba(37,99,235,0.2)',
              },
              {
                icon: <BookmarkCheck className="w-5 h-5 text-blue-400" />,
                num: '02',
                title: 'Save your favourites',
                desc: 'Bookmark tools to your personal library. Access everything in one place, anytime.',
                color: 'rgba(37,99,235,0.12)',
                border: 'rgba(59,130,246,0.28)',
                featured: true,
              },
              {
                icon: <Zap className="w-5 h-5 text-blue-400" />,
                num: '03',
                title: 'Request a custom build',
                desc: 'Need something specific? Submit a request and get a tool built around your exact needs.',
                color: 'rgba(37,99,235,0.08)',
                border: 'rgba(37,99,235,0.2)',
              },
            ].map(item => (
              <div
                key={item.num}
                className="rounded-2xl p-7 border flex flex-col gap-4 transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: item.featured
                    ? 'linear-gradient(145deg, rgba(37,99,235,0.14) 0%, rgba(29,78,216,0.08) 100%)'
                    : 'linear-gradient(145deg, rgba(8,18,40,0.97) 0%, rgba(5,12,28,0.99) 100%)',
                  borderColor: item.border,
                  boxShadow: item.featured ? '0 0 40px rgba(37,99,235,0.12)' : 'none',
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                    style={{ background: item.color, borderColor: item.border }}>
                    {item.icon}
                  </div>
                  <span className="text-[11px] font-bold text-white/15">{item.num}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-[15px] mb-2">{item.title}</h3>
                  <p className="text-white/40 text-[13.5px] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/library" className="btn-primary btn-primary-lg gap-2 w-full sm:w-auto">
              <BookmarkCheck className="w-4 h-4" /> Open My Library
            </Link>
            <Link to="/tools" className="btn-ghost btn-ghost-lg gap-2 w-full sm:w-auto">
              <Search className="w-4 h-4" /> Browse Tools
            </Link>
            <Link to="/request" className="btn-ghost btn-ghost-lg gap-2 w-full sm:w-auto">
              <Zap className="w-4 h-4" /> Request a Tool
            </Link>
          </div>

        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <p className="label-tag mb-3">Simple Process</p>
            <h2 className="text-[1.875rem] font-bold text-white tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 relative">
            {/* connector line */}
            <div className="hidden sm:block absolute top-[2.25rem] left-[calc(16.667%+1.25rem)] right-[calc(16.667%+1.25rem)] h-px"
              style={{ background: 'linear-gradient(90deg, rgba(6,182,212,0.2), rgba(6,182,212,0.4) 50%, rgba(6,182,212,0.2))' }} />

            {steps.map(s => (
              <div key={s.num} className="card p-6 text-center relative">
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-full mx-auto mb-4 font-bold text-[13px] border"
                  style={{ background: 'rgba(6,182,212,0.09)', borderColor: 'rgba(6,182,212,0.22)', color: '#60a5fa' }}>
                  {s.num}
                </div>
                <h3 className="font-semibold text-white text-[14.5px] mb-2">{s.title}</h3>
                <p className="text-white/35 text-[13px] leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REQUEST CTA ───────────────────────── */}
      <section className="py-24 px-4 section-alt">
        <div className="max-w-2xl mx-auto text-center">
          <div className="relative rounded-2xl p-10 sm:p-14 overflow-hidden border"
            style={{
              background: 'linear-gradient(145deg, rgba(37,99,235,0.07) 0%, rgba(37,99,235,0.05) 100%)',
              borderColor: 'rgba(37,99,235,0.14)',
            }}>
            <div className="glow-blob w-80 h-64 -top-10 left-1/2 -translate-x-1/2"
              style={{ background: 'radial-gradient(ellipse, rgba(37,99,235,0.12) 0%, transparent 70%)' }} />
            <div className="relative">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-6 border"
                style={{ background: 'rgba(37,99,235,0.1)', borderColor: 'rgba(6,182,212,0.18)' }}>
                <Logo size={32} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 tracking-tight">Need a custom AI tool?</h2>
              <p className="text-[14px] text-white/40 leading-relaxed mb-7 max-w-md mx-auto">
                Have an idea for an app, bot, or automation? Send your request and get a custom tool built around your needs.
              </p>
              <Link to="/request" className="btn-primary btn-primary-lg gap-2 inline-flex mb-5">
                Request a Tool <ArrowRight className="w-4 h-4" />
              </Link>
              <p className="text-[11.5px] text-white/18">
                Web apps&nbsp;·&nbsp;Chatbots&nbsp;·&nbsp;AI tools&nbsp;·&nbsp;Automation&nbsp;·&nbsp;Websites
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY CABRERA AI ────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <p className="label-tag mb-3">Why Us</p>
              <h2 className="text-[1.875rem] font-bold text-white mb-8 tracking-tight">Why Cabrera AI</h2>
              <ul className="space-y-4">
                {whyPoints.map(p => (
                  <li key={p} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 border"
                      style={{ background: 'rgba(37,99,235,0.1)', borderColor: 'rgba(6,182,212,0.22)' }}>
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <span className="text-white/65 text-[14.5px]">{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl p-7 border"
              style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}>
              <div className="flex items-center gap-3 mb-5">
                <Logo size={30} />
                <div>
                  <div className="font-bold text-white text-[14px]">Cabrera AI</div>
                  <div style={{ fontSize: '11px', color: 'rgba(96,165,250,0.6)' }}>AI Tool Library</div>
                </div>
              </div>
              <p className="text-white/35 text-[13.5px] leading-relaxed mb-6">
                All your AI tools in one place. Discover, save, buy, and request — everything you need from one platform.
              </p>
              <div className="space-y-2.5">
                <Link to="/tools" className="btn-primary w-full py-3 text-[13.5px]">
                  Browse the Library <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link to="/signup" className="btn-ghost w-full py-3 text-[13.5px]">
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
