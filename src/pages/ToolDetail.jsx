import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Clock, CheckCircle, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';

const statusConfig = {
  'Live':        { pill: 'bg-emerald-500/[0.1] text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
  'Beta':        { pill: 'bg-blue-500/[0.1] text-blue-400 border-blue-500/20',          dot: 'bg-cyan-400' },
  'Coming Soon': { pill: 'bg-amber-500/[0.1] text-amber-400 border-amber-500/20',       dot: 'bg-amber-400' },
};

const badgeConfig = {
  'Popular': 'bg-orange-500/[0.1] text-orange-400 border-orange-500/20',
  'Premium': 'bg-violet-500/[0.1] text-violet-400 border-violet-500/20',
  'New':     'bg-blue-500/[0.1] text-blue-400 border-blue-500/20',
};

export default function ToolDetail() {
  const { slug } = useParams();
  const { tools } = useStore();
  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    return (
      <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center animate-fade-in">
        <div className="text-center">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-white font-bold text-xl mb-2">Tool not found</h2>
          <p className="text-white/35 text-sm mb-6">That tool doesn't exist or may have moved.</p>
          <Link to="/tools" className="btn-primary px-5 py-2.5 text-sm">Back to Tools</Link>
        </div>
      </div>
    );
  }

  const status = statusConfig[tool.status] || statusConfig['Live'];
  const isComingSoon = tool.status === 'Coming Soon';
  const hasExternalLink = tool.url && tool.url !== '#';

  // Related tools — same category, excluding current
  const related = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto">

        {/* Back link */}
        <Link
          to="/tools"
          className="inline-flex items-center gap-1.5 text-[13px] text-white/35 hover:text-blue-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Tools
        </Link>

        {/* Hero card */}
        <div
          className="rounded-2xl p-8 sm:p-10 mb-6 border"
          style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start gap-6">

            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shrink-0 border"
              style={{
                background: 'linear-gradient(145deg, rgba(37,99,235,0.14) 0%, rgba(37,99,235,0.1) 100%)',
                borderColor: 'rgba(6,182,212,0.18)',
              }}
            >
              {tool.icon}
            </div>

            {/* Title block */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${status.pill}`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`}></span>
                  {tool.status}
                </span>
                {tool.badge && (
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${badgeConfig[tool.badge]}`}>
                    {tool.badge}
                  </span>
                )}
                <span
                  className="text-[11px] px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(37,99,235,0.07)', border: '1px solid rgba(37,99,235,0.12)', color: 'rgba(96,165,250,0.55)' }}
                >
                  {tool.category}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">{tool.name}</h1>
              <p className="text-white/45 text-[14.5px] leading-relaxed">{tool.description}</p>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 pt-6" style={{ borderTop: '1px solid rgba(37,99,235,0.1)' }}>
            {isComingSoon ? (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Clock className="w-4 h-4" />
                  Not available yet
                </div>
                <Link
                  to="/request"
                  className="btn-ghost text-sm px-5 py-3 gap-2"
                >
                  Request early access <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : hasExternalLink ? (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary px-6 py-3 text-sm gap-2 inline-flex"
              >
                <ExternalLink className="w-4 h-4" />
                Open Tool
              </a>
            ) : (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div
                  className="flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium text-white/30 cursor-not-allowed"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
                >
                  <Clock className="w-4 h-4" />
                  Link coming soon
                </div>
                <span className="text-[12px] text-white/20">This tool is being set up — check back soon.</span>
              </div>
            )}
          </div>
        </div>

        {/* About + Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">

          {/* About */}
          <div
            className="rounded-2xl p-7 border"
            style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(96,165,250,0.65)' }}>About</p>
            <p className="text-white/50 text-[13.5px] leading-relaxed">{tool.longDescription}</p>
          </div>

          {/* Features */}
          <div
            className="rounded-2xl p-7 border"
            style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(96,165,250,0.65)' }}>What it does</p>
            <ul className="space-y-3">
              {tool.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-[13px] text-white/45 leading-relaxed">
                  <CheckCircle className="w-3.5 h-3.5 text-blue-500/60 shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tags */}
        <div
          className="rounded-2xl px-7 py-5 mb-6 border flex items-center gap-3 flex-wrap"
          style={{ background: 'rgba(6,12,26,0.92)', borderColor: 'rgba(37,99,235,0.12)' }}
        >
          <Tag className="w-3.5 h-3.5 shrink-0" style={{ color: 'rgba(96,165,250,0.4)' }} />
          {tool.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.12)', color: 'rgba(96,165,250,0.55)' }}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Coming Soon placeholder panel */}
        {isComingSoon && (
          <div
            className="rounded-2xl p-8 mb-6 border border-amber-500/15 text-center"
            style={{ background: 'linear-gradient(145deg, rgba(245,158,11,0.05) 0%, rgba(6,12,26,0.92) 100%)' }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5 border border-amber-500/20"
              style={{ background: 'rgba(245,158,11,0.08)' }}
            >
              <Clock className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-white font-bold text-lg mb-2">This tool is in development</h2>
            <p className="text-white/35 text-[13.5px] leading-relaxed mb-6 max-w-sm mx-auto">
              We're actively building {tool.name}. Want to be notified when it launches, or need something similar now?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/request" className="btn-primary px-6 py-3 text-sm gap-2">
                Request early access <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/tools" className="btn-ghost px-6 py-3 text-sm">
                Browse other tools
              </Link>
            </div>
          </div>
        )}

        {/* Related tools */}
        {related.length > 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'rgba(96,165,250,0.65)' }}>
              More in {tool.category}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map(t => {
                const s = statusConfig[t.status] || statusConfig['Live'];
                return (
                  <Link
                    key={t.id}
                    to={`/tools/${t.slug}`}
                    className="card p-5 flex items-center gap-3 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 border"
                      style={{
                        background: 'linear-gradient(145deg, rgba(37,99,235,0.12) 0%, rgba(37,99,235,0.1) 100%)',
                        borderColor: 'rgba(37,99,235,0.14)',
                      }}
                    >
                      {t.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-white text-[13px] font-semibold truncate group-hover:text-blue-400 transition-colors">{t.name}</div>
                      <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full border mt-0.5 ${s.pill}`}>
                        <span className={`w-1 h-1 rounded-full ${s.dot}`}></span>
                        {t.status}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
