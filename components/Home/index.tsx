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
   image: string;
   abilities: TAbility[]
}

type TAbility = {
   ability:  {
      name: string;
   };
}


const Home: NextPage = () => {
   const [pokemonName, setPokemonName] = useState('')
   const [pokemonResponse, setPokemonResponse] = useState<IPokemon>({
      name: '',
      abilities: [],
      image: ''
   })
   const [errorMessage, setErrorMessage] = useState('')

   // the api does not return capitalized names
   // this will capitalize the first letter of each word/name
   // need to refine this later
   const transformUppercase = (word: string): string=> {
      return word[0].toUpperCase() + word.slice(1)
   }

   const fetchPokemon = async (name: string): Promise<IPokemon> => {
      try {
         const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
         const result = await response.json()
         console.log(result)

         const pokemonName = transformUppercase(result.name)
         const pokemonAbilities = result.abilities.map((item: TAbility) => {
            return transformUppercase(item.ability.name)
         })
         const pokemonImage: string = result.sprites.front_default;

         // set desired results to state to access on the webpage
         setPokemonResponse({name: pokemonName, abilities: pokemonAbilities, image: pokemonImage})
         return result;
      } catch (error) {
         // console.log(error)
         throw(error)
      }
      
   }
  return (
      <div className={styles.container}>
         <h1>Search a Pokemon</h1>
         <input type='text' id='#search' name='search' required onChange={(e) => {
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
            unoptimized
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
