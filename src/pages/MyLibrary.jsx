import { BookMarked, ShoppingBag, Activity, MessageSquare, Sparkles, Compass, Zap, ArrowRight, Clock } from 'lucide-react';
import { tools } from '../data/tools';
import { marketplaceItems } from '../data/marketplace';
import { Link } from 'react-router-dom';

// ── Mock data ─────────────────────────────────────────────────────────────────

const savedTools = [tools[0], tools[2], tools[5]]; // UK Benefits, Homework Assistant, Business Helper

const purchasedProducts = [marketplaceItems[2], marketplaceItems[5]]; // Homework AI Pro, Gym Planner Premium

const recentActivity = [
  { id: 1, label: 'Opened',    tool: tools[1],             time: '2 hours ago'  },
  { id: 2, label: 'Saved',     tool: tools[7],             time: 'Yesterday'    },
  { id: 3, label: 'Purchased', tool: null, product: marketplaceItems[2], time: '3 days ago' },
  { id: 4, label: 'Opened',    tool: tools[3],             time: '4 days ago'   },
];

const myRequests = [
  { id: 1, name: 'Invoice Generator Bot', type: 'Automation', status: 'In Review',  submitted: '2026-03-01' },
  { id: 2, name: 'Property Search Tool',  type: 'Web App',    status: 'Building',   submitted: '2026-02-20' },
];

const recommended = [tools[4], tools[6], tools[7]]; // WhatsApp Bot Builder, Crypto Tools, Medical Assistant

const continueExploring = [tools[1], tools[3], tools[5]]; // Cheap Flights, Gym AI, Business Helper

// ── Sub-components ─────────────────────────────────────────────────────────────

function SectionHeading({ icon, label }) {
  return (
    <h2 className="flex items-center gap-2 mb-4">
      {icon}
      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'rgba(96,165,250,0.7)' }}>{label}</span>
    </h2>
  );
}

function Row({ left, right }) {
  return (
    <div className="card-flat">
      {left}
      {right}
    </div>
  );
}

