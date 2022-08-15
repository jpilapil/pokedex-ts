import { useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from './Home.module.css'


interface IPokemon {
   name: string;
   url?: string;
   abilities: string;
}

const Home: NextPage = () => {
   const [pokemonName, setPokemonName] = useState('')
   const [pokemonResponse, setPokemonResponse] = useState({
      name: '',
      abilities: []
   })


   const fetchPokemon = async (name: string) => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      const result = await response.json()
      const pokemonAbilities = result.abilities.map((item: any) => {
         return item.ability.name
      })
      setPokemonResponse({name: result.name, abilities: pokemonAbilities})
      return pokemonResponse;
   }
   
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
         <p>Abilities:</p>
         <ul>
         {pokemonResponse.abilities.map((ability) => (
            <li>{ability}</li>
         ))}
         </ul>
      </div>
  )
}


export default Home
