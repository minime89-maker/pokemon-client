import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { makeStyles, TableContainer, Table, TableHead, TableRow, TableCell, Grid, TableBody, Button } from '@material-ui/core'
import Navbar from './Navbar'
import Error from './Error'
import Loading from './Loading'
import { useHistory } from 'react-router-dom'
import { DateTime } from 'luxon'

const useStyles = makeStyles({
	container: {
		paddingTop: 40
	},
	table: {
		minWidth: '100vw',
		margin: '0 auto'
	},
	head: {
		backgroundColor: '#365FAB',
		'& > *': {
			color: '#fff',
			fontSize: 16,
		}
	},
	homeBtn: {
		margin: '40px 0 0 40px'
	},
})

const Leaderboard = () => {
	const history = useHistory()
	const classes = useStyles()
	const [scores, setScores] = useState(null)
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		setError(false)
		setLoading(true)
		axios.get('https://pokemon-express-api.herokuapp.com/fights')
			.then((res) => {
				console.log(res.data)
				setScores(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
	}, [])



	return (
		<Grid>
			<Navbar />
			<Button className={classes.homeBtn} variant="contained" color="primary" onClick={() => history.push('/pokemon')}>&#8592; HOME</Button>
			{loading && <Loading />}
			{error && <Error />}
			<TableContainer className={classes.container}>
				<Table className={classes.table} aria-label="simple table">
					<TableHead >
						<TableRow className={classes.highscore}>
							<TableCell />
							<TableCell align="center">
								<img src='/highscore.png' width="300" alt='high score' />
							</TableCell>
							<TableCell />
						</TableRow>
					</TableHead>
					<TableHead>
						<TableRow className={classes.head}>
							<TableCell align='center'>Date</TableCell>
							<TableCell align='center'>Fights</TableCell>
							<TableCell align='center'>Winner</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{scores && scores.map((score) => {
							return (
								<TableRow key={score._id}>
									<TableCell align='center'>
									{`${DateTime.fromISO(score.date).toFormat('MMMM dd yyyy')}`}
									</TableCell>
									<TableCell align='center'>
										{`${score.looser.looser_name} vs. ${score.winner.winner_name}`}
									</TableCell>
									<TableCell align='center'>
										{score.winner.winner_name}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	)
}

export default Leaderboard
