import { ExternalLink, Lock, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const statusConfig = {
  'Live':        { pill: 'bg-emerald-500/[0.1] text-emerald-400 border-emerald-500/20', dot: 'bg-emerald-400' },
  'Beta':        { pill: 'bg-cyan-500/[0.1] text-cyan-400 border-cyan-500/20',          dot: 'bg-cyan-400' },
  'Coming Soon': { pill: 'bg-amber-500/[0.1] text-amber-400 border-amber-500/20',       dot: 'bg-amber-400' },
};

const badgeConfig = {
  'Popular': 'bg-orange-500/[0.1] text-orange-400 border-orange-500/20',
  'Premium': 'bg-violet-500/[0.1] text-violet-400 border-violet-500/20',
  'New':     'bg-cyan-500/[0.1] text-cyan-400 border-cyan-500/20',
};

export default function ToolCard({ tool }) {
  const status = statusConfig[tool.status] || statusConfig['Live'];
  const isDisabled = tool.status === 'Coming Soon';

  return (
    <div className="card p-5 flex flex-col gap-4 group">

      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border transition-colors duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.1) 100%)',
              borderColor: 'rgba(6,182,212,0.14)',
            }}
          >
            {tool.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-[14px] leading-snug truncate">{tool.name}</h3>
            <span className="text-white/35 text-xs">{tool.category}</span>
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          <span className={`flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full border ${status.pill}`}>
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${status.dot}`}></span>
            {tool.status}
          </span>
          {tool.badge && (
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${badgeConfig[tool.badge]}`}>
              {tool.badge}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="text-white/45 text-[13px] leading-relaxed flex-1">{tool.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {tool.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] text-cyan-500/45 px-2 py-0.5 rounded-full"
            style={{ background: 'rgba(6,182,212,0.05)', border: '1px solid rgba(6,182,212,0.1)' }}
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* CTA */}
      {isDisabled ? (
        <Link
          to={`/tools/${tool.slug}`}
          className="w-full py-2.5 rounded-lg text-[13px] font-medium flex items-center justify-center gap-2 text-white/30 transition-colors hover:text-white/50"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
        >
          <Clock className="w-3.5 h-3.5" />
          Coming Soon — Learn More
        </Link>
      ) : (
        <Link to={`/tools/${tool.slug}`} className="btn-primary w-full py-2.5 text-[13px]">
          {tool.badge === 'Premium' ? (
            <><Lock className="w-3.5 h-3.5" /> View Details</>
          ) : (
            <><ExternalLink className="w-3.5 h-3.5" /> Open Tool</>
          )}
        </Link>
      )}
    </div>
  );
}