function StatusPill({ status }) {
  const map = {
    'In Review': 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    'Building':  'bg-blue-500/10 text-blue-400 border-blue-500/20',
    'Done':      'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border shrink-0 ${map[status] ?? map['Done']}`}>
      {status}
    </span>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function MyLibrary() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-blue-500 text-xs font-semibold uppercase tracking-widest mb-1">Dashboard</p>
            <h1 className="text-3xl font-black text-white">My Library</h1>
            <p className="text-white/35 text-sm mt-1">Your saved tools, purchases, and activity</p>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm border border-blue-500/25"
              style={{ background: 'linear-gradient(135deg, #0891b2, #2563eb)' }}
            >
              JD
            </div>
            <div className="hidden sm:block">
              <div className="text-white font-medium text-sm">Joseph D.</div>
              <div className="text-blue-500/60 text-xs">Free Plan</div>
            </div>
          </div>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <BookMarked  className="w-4 h-4 text-blue-400" />,    label: 'Saved Tools',   count: savedTools.length,      color: 'rgba(37,99,235,0.1)',   border: 'rgba(6,182,212,0.2)'  },
            { icon: <ShoppingBag className="w-4 h-4 text-blue-400" />,   label: 'Purchased',      count: purchasedProducts.length, color: 'rgba(59,130,246,0.08)', border: 'rgba(59,130,246,0.2)' },
            { icon: <MessageSquare className="w-4 h-4 text-amber-400" />, label: 'My Requests',  count: myRequests.length,        color: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
            { icon: <Activity     className="w-4 h-4 text-emerald-400" />, label: 'Activities',  count: recentActivity.length,    color: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
          ].map(s => (
            <div
              key={s.label}
              className="rounded-2xl p-5 flex items-center gap-4 border"
              style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center border shrink-0"
                style={{ background: s.color, borderColor: s.border }}>
                {s.icon}
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{s.count}</div>
                <div className="text-white/30 text-xs">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left / main column */}
          <div className="lg:col-span-2 space-y-10">

            {/* 1. Saved Tools */}
            <div>
              <SectionHeading icon={<BookMarked className="w-4 h-4 text-blue-400" />} label="Saved Tools" />
              <div className="space-y-2">
                {savedTools.map(tool => (
                  <Row
                    key={tool.id}
                    left={
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{tool.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{tool.name}</div>
                          <div className="text-white/30 text-xs">{tool.category}</div>
                        </div>
                      </div>
                    }
                    right={
                      <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors shrink-0">
                        Open →
                      </button>
                    }
                  />
                ))}
              </div>
            </div>

            {/* 2. Purchased Products */}
            <div>
              <SectionHeading icon={<ShoppingBag className="w-4 h-4 text-blue-400" />} label="Purchased Products" />
              <div className="space-y-2">
                {purchasedProducts.map(item => (
                  <Row
                    key={item.id}
                    left={
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{item.icon}</span>
                        <div>
                          <div className="text-white font-medium text-sm">{item.name}</div>
                          <div className="text-white/30 text-xs">{item.type} · {item.price}</div>
                        </div>
                      </div>
                    }
                    right={
                      <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full shrink-0">
                        Active
                      </span>
                    }
                  />
                ))}
              </div>
            </div>

            {/* 3. Recent Activity */}
            <div>
              <SectionHeading icon={<Activity className="w-4 h-4 text-emerald-400" />} label="Recent Activity" />
              <div className="space-y-2">
                {recentActivity.map(entry => {
                  const item = entry.tool ?? entry.product;
                  return (
                    <Row
                      key={entry.id}
                      left={
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{item.icon}</span>
                          <div>
                            <div className="text-white font-medium text-sm">{item.name}</div>
                            <div className="text-white/30 text-xs">
                              <span className="text-white/40">{entry.label}</span> · {entry.time}
                            </div>
                          </div>
                        </div>
                      }
                      right={
                        <Clock className="w-3.5 h-3.5 text-white/15 shrink-0" />
                      }
                    />
                  );
                })}
              </div>
            </div>

            {/* 4. My Requests */}
            <div>
              <SectionHeading icon={<MessageSquare className="w-4 h-4 text-amber-400" />} label="My Requests" />
              <div className="space-y-2">
                {myRequests.map(req => (
                  <Row
                    key={req.id}
                    left={
                      <div>
                        <div className="text-white font-medium text-sm">{req.name}</div>
                        <div className="text-white/30 text-xs">{req.type} · Submitted {req.submitted}</div>
                      </div>
                    }
                    right={<StatusPill status={req.status} />}
                  />
                ))}
                <div className="pt-1">
                  <Link to="/request" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                    + Submit a new request
                  </Link>
                </div>
              </div>
            </div>

          </div>

          {/* Right / sidebar */}
          <div className="space-y-10">

            {/* 5. Recommended Tools */}
            <div>
              <SectionHeading icon={<Sparkles className="w-4 h-4 text-blue-400" />} label="Recommended Tools" />
              <div className="space-y-2">
                {recommended.map(tool => (
                  <div
                    key={tool.id}
                    className="rounded-xl px-3 py-3 flex items-center gap-3 cursor-pointer border border-blue-500/8 hover:border-blue-500/20 transition-all duration-200"
                    style={{ background: 'rgba(6,12,26,0.8)' }}
                  >
                    <span className="text-xl shrink-0">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{tool.name}</div>
                      <div className="text-white/30 text-xs">{tool.category}</div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border shrink-0 ${
                        tool.status === 'Live'
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          : tool.status === 'Beta'
                          ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 6. Continue Exploring */}
            <div>
              <SectionHeading icon={<Compass className="w-4 h-4 text-blue-400" />} label="Continue Exploring" />
              <div className="space-y-2">
                {continueExploring.map(tool => (
                  <div
                    key={tool.id}
                    className="rounded-xl px-3 py-3 flex items-center gap-3 cursor-pointer border border-blue-500/8 hover:border-blue-500/20 transition-all duration-200"
                    style={{ background: 'rgba(6,12,26,0.8)' }}
                  >
                    <span className="text-xl shrink-0">{tool.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-sm font-medium truncate">{tool.name}</div>
                      <div className="text-white/30 text-xs">{tool.category}</div>
                    </div>
                  </div>
                ))}
                <div className="pt-1">
                  <Link to="/tools" className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors flex items-center gap-1">
                    Browse all tools <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Upgrade CTA */}
            <div
              className="rounded-2xl p-6 border border-blue-500/15 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0.07) 100%)' }}
            >
              <div className="glow-blob w-32 h-32 -top-4 -right-4"
                style={{ background: 'radial-gradient(ellipse, rgba(6,182,212,0.15) 0%, transparent 70%)' }} />
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border border-blue-500/20"
                  style={{ background: 'rgba(37,99,235,0.12)' }}
                >
                  <Zap className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-sm mb-1.5">Upgrade to Pro</h3>
                <p className="text-white/35 text-xs mb-4 leading-relaxed">
                  Unlock premium tools, unlimited saves, and early access to new features.
                </p>
                <button className="w-full btn-primary py-2.5 text-xs justify-center">
                  Upgrade Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
