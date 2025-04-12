import React from 'react';
import { createRoot } from 'react-dom/client';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
} from "react-router-dom";

const App = () => (
  <Router>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
    <Routes>
      <Route path="/" element={<div>Home</div>} />
      <Route path="/about" element={<div>About</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </Router>
);

createRoot(document.getElementById('root')!).render(<App />);

