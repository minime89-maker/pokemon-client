import React, { useState, useEffect } from 'react'
import PokemonCard from './PokemonCard'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { Grid, makeStyles, Button } from '@material-ui/core'
import Navbar from './Navbar'
import { motion } from 'framer-motion'
import Error from './Error'
import Loading from './Loading'



const useStyles = makeStyles({
	container: {
		minWidth: '100vw',
		minHeight: '100vh',
		background: 'repeating-linear-gradient(100deg, #fff, #fff 49.9%, #FFCC01 50.1%, #FFCC01 100%)',
	},
	root: {
		paddingTop: '30px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	btnGroup: {
		paddingTop: '60px',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		'& > *': {
			margin: '0px 10%'
		}
	},
	wrapper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: '400px',
		margin: '0 auto'
	},

})

const Battle = () => {
	const classes = useStyles()
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)
	const [randomPlayer, setRandomPlayer] = useState(Math.floor(Math.random() * 810))
	const [randomComputer, setRandomComputer] = useState(Math.floor(Math.random() * 810))
	const [playerData, setPLayerData] = useState(null)
	const [computerData, setComputerData] = useState(null)
	const history = useHistory()
	const [newHP, setNewHP] = useState(0)





	useEffect(() => {
		setError(false)
		setLoading(true)
		axios.get(`https://pokemon-express-api.herokuapp.com/pokemon/${randomPlayer}`)

			.then((res) => {
				console.log(res.data)
				setRandomPlayer(res.data.id)
				setPLayerData(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})

	}, [randomPlayer])

	useEffect(() => {
		setError(false)
		setLoading(true)
		axios.get(`https://pokemon-express-api.herokuapp.com/pokemon/${randomComputer}`)
			.then((res) => {
				console.log(res.data)
				setRandomComputer(res.data.id)
				setComputerData(res.data)
				setLoading(false)
			})
			.catch((err) => {
				console.log(err)
				setError(true)
				setLoading(false)
			})
	}, [randomComputer])

	// setInterval(() => {
	// 	let hp = playerData.base.HP
	// 	setAttack(attack + 10)
	// 	setNewHP(hp - attack)	
	// 	console.log(`Attack: ${attack} : HP${newHP}`)
	// 	if(hp === 0 || hp < 0){
	// 		return setNewHP(<h2>{computerData.name.english} is Looser</h2>)
	// 	}
	// }, 300

	const saveFight = async () => {
		try {
			await axios.post('https://pokemon-express-api.herokuapp.com/fights/save', {
				ContentType: 'application/json',
				winner_id: playerData.id,
				looser_id: computerData.id,
				winner_name: playerData.name.english,
				looser_name: computerData.name.english
			})
		} catch (err) {
			console.log(`Saving Fight ${err}`)
		}
	}

	const handleFight = () => {
		const fight = {
			winner_id: playerData.id,
			looser_id: computerData.id,
			winner_name: computerData.name.english,
			looser_name: computerData.name.english
		}
		if (playerData.base.HP > computerData.base.HP) {
			saveFight(fight)

			setTimeout(() => {
				setNewHP(
					<motion.div
						transition={{ duration: 1 }}
						inital={{ scale: 0.2 }}
						animate={{ scale: 1.5, rotate: 360 }}
					>
						<img src="/winner.png" alt='winner' width="200" /> <br />
						<img src={`https://pokeres.bastionbot.org/images/pokemon/${playerData.id}.png`} alt="ball" width="160"

						/>
					</motion.div>)
			}, 1000)

		} else {
			saveFight(fight)
			setTimeout(() => {
				setNewHP(
					<motion.div
						transition={{ duration: 1 }}
						inital={{ scale: 0.2 }}
						animate={{ scale: 1.5, rotate: 360 }}
					>
						<img src="/winner.png" alt='winner' width="200" /> <br />
						<motion.img src={`https://pokeres.bastionbot.org/images/pokemon/${computerData.id}.png`} alt="ball" width="200"
						/>
					</motion.div>)
			}, 1000)
		}
	}


	return (
		<div className={classes.container}>
			<Navbar />
			{loading && <Loading />}
			{error && <Error />}
			<div className={classes.root}>
				{playerData && (
					<Grid item key={playerData.id} >
						<PokemonCard
							index={playerData.id}
							english={playerData.name.english}
							image={`https://pokeres.bastionbot.org/images/pokemon/${playerData.id}.png`}
							japanese={playerData.name.japanese}
							typeOne={playerData.type[0]}
							typeTwo={playerData.type[1]}
							attack={playerData.base.Attack}
							defense={playerData.base.Defense}
							spAttack={playerData.base['Sp. Attack']}
							spDefense={playerData.base['Sp. Defense']}
							HP={playerData.base.HP}
							speed={playerData.base.Speed}
						/>
					</Grid>
				)}

				{!newHP ?
					(<div>
						<img src="/vs.png" alt="Versus" width='200' />
					</div>) : newHP
				}

				{computerData && (
					<Grid item key={computerData.id}>
						<PokemonCard
							index={computerData.id}
							english={computerData.name.english}
							image={`https://pokeres.bastionbot.org/images/pokemon/${computerData.id}.png`}
							japanese={computerData.name.japanese}
							typeOne={computerData.type[0]}
							typeTwo={computerData.type[1]}
							attack={computerData.base.Attack}
							defense={computerData.base.Defense}
							spAttack={computerData.base['Sp. Attack']}
							spDefense={computerData.base['Sp. Defense']}
							HP={computerData.base.HP}
							speed={computerData.base.Speed}
						/>
					</Grid>
				)}
			</div>

			<div className={classes.btnGroup}>
				<Button variant="contained" color="primary" onClick={() => history.push('/pokemon')}>&#8592; HOME</Button>
				<Button variant="contained" color="secondary" onClick={handleFight}>FIGHT</Button>
				<Button variant="contained" color="secondary" onClick={() => window.location.reload()}>NewGame</Button>
				<Button variant="contained" color="primary" onClick={() => history.push('/pokemon/fights')}>&#8594; Board</Button>
			</div>
		</div>
	)
}

export default Battle

