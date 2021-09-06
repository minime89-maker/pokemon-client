import React from 'react'
import { makeStyles, Grid, Typography, Button } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import Navbar from './Navbar'
import '../index.css'

const useStyles = makeStyles({
	root:{
		minWidth: '100vw',
		minHeight: '100vh',
		background: 'repeating-linear-gradient(100deg, #fff, #fff 49.9%, #FFCC01 50.1%, #FFCC01 100%)',
	},
	leftWrapper: {
		display: 'flex:',
		alignItems: 'flex-start',
		justifyContent: 'center',
		padding: '20px',
		flexDirection: 'column',
	},
	navBar: {
		display: 'flex',
		aligntems: 'center',
		justifyContent: 'space-between'
	},
	toolbar: {
		display: 'flex',
	},
	container: {
		alignItems: 'center',
		justifyContent: 'space-around',
		marginTop: '60px'
	},
	title: {
		paddingBottom: 10,
		minWidth: '100%',
		margin: 'auto',
		fontWeight: '500'
	},
	subtitle: {
		paddingBottom: 60,
		// minWidth: '80%',
		// maxWidth: '90%',
		wordWrap: true,
		minWidth: '400px',
		maxWidth: '600px'
	}
})

const Landing = () => {
	const history = useHistory()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Navbar />
			<Grid container className={classes.container} >
				<Grid item xs={12} sm={6} className={classes.leftWrapper}>
					<Typography variant="h1" className={classes.title}>Gotta Catch 'Em All!</Typography>
					<Typography variant='h6' className={classes.subtitle}>Pokémon are creatures of all shapes and sizes who live in the wild or alongside humans. For the most part, Pokémon do not speak except to utter their names.</Typography>
					<Button color="primary" variant='contained' size="large" onClick={() => history.push(`/pokemon`)}>CATCH</Button>
				</Grid>
				<div className={classes.rightWrapper}>
					<img src="pikachu.png" alt="Pikachu"  width='100%'/>

				</div>
			</Grid>
		</div>
	)
}

export default Landing
