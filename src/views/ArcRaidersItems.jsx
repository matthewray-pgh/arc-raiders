
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import './ArcRaidersItems.scss'; 

function fetchItems(page) {
  return fetch(`/api/arc-raiders/items?page=${page}&limit=50`)
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
}

export function ArcRaiderItems() {
  const [page, setPage] = useState(1);
  const { data: items, isLoading, error } = useQuery({
    queryKey: ['arc-raiders-items', page],
    queryFn: () => fetchItems(page),
    keepPreviousData: true,
  });

  const [itemType, setItemType] = useState('');

  // Get unique item types for filter dropdown
  const itemTypes = items && items.data
    ? Array.from(new Set(items.data.map((item) => item.item_type).filter(Boolean)))
    : [];

  // Filter items by item_type
  const filteredItems = items && items.data
    ? items.data.filter((item) => !itemType || item.item_type === itemType)
    : [];

  // Pagination info from API
  const totalPages = items && items.pagination ? items.pagination.totalPages : 1;

  useEffect(() => {
    console.log('Fetched Arc Raiders items:', items);
  }, [items]);

  return (
    <div>
      <h2>Arc Raiders Items</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="itemTypeFilter">Filter by Item Type: </label>
        <select
          id="itemTypeFilter"
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        >
          <option value="">All</option>
          {itemTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>&lt; Prev</button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
          Next &gt;
        </button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {!isLoading && !error && filteredItems.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              {/* Description column removed, now shown as tooltip */}
              <th>Type</th>
              <th>Rarity</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.id || item.name} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ position: 'relative' }}>
                  <span style={{ position: 'relative', display: 'inline-block' }}>
                    {item.icon ? (
                      <img src={item.icon} alt={item.name} style={{ width: 40, height: 40 }} />
                    ) : (
                      '—'
                    )}
                    {item.description && (
                      <span className="item-tooltip">
                        {item.description}
                      </span>
                    )}
                  </span>
                </td>
                <td>{item.name}</td>
                {/* <td>{item.description}</td> */}
                <td>{item.item_type}</td>
                <td style={{
                  color:
                    item.rarity === 'Common' ? '#bfbfbf' :
                    item.rarity === 'Uncommon' ? '#1eff00' :
                    item.rarity === 'Rare' ? '#0070dd' :
                    item.rarity === 'Epic' ? '#a335ee' :
                    item.rarity === 'Legendary' ? '#ff8000' :
                    item.rarity === 'Mythic' ? '#e5cc80' :
                    undefined
                }}>{item.rarity}</td>
                <td>{item.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && !error && filteredItems.length === 0 && <p>No items found.</p>}
    </div>
  );
}
