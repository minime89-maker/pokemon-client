import React from 'react'
import { Button, makeStyles, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
	root: {
		position: 'absolute',
		width: '100vw',
		height: '100vh',
	},
	container: {
		display: 'flex', 
		alignItems: 'center', 
		justifyContent: 'center',
		marginTop: '120px'
	},
	wrapper:{
		display: 'flex',
		alignItems: 'center', 
		justifyContent: 'center',
		flexDirection: 'column',
		padding: '60px 0',
		color: '#1b1b1b',
	},
	button: {
		backgroundColor: '#DE6E3E',
		color: '#f9f9f9',
		fontSize: '20px',
		fontWeight: '500',
		borderRadius: 10,
		padding: '10px 20px',
		marginTop: '60px',
		'&:hover':{
			backgroundColor: '#f9f9f9',
			color: '#DE6E3E'
		},
	},
	image:{
		width: 400
	},
	number: {
		fontSize: '340px',
		fontWeight: '900',
		color: '#805743'
	},
	textBig: {
		fontSize: '48px',
		fontWeight: '700',
		color: '#333'
	},
	textSmall: {
		fontSize: '32px',
		color: '#8b8b8b',
		letterSpacing: '1.2px'
	}
})

const Error = () => {
	const history = useHistory()
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<div className={classes.container}>
				<Typography variant='h1' className={classes.number}>4</Typography>
				<img className={classes.image} src='/not-found.png' alt='Not Found'/>
				<Typography variant='h1' className={classes.number}>4</Typography>
			</div>
			<div className={classes.wrapper}>
				<Typography variant='h4' className={classes.textBig}>Uh-oh!</Typography>
				<Typography variant='h5' className={classes.textSmall}>You expect me to fit in that?</Typography>
				<Button className={classes.button} onClick={() => history.push('/')} >&larr; Go Back Home</Button>
			</div>
		</div>
	)
}

export default Error
