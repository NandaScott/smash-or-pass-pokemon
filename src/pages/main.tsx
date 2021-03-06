import { useCallback, useEffect, useState } from 'react';
import PokeAPI, { SinglePokemon } from '../services/pokeapi';
import '../index.css';
import PokemonDisplay from '../components/pokemon-display';
import CustomButton from '../components/custom-button';
import useLocalStorage from '../hooks/useLocalStorage';

const NUMBER_OF_POKEMON = 898;
const NAN_OF_POKEMON = NUMBER_OF_POKEMON + 1;

export default function Main() {
  const [pokemonData, setPokemonData] = useState<SinglePokemon>(
    {} as SinglePokemon
  );
  const [smashList, setSmashList] = useLocalStorage<SinglePokemon[]>(
    'smash',
    []
  );
  const [passList, setPassList] = useLocalStorage<SinglePokemon[]>('pass', []);
  const [currentNumber, setCurrentNumber] = useLocalStorage('currentNumber', 1);

  useEffect(() => {
    PokeAPI.getOne(currentNumber)
      .then((val) => {
        setPokemonData(val.data);
      })
      .catch(console.log);
  }, [currentNumber]);

  const handleSmash = useCallback(() => {
    setSmashList((curr) => [...curr, pokemonData]);
    setCurrentNumber((curr) => curr + 1);
  }, [pokemonData, setCurrentNumber, setSmashList]);

  const handlePass = useCallback(() => {
    setPassList((curr) => [...curr, pokemonData]);
    setCurrentNumber((curr) => curr + 1);
  }, [pokemonData, setCurrentNumber, setPassList]);

  if (Object.keys(pokemonData).length === 0) return null;

  return (
    <div className='px-8 min-h-screen flex flex-col space-y-12 justify-center items-center'>
      <h1 className='text-center text-6xl font-bold md:mt-8'>Smash or Pass?</h1>
      {currentNumber <= NUMBER_OF_POKEMON && (
        <PokemonDisplay pokemon={pokemonData} />
      )}
      {currentNumber >= NAN_OF_POKEMON && (
        <div className='flex flex-col space-y-2 items-center'>
          <p className='text-2xl mb-8'>You disgust me</p>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
            {smashList.map((mon) => (
              <PokemonDisplay pokemon={mon} variant='dense' />
            ))}
          </div>
        </div>
      )}
      <div className='flex space-x-10 w-full md:w-3/6'>
        {currentNumber <= NUMBER_OF_POKEMON && (
          <>
            <CustomButton onClick={handlePass} color='red' fullWidth>
              Pass
            </CustomButton>
            <CustomButton onClick={handleSmash} color='green' fullWidth>
              Smash
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
}
