import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useHistory, useParams } from 'react-router-dom'
import Loading from './Loading'
import Error from './Error'
import { makeStyles, Grid, Card, CardContent, Button, Typography, CardActions, Avatar, CardHeader } from '@material-ui/core'

const useStyles = makeStyles({
	cards: {
		minWidth: 380,
		maxWidth: 400,
		margin: '20px auto',
		textAlign: 'left'
	},
	button: {
		color: '#222',
		margin: '0 auto',
		padding: '8px 16px'
	},
	names: {
		textAlign: 'center',
	}
})



const Pokemons = () => {

	const [pokemons, setPokemons] = useState(null)
	const [loading, setLoading] = useState(true)
	const[error, setError] = useState(false)
	const history = useHistory()
	const classes = useStyles()

	

	useEffect(() => {
		setLoading(true)
		setError(false)
		axios.get('http://localhost:3000/pokemon')
			.then((res) => {
				console.log(res.data[1].name)
				setPokemons(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
	}, [])

	return (
		<Grid container>
			{loading && <Loading />}
			{error && <Error />}
				{pokemons && pokemons.map((poke) => (
						<Card elevation={1} className={classes.cards} key={poke.id}>
						<CardHeader avatar={
							<Avatar>{poke.name.english[0]}</Avatar>
						}
						title={
							<Typography variant='h5'>{poke.name.english}</Typography>
						}
						>
						</CardHeader>
							<CardContent className={classes.names}>
								<Typography variant='body2' style={{paddingBottom: '10px'}}>{poke.name.japanese}</Typography>
								<Typography variant='body2' style={{paddingBottom: '10px'}}>{poke.name.french}</Typography>
								<Typography variant='body2'>{poke.name.chinese}</Typography>
							</CardContent>
								<CardActions>
									<Button className={classes.button} onClick={() => history.push(`/pokemon/${poke.id}`)}>
										Info
									</Button>
								</CardActions>
						</Card>
					)
				)})
				
		</Grid>
	)
}

export default Pokemons
