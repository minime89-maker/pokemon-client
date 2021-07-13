import React, { useState } from 'react'
import { makeStyles, Card, Typography, LinearProgress, CardContent, Box, Button, Collapse } from '@material-ui/core'
import { motion } from 'framer-motion'


const useStyles = makeStyles({
	water: {
		backgroundColor: '#23689B',
	},
	fire: {
		backgroundColor: '#DA0037'
	},
	grass: {
		backgroundColor: '#5E9C70'
	},
	electric: {
		backgroundColor: '#E7C34E'
	},
	fairy: {
		backgroundColor: '#B1A9A0',
	},
	dark:{
		backgroundColor: '#151819'
	},
	steel:{
		backgroundColor: '#BFC7D0'
	},
	ghost:{
		backgroundColor: '#BDBDBD'
	},
	ice:{
		backgroundColor: '#CB8A4B'
	},
	poison:{
		backgroundColor: '#41182B'
	},
	fighting:{
		backgroundColor: '#AE5595'
	},
	flying:{
		backgroundColor: '#60BCFF'
	},
	dragon:{
		backgroundColor: '#62202D'
	},
	bug:{
		backgroundColor: '#9DD36B'
	},
	ground:{
		backgroundColor: '#52322D'
	},
	normal:{
		backgroundColor: '#C2BEDD'
	},
	data: {
		color: '#fff',
		textAlign: 'center',
		paddingTop: '120px',
		fontSize: '20px'
	},
	header: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'space-between',
		padding: '20px'
	},
	name: {
		fontSize: '28px',
		color: '#fff',
		fontWeight: 700,
		letterSpacing: 1.2
	},
	japanese: {
		fontSize: '58px',
		textAlign: 'center',
		color: '#fff',
		fontWeight: 900,
		paddingTop: '40px',
		position: 'absolute',
	},
	stats: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'space-between',
		color: '#fff',
		paddingTop: 30
	},
	linearProgress: {
		padding: '6px 0px',
		margin: '6px auto',
		borderRadius: '10px',
		backgroundColor: '#fff',
	},
	imageContainer: {
		position: 'relative',
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'center',
		paddingBottom: 80
	},
	image: {
		width: '200px',
		position: 'absolute',
		zIndex: 1
	},
	buttonGroup:{
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		margin: '0 14px 18px 14px'
	}
})

const PokemonCard = ({ english, japanese, image, typeOne, index, attack, defense, spAttack, spDefense, HP, speed, typeTwo }) => {
	const classes = useStyles()
	const [expanded, setExpanded] = useState(false)

	const handleExpandClick = () => {
		setExpanded(!expanded);
	}


	return (
		<>
		<Card elevation={10}
			className={
				typeOne === 'Fire' ? `${classes.fire}` 
				:
				typeOne === 'Electric' ? `${classes.electric}` 
				:
				typeOne === 'Grass' ? `${classes.grass}` 
				:
				typeOne === 'Water' ? `${classes.water}` 
				: 
				typeOne === 'Fairy' ? `${classes.fairy}`
				:
				typeOne === 'Dark' ? `${classes.dark}`
				:
				typeOne === 'Steel' ? `${classes.steel}`
				:
				typeOne === 'Ghost' ? `${classes.ghost}`
				:
				typeOne === 'Ice' ? `${classes.ice} `
				:
				typeOne === 'Poison' ? `${classes.poison} `
				:
				typeOne === 'Fighting' ? `${classes.fighting}`
				:
				typeOne === 'Flying' ? `${classes.flying}`
				:
				typeOne === 'Dragon' ? `${classes.dragon} `
				:
				typeOne === 'Bug' ? `${classes.bug}`
				:
				typeOne === 'Ground' ? `${classes.ground}`
				: `${classes.normal}`	
				}

			
			
		>
			<CardContent className={classes.header}>
				<Typography className={classes.name}>#{index} </Typography>
				<Typography className={classes.name}>&nbsp;{english}</Typography>
			</CardContent>
			<div className={classes.imageContainer}>
				<motion.img
					src={image}
					className={classes.image}
					inital={{ scale: 0 }}
					whileHover={{
						scale: 1.2,
					}}
				/>
				<Typography className={classes.japanese}>{japanese}</Typography>
			</div>
			<CardContent>
				<Typography className={classes.data}><strong>Type: </strong> {typeOne} {typeTwo}</Typography>
			</CardContent>
			<div className={classes.buttonGroup}>
				<Button onClick={handleExpandClick} aria-expanded={expanded} variant='contained' color='primary' >More</Button>
			</div>
			
			<Collapse in={expanded} timeout='auto' unmountOnExit>
			<CardContent className={classes.stats}>
				<Box style={{ width: '100%' }}>
					<Typography>Attack: <strong>{attack}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(attack)} color='secondary' />
					<Typography>Sp. Attack: <strong>{spAttack}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(spAttack)} color='secondary' />
					<Typography>Speed: <strong>{speed}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(speed)} color='secondary' />
					<Typography>Defense: <strong>{defense}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(defense)} color='primary' />
					<Typography>Sp. Defense: <strong>{spDefense}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(spDefense)} color='primary' /> 
					<Typography>HP: <strong>{HP}</strong></Typography>
					<LinearProgress className={classes.linearProgress} variant='determinate' value={Math.floor(HP)} color='primary' />
				</Box>
			</CardContent>
			</Collapse>		
		</Card>
		</>
	)
}

export default PokemonCard
