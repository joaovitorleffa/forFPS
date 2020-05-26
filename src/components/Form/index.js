import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import PropTypes from 'prop-types';
import { Formik, Form as FormikForm, Field } from 'formik';
import logoImg from '../../assets/logoMain.svg';
import './styles.css';

export default function Form({ handleSubmit, initialValues }) {
  
  const [games, setGames] = useState([]);
  const [cpus, setCpus] = useState([]);
  const [gpus, setGpus] = useState([]);
  const [memorys, setMemorys] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await api.get('/hardwares');
      const data = response.data;
      setCpus(data.cpus);
      setGpus(data.gpus);
      setMemorys(data.ram);
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  useEffect(() => {
    async function fetchData() {
      const response = await api.get('/games');
      setGames(response.data.content);
    }
    fetchData();
  }, []);


  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <FormikForm id="form">
        <div id="logo-main">
          <a href="logo-main">
            <img src={logoImg} alt="forFPS logo" />
          </a>
        </div>

        <label>Selecione um jogo</label>
        <Field as="select" name="game" placeholder="Jogos">
          {games.map(game => (
            <option key={game.id} value={game.id}>{game.name}</option>
          ))}
        </Field>

        <label>Processador</label>
        <Field as="select" name="cpu" placeholder="Processadores">
          {cpus.map(cpu => (
            <option key={cpu.id} value={cpu.id}>{cpu.model}</option>
          ))}
        </Field>

        <label>Placa de Vídeo</label>
        <Field as="select" name="gpu" placeholder="Placas de vídeo">
          {gpus.map(gpu => (
            <option key={gpu.id} value={gpu.id}>{gpu.model}</option>
          ))}
        </Field>

        <label>Memória RAM</label>
        <Field as="select" name="ramMemory" placeholder="Memórias Ram">
          {memorys.map(ramMemory => (
            <option key={ramMemory.id} value={ramMemory.id}>{ramMemory.model}</option>
          ))}
        </Field>

        <button className="button" type="submit">Comparar</button>
      </FormikForm>
    </Formik>
  )
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired
}
