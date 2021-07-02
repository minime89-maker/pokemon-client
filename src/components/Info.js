import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'

const Info = () => {

	const [pokeInfo, setPokeInfo] = useState('')
	const { id ,info } = useParams()
	const history = useHistory()

	useEffect(() => {
		axios.get(`http://localhost:3000/pokemon/${id}/${info}`)
			.then((res) => {
				console.log(res.data)
				setPokeInfo(res.data)
			})
			.catch((err) => {
				console.log(err)
			})

	}, [id, info])

	return (
		<div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
		<button onClick={() => history.goBack()} style={{margin: '20px auto'}}>Go Back</button>
			{pokeInfo && (
				<div>
					<h2>Base: </h2>
					<h3>Attack: {pokeInfo.HP}</h3>
					<h3>Defense: {pokeInfo.Attack}</h3>
					<h3>Defense: {pokeInfo.Defense}</h3>
					<h3>Defense: {pokeInfo.Speed}</h3>
				</div>
			)}
		</div>
	)
}

export default Info
