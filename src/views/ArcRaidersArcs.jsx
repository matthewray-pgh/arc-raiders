import { useQuery } from '@tanstack/react-query';

function fetchArcs() {
  return fetch('/api/arc-raiders/arcs?page=1&limit=50')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
}

export function ArcRaidersArcs() {
  const { data: arcs, isLoading, error } = useQuery({
    queryKey: ['arc-raiders-arcs'],
    queryFn: fetchArcs,
  });

  return (
    <div>
      <h2>Arc Raiders ARCs</h2>
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
      {!isLoading && !error && Array.isArray(arcs.data) && arcs.data.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              {/* <th>Description</th> */}
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {arcs.data.map((arc) => (
              <tr key={arc.id || arc.name} style={{ borderBottom: '1px solid #ccc' }}>
                <td style={{ position: 'relative' }}>
                  {arc.icon ? (
                    <span style={{ position: 'relative', display: 'inline-block' }}>
                      <img src={arc.icon} alt={arc.name} style={{ width: 40, height: 40 }} />
                      {arc.description && (
                        <span className="item-tooltip">
                          {arc.description}
                        </span>
                      )}
                    </span>
                  ) : (
                    '—'
                  )}
                </td>
                <td>{arc.name}</td>
                {/* <td>{arc.description}</td> */}
                <td>
                  {arc.image ? (
                    <img src={arc.image} alt={arc.name} style={{ width: 80, height: 40, objectFit: 'cover' }} />
                  ) : (
                    '—'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* {!isLoading && !error && (!Array.isArray(arcs) || arcs.data.length === 0) && <p>No ARCs found.</p>} */}
      <style>{`
        .item-tooltip {
          display: none;
          position: absolute;
          background: #222;
          color: #fff;
          padding: 8px;
          border-radius: 4px;
          z-index: 10;
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          white-space: pre-wrap;
          min-width: 200px;
        }
        td:hover .item-tooltip {
          display: block;
        }
      `}</style>
    </div>
  );
}
