import React, { createContext, useContext, useState, useEffect } from 'react';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (pokemon) => {
    setFavorites((prevFavorites) => [...prevFavorites, pokemon]);
  };

  const removeFavorite = (pokemon) => {
    setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.name !== pokemon.name));
  };

  const isFavorite = (pokemon) => {
    return favorites.some(fav => fav.name === pokemon.name);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
