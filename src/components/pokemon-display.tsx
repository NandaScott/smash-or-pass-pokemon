import _capitalize from 'lodash/capitalize';
import '../index.css';
import { SinglePokemon } from '../services/pokeapi';

interface PokemonDisplayProps {
  pokemon: SinglePokemon;
  variant: 'full' | 'dense';
}

export default function PokemonDisplay(props: PokemonDisplayProps) {
  const { pokemon, variant } = props;

  if (variant === 'dense') {
    return (
      <div className='bg-white rounded-md p-2 shadow-md space-y-2 flex flex-col justify-center items-center'>
        <p className='text-2xl font-bold'>
          {`#${pokemon.id}`} {_capitalize(pokemon.name)}
        </p>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default}
          alt='official bulbasaur artwork'
          className='w-auto h-40 md:h-56'
        />
      </div>
    );
  }

  return (
    <div className='bg-white rounded-md p-6 shadow-md space-y-10 flex flex-col justify-center items-center'>
      <p className='text-2xl font-bold'>
        {`#${pokemon.id}`} {_capitalize(pokemon.name)}
      </p>
      <img
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt='official bulbasaur artwork'
        className='w-auto h-80 md:max-w-md md:h-auto'
      />
    </div>
  );
}

PokemonDisplay.defaultProps = {
  variant: 'full',
};
