import React from 'react';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router-dom';
import Index from './Views/Index.jsx';
import Detail from './Views/Detail.jsx';
import Home from './Views/Home.jsx';
import Header from './Components/Header.jsx';
import { FavoritesProvider } from './Context/FavoritesContext'; 

function App() {
  return (
    <FavoritesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LayoutWithConditionalHeader showHeader={false} mainComponent={<Home />} />} />
          <Route path="/index" element={<LayoutWithConditionalHeader showHeader={true} mainComponent={<Index />} />} />
          <Route path="/favorites" element={<LayoutWithConditionalHeader showHeader={true} mainComponent={<Index showFavorites={true} />} />} />
          <Route path="/pokemon/:id" element={<LayoutWithConditionalHeader showHeader={true} mainComponent={<Detail />} />} />
        </Routes>
      </BrowserRouter>
    </FavoritesProvider>
  );
}

// Componente para manejar header  según la ruta.
function LayoutWithConditionalHeader({ showHeader, mainComponent }) {
  return (
    <>
      {showHeader && <Header />}
      {mainComponent}
    </>
  );
}

export default App;
