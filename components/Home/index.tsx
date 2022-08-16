import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './Home.module.css'

/**
 * TODO:
 * [ ] Add dynamic page to view more about pokemon
 */

interface IPokemon {
   name: string;
   url?: string;
   image?: string;
   abilities: {
      ability: string;
   }
}

type TAbility = {
   ability: {
      name: string;
   };
}

const Home: NextPage = () => {
   const [pokemonName, setPokemonName] = useState('')
   const [pokemonResponse, setPokemonResponse] = useState({
      name: '',
      abilities: [],
      image: ''
   })


   const fetchPokemon = async (name: string): Promise<IPokemon> => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const result = await response.json()
      console.log(result)
      const pokemonAbilities = result.abilities.map((item: TAbility) => {
         return item.ability.name
      })
      const pokemonImage = result.sprites.front_default;
      // set desired results to state to access on the webpage
      setPokemonResponse({name: result.name, abilities: pokemonAbilities, image: pokemonImage})
      return result;
   }
   ``
  return (
      <div className={styles.container}>
         <h1>Search a Pokemon</h1>
         <input type='text' id='#search' name='search' onChange={(e) => {
            setPokemonName(e.target.value)
         }}></input>
         <button onClick={() => {
            fetchPokemon(pokemonName)
         }}>Search Pokemon</button>
         <h1>Name: {pokemonResponse.name}</h1>
         <Image
            src={pokemonResponse.image}
            alt={pokemonResponse.name}
            width={200}
            height={200}
         />
         <p>Abilities:</p>
         <ul>
         {pokemonResponse.abilities.map((ability, i) => (
            <li key={i}>{ability}</li>
         ))}
         </ul>
      </div>
  )
}


export default Home
