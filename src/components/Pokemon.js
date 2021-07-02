import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router' 
import { useHistory } from 'react-router-dom'

const Pokemon = () => {

	const [pokemon, setPokemon] = useState()
	const { id } = useParams()
	const history = useHistory()

	useEffect(() => {
		axios.get(`http://localhost:3000/pokemon/${id}`)
			.then((res) => {
				console.log(res.data)
				setPokemon(res.data)
			})
			.catch((err) => console.log(err))
	}, [id])

	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
		<button onClick={() => history.goBack()} style={{margin: '20px auto'}}>Go Back</button>
			{pokemon && (
				<div >
					<h1>Name: {pokemon.name.english}</h1>
					<div style={{color: 'red'}}>
						<h2>Type: </h2> 
						{pokemon.type && pokemon.type.map((type, index) => (
							<div key={index}>
								<p> {type}</p>
							</div>
						))}
					</div>
					<div style={{color: 'blue', cursor: 'pointer'}}>
						<h2 onClick={() => history.push(`/pokemon/${pokemon.id}/info`)}>Base: </h2>
						<h3>Attack: {pokemon.base.Attack}</h3>
						<h3>Defense: {pokemon.base.Defense}</h3>
					</div>
					
				</div>
			)}
		</div>
	)
}

export default Pokemon
