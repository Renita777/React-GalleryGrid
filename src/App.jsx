
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import GalleryPage from './GalleryPage';
import TestPage from './TestPage';
import LoginPage from './LoginPage';

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname === '/';

  return (
    <div>
      {!hideNavbar && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light px-3">
          <div className="navbar-nav">
            <Link className="nav-link" to="/gallery">Gallery</Link>
            <Link className="nav-link" to="/test">Test</Link>
          </div>
        </nav>
      )}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/test" element={<TestPage />} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}

export default App;



