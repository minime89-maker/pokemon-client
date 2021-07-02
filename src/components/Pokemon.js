import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useParams } from 'react-router' 
import { useHistory } from 'react-router-dom'
import Loading from './Loading'
import Error from './Error'
import { makeStyles, Grid, Card, CardContent, Button, Typography, CardActions, CardHeader, FormControlLabel, Fade, Switch, Paper } from '@material-ui/core'

const useStyles = makeStyles({
	card: {
		minWidth: 380,
		maxWidth: 400,
		margin: '10% auto',
		padding: 30,
		textAlign: 'center',
	},
	buttons: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'center',
		marginTop: '40px'
	},
	types: {
		padding: '10px 0',
	},
	more: {
		marginTop: '30px',
		padding: 10
	}
})

const Pokemon = () => {

	const [pokemon, setPokemon] = useState()
	const [loading, setLoading] = useState(null)
	const[error, setError] = useState()
	const { id } = useParams()
	const history = useHistory()
	const classes = useStyles()
	const [checked, setChecked] = useState(false)
	const [data, setData] = useState(null)

	const handleChange = () => {
		setChecked((prev) => !prev)
	}

	useEffect(() => {
		setLoading(true)
		setError(false)
		axios.get(`http://localhost:3000/pokemon/${id}`)
			.then((res) => {
				console.log(res.data)
				setPokemon(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
	}, [id])

	useEffect(() => {
		setLoading(true)
		setError(false)
		 const fetchData= async () => {
		  const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((result) => {
				console.log(result)
				setData(result.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
		}
		fetchData();
	  }, [id]);

	  
	return (
		<Fragment>
		<Grid container>
			{loading && <Loading />}
			{error && <Error />}
				{pokemon && (
					<Card elevation={10} className={classes.card}>
					<div>
						{data && (
							<img src={data.sprites.front_default} />
						)}
					</div>
						<Typography variant="h3">{pokemon.name.english}</Typography>
						<FormControlLabel className={classes.buttons} control={
								<Switch checked={checked} 
								onChange={handleChange} />
							} 
								label='Type'
							/>
								{pokemon.type && pokemon.type.map((type, index) => (
									<Fade in={checked} key={index}>
										<Typography className={classes.types}>{type}
										</Typography>
									</Fade>
								))}
								<Button className={classes.more} color='primary' onClick={() => history.push(`/pokemon/${pokemon.id}/info`)}>
									Base
								</Button>						
					</Card>
				)}
		</Grid>

		<Button style={{position: 'absolute', left: '45%'}} onClick={() => history.goBack()}>Go Back</Button>
		</Fragment>
	)
}

export default Pokemon
