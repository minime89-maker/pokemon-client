import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'


const Pokemons = () => {

	const [pokemons, setPokemons] = useState([])
	const history = useHistory()

	useEffect(() => {
		axios.get('http://localhost:3000/pokemon')
			.then((res) => {
				console.log(res.data[1].name)
				setPokemons(res.data)
			})
			.catch((err) => console.log(err))
	}, [])

	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', cursor: 'pointer'}}>
			{pokemons && pokemons.map((poke) => (
					<ul onClick={() => history.push(`/pokemon/${poke.id}`)} key={poke.id}>
						<li>{poke.name.english}</li>
						<li>{poke.name.japanese}</li>
						<li>{poke.name.french}</li>
						<li>{poke.name.chinese}</li>
					</ul>
				)
			)})
		</div>
	)
}

export default Pokemons
