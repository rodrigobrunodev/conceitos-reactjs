import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repository, setRepository] = useState([])

  useEffect(() => {
    api.get('/repositories').then((response) => {
      setRepository(response.data);
    })
  }, []);


  async function handleAddRepository() {
    const repoBody =
    {
      title: `Projeto para desafio ${Date.now()}`,
      url: `https://github.com/ShadowDeveloper/alura-classes-formations.git${Date.now()}`,
      techs: [`React ${Date.now()}`, `Node ${Date.now()}`]

    }
    const responseAddRepository = await api.post('/repositories', repoBody);
    setRepository([...repository, responseAddRepository.data]);
  }

  async function handleRemoveRepository(id) {
    const responseDeleteRepository = await api.delete(`/repositories/${id}`);

    /* Meu método para carregar novamente os repositórios e trazer uma lista atualizada
    // const responseLoadRepository = await api.get('/repositories');
    // setRepository(responseLoadRepository.data);
    */


    //Método para atualizar a lista localmente
    setRepository(repository.filter(repo => repo.id !== id));

  }

  return (
    <div>
      <h1>Repositórios</h1>
      <ul data-testid="repository-list">
        {
          repository && repository.map(repo => {
            return (
              <li key={repo.id}>
                {repo.title}
                <button onClick={() => handleRemoveRepository(repo.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
