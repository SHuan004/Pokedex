import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Col, Card, CardBody, CardFooter, CardImg, Badge, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { useFavorites } from '../Context/FavoritesContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const PokeCard = ({ pokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Efecto para cargar detalles del Pokémon
  useEffect(() => {
    fetchPokemonDetails();
  }, [pokemon]);

  // Función para cargar detalles del Pokémon desde la API
  const fetchPokemonDetails = async () => {
    if (pokemon.url) {
      try {
        const { data } = await axios.get(pokemon.url);
        setPokemonDetails(data);
        setImage(data.sprites.other.dream_world.front_default || data.sprites.other['official-artwork'].front_default);
        setIsLoading(false);
      } catch (error) {
        console.error('Error al obtener detalles del pokemon:', error);
        setIsLoading(false);
      }
    } else {
      setPokemonDetails(pokemon);
      setImage(pokemon.sprites.other.dream_world.front_default || pokemon.sprites.other['official-artwork'].front_default);
      setIsLoading(false);
    }
  };

  // Renderiza componente de carga si aún está cargando
  if (isLoading) {
    return (
      <Col sm='4' lg='4' className='mb-3'>
        <Card className="shadow border-4 border-warning">
          <CardImg src='/img/pokeball.gif' height='200' className='p-3' alt="Cargando..." />
        </Card>
      </Col>
    );
  }

  // Maneja el clic en el botón de favorito
  const handleFavoriteClick = () => {
    if (isFavorite(pokemonDetails)) {
      removeFavorite(pokemonDetails);
    } else {
      addFavorite(pokemonDetails);
    }
  };

  return (
    <Col sm='4' lg='4' className='mb-3'>
      <Card className='position-relative animate__animated animate__zoomIn card-hover shadow border-4'>
        <Button
          color="link"
          className='position-absolute top-0 end-0 m-2 p-0'
          onClick={handleFavoriteClick}
          aria-label="Agregar a Favoritos"
        >
          <FontAwesomeIcon
            icon={faStar}
            size="2x"
            color={isFavorite(pokemonDetails) ? "gold" : "grey"}
          />
        </Button>
        <CardImg src={image} height='150' className='p-2' alt={`Imagen de ${pokemonDetails.name}`} />
        <CardBody className='text-center'>
          <Badge pill color='danger'>#{pokemonDetails.id}</Badge>
          <label className='fs-4 text-capitalize ms-1'>{pokemonDetails.name}</label>
        </CardBody>
        <CardFooter className='bg-danger'>
          <Link to={`/pokemon/${pokemonDetails.name}`} className='btn btn-dark'>
            <i className='fa-solid fa-arrow-up-right-from-square'></i> Detalle
          </Link>
        </CardFooter>
      </Card>
    </Col>
  );
};

export default PokeCard;
