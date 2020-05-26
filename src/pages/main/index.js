import React, { useState } from 'react';
import api from '../../services/api';
import './styles.css';
import Form from '../../components/Form';

export default function MainPage() {
  const [data, setData] = useState([]);
  const [dataVerify, setDataVerify] = useState(false);

  async function handleSubmit(values) {
    setData([]);
    setDataVerify(false);

    const dataForm = JSON.parse(JSON.stringify(values));
    console.log(`DataForm: ${JSON.stringify(dataForm)}`)

    const dataPost = {
      "gameId": dataForm.game,
      "cpuId": dataForm.cpu,
      "gpuId": dataForm.gpu,
      "ramId": dataForm.ramMemory
    }

    try {
      const response = await api.post('/verifyHardwares', dataPost)

      setData(response.data);
      setDataVerify(true);

    } catch (err) {
      alert('Erro ao realizar comparação');
    }
  }


  const initialValues = {}

  return (
    <>
      <div id="bg">
        <div id="bg-color">
          <main className="container">
            <Form handleSubmit={handleSubmit} initialValues={initialValues} />
          </main>
        </div>
      </div>

      {dataVerify ? (
        <div className="content">
          {data.length === 0 ? (
            <div className="content-positive">
              <h4>Tudo certo</h4>
              <div className="positive">
                Seu hardware é compatível para rodar o jogo :)
              </div>
            </div>
              ):
              (
            <div className="content-result">
              <h4>Seu computador precisa de alguns upgrades</h4>
                {data.map(data => (
                  <div className="result" key={data.model}>{data.hardwareType}: {data.brand} {data.model}</div>
                ))}
            </div>
              )}
        </div>
        ) : (<div></div>)
      }
    </>
  );
}

    
