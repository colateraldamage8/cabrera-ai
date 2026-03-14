import { useState } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ToolCard from '../components/ToolCard';

export default function Tools() {
  const { tools, categories, statuses } = useStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeStatus, setActiveStatus] = useState('All');

  const filtered = tools.filter(t => {
    const q = search.toLowerCase();
    const matchSearch = t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.includes(q));
    const matchCat    = activeCategory === 'All' || t.category === activeCategory;
    const matchStatus = activeStatus === 'All' || t.status === activeStatus;
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 animate-fade-in">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="label-tag mb-3">Cabrera AI</p>
          <h1 className="text-[2.25rem] font-black text-white tracking-tight mb-2.5">AI Tool Library</h1>
          <p className="text-white/35 text-[14.5px]">Browse {tools.length}+ AI-powered tools, bots, and apps</p>
        </div>

        {/* Filter panel */}
        <div className="rounded-2xl p-5 mb-8 border" style={{ background: 'rgba(10,18,36,0.9)', borderColor: 'rgba(6,182,212,0.1)' }}>
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'rgba(6,182,212,0.4)' }} />
            <input
              type="text"
              placeholder="Search tools, categories, tags..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input-field pl-10"
            />
          </div>

          {/* Chips row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div>
              <p className="text-[10.5px] text-white/22 font-semibold uppercase tracking-widest mb-2">Category</p>
              <div className="flex flex-wrap gap-1.5">
                {categories.map(cat => (
                  <button key={cat} onClick={() => setActiveCategory(cat)}
                    className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}>
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <div className="sm:ml-6 sm:border-l sm:pl-6" style={{ borderColor: 'rgba(6,182,212,0.08)' }}>
              <p className="text-[10.5px] text-white/22 font-semibold uppercase tracking-widest mb-2">Status</p>
              <div className="flex flex-wrap gap-1.5">
                {statuses.map(s => (
                  <button key={s} onClick={() => setActiveStatus(s)}
                    className={`chip ${activeStatus === s ? 'chip-active-blue' : ''}`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Result count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-[13px]" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Showing <span className="text-cyan-400 font-semibold">{filtered.length}</span> tool{filtered.length !== 1 ? 's' : ''}
          </p>
          <span className="flex items-center gap-1.5 text-[12px]" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <SlidersHorizontal className="w-3.5 h-3.5" /> Filtered
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map(tool => <ToolCard key={tool.id} tool={tool} />)}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-white font-semibold text-lg mb-2">No tools found</h3>
            <p className="text-white/30 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
