import { useState, useMemo, useCallback } from 'react';

export default function useFilters(items = [], filterConfig = {}) {
  const [filters, setFilters] = useState(
    Object.fromEntries(Object.entries(filterConfig).map(([k, v]) => [k, v.default ?? 'all']))
  );
  const [search, setSearch] = useState('');

  const setFilter = useCallback((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(Object.fromEntries(Object.entries(filterConfig).map(([k, v]) => [k, v.default ?? 'all'])));
    setSearch('');
  }, [filterConfig]);

  const filtered = useMemo(() => {
    let result = [...items];

    // Apply search
    if (search && filterConfig._searchFields) {
      const q = search.toLowerCase();
      result = result.filter(item =>
        filterConfig._searchFields.some(f => String(item[f] ?? '').toLowerCase().includes(q))
      );
    }

    // Apply each filter
    Object.entries(filters).forEach(([key, value]) => {
      if (value === 'all' || value === '' || value === null) return;
      result = result.filter(item => String(item[key]) === String(value));
    });

    return result;
  }, [items, filters, search, filterConfig]);

  return { filtered, filters, search, setFilter, setSearch, resetFilters, count: filtered.length };
}
