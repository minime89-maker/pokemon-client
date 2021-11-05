import React, { useEffect, useState } from 'react'
import { makeStyles, TextField, Grid, Button } from '@material-ui/core'
import axios from 'axios';
import Error from './Error'
import Loading from './Loading'
import PokemonCard from './PokemonCard'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'


const useStyles = makeStyles({
	container:{
		width: '100vw',
		margin: '60px auto',
		padding: '0 20px',
	},
	wrapper: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'space-between',
		padding: '30px'
	}

})

const Pokemons = () => {
	const classes = useStyles()
	const history = useHistory()
	const [pokemonData, setPokemonData] = useState('')
	const [search, setSearch] = useState('')
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)


	useEffect(() => {
		setError(false)
		setLoading(true)
		const pokemonData = async () => {
		await axios.get(`https://pokemon-express-api.herokuapp.com/pokemon`)
			.then((response) => {
				console.log(response.data)
				setPokemonData(response.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
		}
		pokemonData()
	}, [])


	const colorPokemon = (pokemon, index) => {
		switch (pokemon.type[0]){
			case 'Water':
			case 'Fire':
			case 'Electric':
			case 'Grass':
			case 'Dragon':
			case 'Bug':
			case 'Ground':
			case 'Flying':
			case 'Fighting':
			case 'Poison':
			case 'Ice':
			case 'Ghost':
			case 'Steel':
			case 'Dark':
			case 'Fairy':
			case 'Normal':
			case "Psychic":
			case 'Rock':
				return <PokemonCard
				index={index + 1}
				english={pokemon.name.english}
				image={`https://cdn.traction.one/pokedex/pokemon/${pokemon.id}.png`}
				japanese={pokemon.name.japanese} 
				typeOne={pokemon.type[0]}
				typeTwo={pokemon.type[1]}
				attack={pokemon.base.Attack}
				defense={pokemon.base.Defense}
				spAttack={pokemon.base['Sp. Attack']}
				spDefense={pokemon.base['Sp. Defense']}
				HP={pokemon.base.HP}
				speed={pokemon.base.Speed}
				/>
			default: 
				return <h1>Pokemons</h1>
		}
	}

	return (
		<div className={classes.root}>
			{loading && <Loading />}
			{error && <Error />}
				<Navbar />
				<div className={classes.wrapper}>
				<TextField 
					variant='outlined' size='small'
					label='Search for Pokemon' 
					value={search} 
					onChange={(e) => setSearch(e.target.value)} />
				<Button variant='contained' color='secondary' onClick={() => history.push('/pokemon/arena')}>ARENA &#8594;</Button>
				</div>
			<Grid container spacing={2} className={classes.container} >
				{pokemonData &&
					pokemonData
						.filter(pokemon => pokemon.name.english === search)
						.map((pokemon, index) => {
							return (
								<Grid item key={index} xs={12} sm={6} lg={3} >
									{colorPokemon(pokemon, index)}
								</Grid>
							)
						})}
			</Grid>
		</div>
	)
}

export default Pokemons
