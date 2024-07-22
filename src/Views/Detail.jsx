import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, CardBody, CardText, CardImg, Button, Badge, Progress } from 'reactstrap';
import axios from 'axios';

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [pokemonDetails, setPokemonDetails] = useState({
    pokemon: {},
    image: '',
    description: '',
    statistics: [],
    type: [],
    isLoading: true
  });

  // Función para obtener datos del Pokémon cuando el componente se monta
  useEffect(() => {
    fetchPokemon();
  }, [id]);

  // Función asíncrona para recuperar todos los datos del Pokémon incluyendo estadísticas, tipos e información general
  const fetchPokemon = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
      const { data } = await axios.get(url);
      const details = await Promise.all([
        getDescription(data.species.name),
        getTypes(data.types),
        getStatistics(data.stats)
      ]);

      setPokemonDetails({
        pokemon: data,
        image: data.sprites.other.dream_world.front_default || data.sprites.other['official-artwork'].front_default,
        description: details[0],
        type: details[1],
        statistics: details[2],
        isLoading: false
      });
    } catch (error) {
      console.error('Error al recuperar los datos', error);
      setPokemonDetails(prev => ({ ...prev, isLoading: false }));
    }
  };

  // Función para obtener la descripción y limpiar el texto obtenido
  const getDescription = async (speciesName) => {
    const url = `https://pokeapi.co/api/v2/pokemon-species/${speciesName}`;
    const { data } = await axios.get(url);
    const descEntry = data.flavor_text_entries.find(entry => entry.language.name === 'en');
    return descEntry ? cleanText(descEntry.flavor_text) : '';
  };

  // Función para extraer los tipos del Pokémon
  const getTypes = async (types) => {
    const promises = types.map(async ({ type }) => {
      const { data } = await axios.get(type.url);
      return data.names[7].name;
    });
    return Promise.all(promises);
  };

  // Función para calcular las estadísticas para la visualización
  const getStatistics = async (stats) => {
    const promises = stats.map(async (stat) => {
      const { data } = await axios.get(stat.stat.url);
      return { name: data.names[7].name, value: stat.base_stat };
    });
    return Promise.all(promises);
  };

  // Función para limpiar y normalizar el texto de la API
  const cleanText = (text) => text
    .normalize("NFKD")
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/[\u2013\u2014]/g, '-')
    .replace(/[\u2018\u2019\u201C\u201D]/g, "'")
    .replace(/\f/g, '')
    .replace(/[\r\n\t]+/g, ' ')
    .trim();

  const { pokemon, image, description, statistics, type, isLoading } = pokemonDetails;

  return (
    <Container className='mt-3 d-flex justify-content-center align-items-center vh-100'>
      {isLoading ? (
        <ComponenteCarga />
      ) : (
        <TarjetaDetallePokemon pokemon={pokemon} image={image} description={description} statistics={statistics} type={type} navigate={navigate} />
      )}
    </Container>
  );
};

// Componente para mostrar el spinner de carga
const ComponenteCarga = () => (
  <Row className="d-flex justify-content-center align-items-center">
    <Col md='12'>
      <img src='/img/pokeball.gif' className='pokeball-loading' alt='Cargando...' />
    </Col>
  </Row>
);

// Componente para mostrar la tarjeta con detalles del Pokémon
const TarjetaDetallePokemon = ({ pokemon, image, description, statistics, type, navigate }) => (
  <Row>
    <Col>
      <Card className={`shadow mt-3 mb-3 animate__animated animate__fadeIn`}>
        <CardBody>
          <FilaNavegacion navigate={navigate} />
          <FilaContenidoPrincipal pokemon={pokemon} image={image} description={description} type={type} />
          <FilaEstadisticas statistics={statistics} />
        </CardBody>
      </Card>
    </Col>
  </Row>
);

// Componente para el botón de navegación
const FilaNavegacion = ({ navigate }) => (
  <Row className='justify-content-end'>
    <Col className='text-end'>
      <Button color='bg-danger' onClick={() => navigate('/index')}>
        <i className='fa-solid fa-home'></i> Inicio
      </Button>
    </Col>
  </Row>
);

// Componente para mostrar el contenido principal
const FilaContenidoPrincipal = ({ pokemon, image, description, type }) => (
  <Row>
    <Col md='6'>
      <CardText className='h1 text-capitalize'>
        <img src="/img/pokeball3.jpg" className='small-image animate__animated animate__bounceInLeft' alt='Pokeball' />
        {pokemon.name}
      </CardText>
      <CardText className='fs-3'>{description}</CardText>
      <CardText className='fs-5'>Altura: <strong>{(pokemon.height) / 10} m</strong></CardText>
      <CardText className='fs-5'>Peso: <strong>{(pokemon.weight) / 10} kg</strong></CardText>
      <CardText className='fs-5'>
        Tipo: {type.map((t, i) => <Badge color='danger' pill className='me-1 ms-1' key={i}>{t}</Badge>)}
      </CardText>
    </Col>
    <Col md='6' className='d-flex justify-content-center align-items-center animate__animated animate__bounceInRight'>
      <Card className='pokemon-card'>
        <CardImg top src={image} alt={pokemon.name} className='pokemon-image' />
      </Card>
    </Col>
  </Row>
);

// Componente para mostrar las estadísticas
const FilaEstadisticas = ({ statistics }) => (
  <Row>
    <Col md='12' className='mt-3'>
      <CardText as="h2" className='text-center'><strong>Estadísticas</strong></CardText>
      {statistics.map((s, i) => (
        <Row key={i} className='animate__animated animate__bounceInUp'>
          <Col xs='6' md='3'><b>{s.name}</b></Col>
          <Col xs='6' md='9'>
            <Progress className='my-2' value={s.value}>{s.value}</Progress>
          </Col>
        </Row>
      ))}
    </Col>
  </Row>
);

export default Detail;
