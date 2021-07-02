import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { useParams, useHistory } from 'react-router-dom'
import Loading from './Loading'
import Error from './Error'
import { makeStyles, Button, Card, LinearProgress, Typography, Box, Grid } from '@material-ui/core'

const useStyles = makeStyles({
	
})

const Info = () => {

	const [pokeInfo, setPokeInfo] = useState('')
	const [loading, setLoading] = useState(null)
	const[error, setError] = useState()
	const { id ,info } = useParams()
	const history = useHistory()
	const classes = useStyles()


	useEffect(() => {
		setLoading(true)
		setError(false)
		axios.get(`http://localhost:3000/pokemon/${id}/${info}`)
			.then((res) => {
				console.log(res.data)
				setPokeInfo(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})

	}, [id, info])

	return (
		<Fragment>
			{loading && <Loading />}
			{error && <Error />}
			<Grid container style={{margin: '60px auto', display: 'flex', alignItems: 'center', justifyContent: 'center'}} >
				{pokeInfo && (
					<Card elevation={20} style={{padding: '20px 40px'}} >
						<Typography variant='h3' gutterBottom >Base: </Typography>
						<Box style={{width: '400px'}} >
							<LinearProgress color="primary" variant='determinate' value={pokeInfo.HP}>
							</LinearProgress>
							<Typography variant='h5' gutterBottom >HP: {pokeInfo.HP}</Typography>
							<LinearProgress color="primary" variant='determinate' value={pokeInfo.Defense}>
							</LinearProgress>
							<Typography variant='h5' gutterBottom >Defense: {pokeInfo.Defense}</Typography>

							<LinearProgress color="secondary" variant='determinate' value={pokeInfo.Attack}>
							</LinearProgress>
							<Typography variant='h5' gutterBottom >Attack: {pokeInfo.Attack}</Typography>

							<LinearProgress color="secondary" variant='determinate' value={pokeInfo.Speed}>
							</LinearProgress>
							<Typography variant='h5' gutterBottom >Speed: {pokeInfo.Speed}</Typography>
						</Box>
					</Card>
				)}
			</Grid>
			<Button style={{position: 'absolute', left: '45%'}} onClick={() => history.goBack()}>Go Back</Button>
		</Fragment>
	)
}

export default Info
