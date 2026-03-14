import { createContext, useContext, useState } from 'react';
import { tools as seedTools, categories as seedCategories, statuses } from '../data/tools';
import { marketplaceItems as seedMarketplace } from '../data/marketplace';

const CTX = createContext(null);

const KEYS = {
  tools:       'cab_tools',
  marketplace: 'cab_marketplace',
  requests:    'cab_requests',
  categories:  'cab_categories',
};

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v ? JSON.parse(v) : fallback;
  } catch {
    return fallback;
  }
}

function persist(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

export function toSlug(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function StoreProvider({ children }) {
  const [tools,       setToolsRaw]  = useState(() => load(KEYS.tools,       seedTools));
  const [marketplace, setMktRaw]    = useState(() => load(KEYS.marketplace,  seedMarketplace));
  const [requests,    setReqsRaw]   = useState(() => load(KEYS.requests,     []));
  const [categories,  setCatsRaw]   = useState(() => load(KEYS.categories,   seedCategories));

  const setTools       = d => { setToolsRaw(d);  persist(KEYS.tools,       d); };
  const setMarketplace = d => { setMktRaw(d);    persist(KEYS.marketplace,  d); };
  const setRequests    = d => { setReqsRaw(d);   persist(KEYS.requests,     d); };
  const setCategories  = d => { setCatsRaw(d);   persist(KEYS.categories,   d); };

  // ── Tools ────────────────────────────────────────────────────────────────────
  const addTool    = t  => setTools([...tools, { ...t, id: Date.now(), slug: t.slug || toSlug(t.name) }]);
  const updateTool = (id, patch) => setTools(tools.map(t => t.id === id ? { ...t, ...patch } : t));
  const deleteTool = id => setTools(tools.filter(t => t.id !== id));

  // ── Marketplace ──────────────────────────────────────────────────────────────
  const addProduct    = p  => setMarketplace([...marketplace, { ...p, id: Date.now() }]);
  const updateProduct = (id, patch) => setMarketplace(marketplace.map(m => m.id === id ? { ...m, ...patch } : m));
  const deleteProduct = id => setMarketplace(marketplace.filter(m => m.id !== id));

  // ── Requests ─────────────────────────────────────────────────────────────────
  const addRequest          = r  => setRequests([{ ...r, id: Date.now(), submittedAt: new Date().toISOString(), status: 'New' }, ...requests]);
  const updateRequestStatus = (id, status) => setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  const deleteRequest       = id => setRequests(requests.filter(r => r.id !== id));

  // ── Categories ───────────────────────────────────────────────────────────────
  const addCategory    = c  => { if (c && !categories.includes(c)) setCategories([...categories, c]); };
  const deleteCategory = c  => { if (c !== 'All') setCategories(categories.filter(x => x !== c)); };

  // ── Reset ────────────────────────────────────────────────────────────────────
  const resetToSeedData = () => {
    setTools(seedTools);
    setMarketplace(seedMarketplace);
    setCategories(seedCategories);
  };

  return (
    <CTX.Provider value={{
      tools, marketplace, requests, categories, statuses,
      addTool, updateTool, deleteTool,
      addProduct, updateProduct, deleteProduct,
      addRequest, updateRequestStatus, deleteRequest,
      addCategory, deleteCategory,
      resetToSeedData,
    }}>
      {children}
    </CTX.Provider>
  );
}

export const useStore = () => useContext(CTX);
