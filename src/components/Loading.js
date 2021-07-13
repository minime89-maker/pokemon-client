import React from 'react'
import { motion } from 'framer-motion'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
	container: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
	},
})

const Loading = () => {
	const classes = useStyles()

	return (
		<div>
			<div className={classes.container}>
				<motion.img src="/loading.png" alt='Loading status' 
				initial={{scale: 0.5}}
				transition={{repeat: Infinity, duration:0.2}}
				animate={{rotate: 360, type: 'tween', scale: 1, }}
				width="400px"
				/>
			</div>
		</div>
	)
}

export default Loading
