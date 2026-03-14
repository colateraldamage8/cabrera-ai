/**
 * useTools.js
 *
 * React hook that fetches tools via toolsService.
 * Components should use this hook instead of importing tool data directly,
 * so the switch to Supabase is transparent to the UI.
 *
 * Usage:
 *   const { tools, loading, error } = useTools();
 *   const { tools, loading, error } = useTools({ category: 'Health' });
 *   const { tools, loading, error } = useTools({ status: 'Live' });
 */

import { useState, useEffect } from 'react';
import { getAllTools, getToolsByCategory, getToolsByStatus } from '../services/toolsService';

export function useTools({ category, status } = {}) {
  const [tools,   setTools]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetch() {
      setLoading(true);
      setError(null);
      try {
        let data;
        if (category && category !== 'All') {
          data = await getToolsByCategory(category);
        } else if (status && status !== 'All') {
          data = await getToolsByStatus(status);
        } else {
          data = await getAllTools();
        }
        if (!cancelled) setTools(data);
      } catch (err) {
        if (!cancelled) setError(err.message ?? 'Failed to load tools');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetch();
    return () => { cancelled = true; };
  }, [category, status]);

  return { tools, loading, error };
}
