import { Routes, Route, Link } from 'react-router-dom';
import { Home } from './views/Home.jsx';
import { About } from './views/About.jsx';
import { ArcRaiderItems } from './views/ArcRaidersItems.jsx';
import { ArcRaidersEvents } from './views/ArcRaidersEvents.jsx';
import { ArcRaidersArcs } from './views/ArcRaidersArcs.jsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link to="/">Home</Link> |{' '}
        <Link to="/about">About</Link> |{' '}
        <Link to="/arcraider-items">Items</Link> |{' '}
        <Link to="/arcraiders-events">Events</Link> |{' '}
        <Link to="/arcraiders-arcs">ARCs</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/arcraider-items" element={<ArcRaiderItems />} />
        <Route path="/arcraiders-events" element={<ArcRaidersEvents />} />
        <Route path="/arcraiders-arcs" element={<ArcRaidersArcs />} />
      </Routes>
      <footer style={{ marginTop: '2rem', padding: '1rem', textAlign: 'center', background: '#222', color: '#fff' }}>
        Data provided by the <a href="https://metaforge.app/arc-raiders" target="_blank" rel="noopener noreferrer" style={{ color: '#4fc3f7', textDecoration: 'underline' }}>MetaForge Arc Raiders API</a>. Attribution required.
      </footer>
    </QueryClientProvider>
  );
}

export default App
