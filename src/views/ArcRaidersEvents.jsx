import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

function fetchEventsSchedule() {
  return fetch('/api/arc-raiders/events-schedule')
    .then((res) => {
      if (!res.ok) throw new Error('Network response was not ok');
      return res.json();
    });
}

export function ArcRaidersEvents() {
  const { data: events, isLoading, error } = useQuery({
    queryKey: ['arc-raiders-events-schedule'],
    queryFn: fetchEventsSchedule,
  });

  const [mapFilter, setMapFilter] = useState('');

  // Get unique maps for filter dropdown (trimmed, original case)
  const maps = events && events.data
    ? Array.from(
        new Set(
          events.data
            .map((event) => (event.map ? event.map.trim() : ''))
            .filter(Boolean)
        )
      )
    : [];

  // Filter events by map (trimmed, original case)
  const filteredEvents = events && events.data
    ? events.data.filter((event) => {
        if (!mapFilter) return true;
        if (!event.map) return false;
        return event.map.trim() === mapFilter;
      })
    : [];

  return (
    <div>
      <h2>Arc Raiders Events Schedule</h2>
      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="mapFilter">Filter by Map: </label>
        <select
          id="mapFilter"
          value={mapFilter}
          onChange={(e) => setMapFilter(e.target.value)}
        >
          <option value="">All</option>
          {maps.map((map) => (
            <option key={map} value={map}>{map}</option>
          ))}
        </select>
      </div>
      
      {isLoading && <p>Loading...</p>}

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}

      {!isLoading && !error && filteredEvents.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Icon</th>
              <th>Name</th>
              <th>Map</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvents.map((event, idx) => (
              <tr key={`${event.name}-${event.map}-${event.startTime}-${idx}`} style={{ borderBottom: '1px solid #ccc' }}>
                <td>
                  {event.icon ? (
                    <img src={event.icon} alt={event.name} style={{ width: 40, height: 40 }} />
                  ) : (
                    '—'
                  )}
                </td>
                <td>{event.name}</td>
                <td>{event.map}</td>
                <td>{event.startTime ? new Date(event.startTime).toLocaleString() : '—'}</td>
                <td>{event.endTime ? new Date(event.endTime).toLocaleString() : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!isLoading && !error && filteredEvents.length === 0 && <p>No events found.</p>}
    </div>
  );
}
