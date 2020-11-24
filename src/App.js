import React, { useEffect, useState } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [ repositories, setRepositories ] = useState([])

  useEffect(()=>{
    async function getData(){
      const response = await api.get('repositories')
      const data = await response.data
      setRepositories(data)
    }
    getData()
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: 'Meu Desafio ReactJS',
      url: 'https://github.com/siconceicao',      
      techs: ['React', 'Node.js']
    })
    setRepositories([ ...repositories, response.data ])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    setRepositories(repositories.filter(repo =>{
      return repo.id !== id
    }))
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo =>{
          return <li key={repo.id}>
          {repo.title}

          <button onClick={() => handleRemoveRepository(repo.id)}>
            Remover
          </button>
        </li>
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
