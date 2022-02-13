import Axios from 'axios';

const axios = Axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
})

export interface SinglePokemon {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      }
    }
  }
}

async function getOne(number: number) {
  return axios.get<SinglePokemon>(`/pokemon/${number}`)
    .catch((e) => {
      console.log(e)
      throw e;
    })
}

const PokeAPI = { getOne }

export default PokeAPI;