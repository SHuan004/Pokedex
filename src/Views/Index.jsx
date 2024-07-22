import React, { useState, useEffect } from "react";
import { Container, Row, Col, InputGroup, InputGroupText, Input } from "reactstrap";
import axios from "axios";
import { PaginationControl } from 'react-bootstrap-pagination-control';
import PokeCard from '../Components/PokeCard';
import { useFavorites } from '../Context/FavoritesContext';

const Index = ({ showFavorites = false }) => {
  const [pokemons, setPokemons] = useState([]);
  const [allPokemons, setAllPokemons] = useState([]);
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('');
  const [offset, setOffset] = useState(0);
  const [limit] = useState(30);
  const [total, setTotal] = useState(0);
  const { favorites } = useFavorites();

  // Efecto para cargar datos basados en favoritos o todos los pokemons
  useEffect(() => {
    if (showFavorites) {
      setList(favorites);
      setTotal(favorites.length);
    } else {
      fetchPokemons(offset, limit);
      fetchAllPokemons();
    }
  }, [showFavorites, favorites, offset]);

  // Carga los pokemons de la API con paginación
  const fetchPokemons = async (offset, limit) => {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
    try {
      const { data } = await axios.get(url);
      setPokemons(data.results);
      setList(data.results);
      setTotal(data.count);
    } catch (error) {
      console.error('Error al cargar los pokemons:', error);
    }
  };

  // Carga todos los pokemons para la función de búsqueda
  const fetchAllPokemons = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0';
    try {
      const { data } = await axios.get(url);
      setAllPokemons(data.results);
    } catch (error) {
      console.error('Error al cargar todos los pokemons:', error);
    }
  };

  // Maneja el cambio en el campo de búsqueda y filtra los pokemons
  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setFilter(searchTerm);
    if (event.keyCode === 13) {
      const filteredList = searchTerm.trim() ? allPokemons.filter(pokemon => pokemon.name.includes(searchTerm)) : pokemons;
      setList(filteredList);
      setTotal(filteredList.length);
    }
  };

  // Cambia la página de pokemons
  const handlePageChange = async (page) => {
    const newOffset = (page - 1) * limit;
    setOffset(newOffset);
    if (!showFavorites) {
      await fetchPokemons(newOffset, limit);
    }
  };

  return (
    <Container className="shadow mt-3">
      <Row className='animate__animated animate__backInDown'>
        <Col>
          <InputGroup className="mt-3 mb-3 shadow">
            <InputGroupText><i className="fa-solid fa-search"></i></InputGroupText>
            <Input
              value={filter}
              onChange={handleSearch}
              onKeyUp={handleSearch}
              placeholder="Buscar Pokémon"
            />
          </InputGroup>
        </Col>
      </Row>
      <Row className="mt-3">
        {list.map((pokemon, index) => (
          <PokeCard key={index} pokemon={pokemon} />
        ))}
        {!showFavorites && (
          <PaginationControl
            last={true}
            limit={limit}
            total={total}
            page={Math.ceil(offset / limit) + 1}
            changePage={handlePageChange}
          />
        )}
      </Row>
    </Container>
  );
};

export default Index;
