import { Star, ShoppingCart, Users } from 'lucide-react';

const badgeConfig = {
  'Popular': 'bg-orange-500/[0.1] text-orange-400 border-orange-500/20',
  'Premium': 'bg-violet-500/[0.1] text-violet-400 border-violet-500/20',
  'Custom':  'bg-cyan-500/[0.1] text-cyan-400 border-cyan-500/20',
  'New':     'bg-emerald-500/[0.1] text-emerald-400 border-emerald-500/20',
};

export default function MarketplaceCard({ item }) {
  return (
    <div className="card p-5 flex flex-col gap-4 group">

      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl shrink-0 border transition-colors duration-300"
            style={{
              background: 'linear-gradient(145deg, rgba(6,182,212,0.12) 0%, rgba(37,99,235,0.1) 100%)',
              borderColor: 'rgba(6,182,212,0.14)',
            }}
          >
            {item.icon}
          </div>
          <div className="min-w-0">
            <h3 className="font-semibold text-white text-[14px] leading-snug">{item.name}</h3>
            <span className="text-white/35 text-xs">{item.type}</span>
          </div>
        </div>
        {item.badge && (
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border shrink-0 ${badgeConfig[item.badge] ?? badgeConfig['New']}`}>
            {item.badge}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-white/45 text-[13px] leading-relaxed flex-1">{item.description}</p>

      {/* Features */}
      <ul className="space-y-1.5">
        {item.features.map(f => (
          <li key={f} className="flex items-center gap-2 text-[12px] text-white/35">
            <span className="w-1 h-1 rounded-full bg-cyan-500/60 shrink-0"></span>
            {f}
          </li>
        ))}
      </ul>

      {/* Rating & sales */}
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 text-[12px]">
          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          <span className="text-white/55 font-semibold">{item.rating}</span>
        </span>
        <span className="flex items-center gap-1.5 text-[12px] text-white/30">
          <Users className="w-3 h-3" />
          {item.sales} sales
        </span>
      </div>

      {/* Price + CTA */}
      <div
        className="flex items-center justify-between gap-3 pt-3"
        style={{ borderTop: '1px solid rgba(6,182,212,0.07)' }}
      >
        <div className="leading-none">
          <div className="text-xl font-bold text-white">{item.price}</div>
          {!item.price.toString().startsWith('From') && (
            <div className="text-[11px] text-white/25 mt-0.5">one-time</div>
          )}
        </div>
        <button className="btn-primary text-[12px] px-4 py-2.5">
          <ShoppingCart className="w-3.5 h-3.5" />
          {item.badge === 'Custom' ? 'Get a Quote' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}
