import React from 'react'
import { Toolbar, makeStyles, Link } from '@material-ui/core'
import { Twitter, GitHub, LinkedIn } from '@material-ui/icons'

const useStyles = makeStyles({
	appBar: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'space-between',
		paddingTop: 20
	},
	toolbar: {
		display: 'flex',
		alingItems: 'center',
		justifyContent: 'space-between',
	},
	social: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		marginLeft: 26
	},
	icons: {
		fontSize: 32,
		color: '#3462AD',
		marginLeft: 30,
	},
	github: {
		fontSize: 26
	}
})


const Navbar = () => {
	const classes = useStyles()

	return (
		<div className={classes.root}>
			<Toolbar position="static" className={classes.appBar}>
			<Link href='/' >
				<img src="/pokemon.png" alt="Pokemon" width="200" />
			</Link>
				<div className={classes.toolbar} >

					<div className={classes.social}>
						<Link href='https://www.linkedin.com/in/milijan-popovic/'>
							<LinkedIn className={classes.icons} />
						</Link>
						<Link href='https://github.com/minime89-maker'>
							<GitHub className={`${classes.icons} ${classes.github}`} />
						</Link>
						<Link href='https://twitter.com/minja_ppp'>
							<Twitter className={classes.icons} />
						</Link>
					</div>
				</div>
			</Toolbar>
		</div>
	)
}

export default Navbar
