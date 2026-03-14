import { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import MarketplaceCard from '../components/MarketplaceCard';

const types = ['All', 'Template', 'Web App', 'Education Tool', 'Dashboard', 'Chatbot', 'Fitness Tool'];

export default function Marketplace() {
  const { marketplace: marketplaceItems } = useStore();
  const [search, setSearch] = useState('');
  const [activeType, setActiveType] = useState('All');

  const filtered = marketplaceItems.filter(item => {
    const q = search.toLowerCase();
    const matchSearch = item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q);
    const matchType   = activeType === 'All' || item.type === activeType;
    return matchSearch && matchType;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{ background: 'rgba(37,99,235,0.07)', borderColor: 'rgba(37,99,235,0.2)', color: '#60a5fa' }}>
            <ShoppingBag className="w-3.5 h-3.5" />
            Premium AI Products
          </div>
          <h1 className="text-[2.25rem] font-black text-white tracking-tight mb-2.5">AI Marketplace</h1>
          <p className="text-white/35 text-[14.5px]">Buy ready-made tools, templates, bots, and automations</p>
        </div>

        {/* Filter panel */}
        <div className="rounded-2xl p-5 mb-8 border" style={{ background: 'rgba(10,18,36,0.9)', borderColor: 'rgba(6,182,212,0.1)' }}>
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(6,182,212,0.4)' }} />
            <input
              type="text"
              placeholder="Search marketplace..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>
          <div>
            <p className="text-[10.5px] text-white/22 font-semibold uppercase tracking-widest mb-2">Product Type</p>
            <div className="flex flex-wrap gap-1.5">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setActiveType(t)}
                  className={`chip ${activeType === t ? 'chip-active-blue' : ''}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <p className="text-[13px] mb-6" style={{ color: 'rgba(255,255,255,0.3)' }}>
          <span className="text-cyan-400 font-semibold">{filtered.length}</span>{' '}
          product{filtered.length !== 1 ? 's' : ''} available
        </p>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(item => <MarketplaceCard key={item.id} item={item} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🛒</div>
            <h3 className="text-white font-semibold text-lg mb-2">No products found</h3>
            <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
