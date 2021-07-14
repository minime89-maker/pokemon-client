import './App.css';
import React, { useState, useEffect } from 'react'
import Pokemons from './components/Pokemons'
import Landing from './components/Landing'
import { Switch, Route} from 'react-router-dom';
import { Button, makeStyles } from '@material-ui/core'
import Battle from './components/Battle'
import Leaderboard from './components/Leaderboard'


const useStyles = makeStyles({
  scroll: {
    position: 'fixed',
    bottom: '40px',
    left: '40px',
    backgroundColor: '#FFCB05',
    fontSize: '24px',
    zIndex: 100
  }
})

const App = () => {
  const classes = useStyles()
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    document.title = "Pokemon Fight | WBS"
  }, [])


  const testScrollTop = () => {
    if (window.pageYOffset > 300) {
      setScroll(true)
    } else {
      setScroll(false)
    }
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  useEffect(() => {
    window.addEventListener('scroll', testScrollTop)
  }, [])


  return (
      <Switch>
        <Route path="/pokemon/fights">
          {scroll && <Button className={classes.scroll} onClick={scrollTop} variant='contained' color='primary'>&#8593;</Button>}
          <Leaderboard />
        </Route>
        <Route path="/pokemon/arena">
          <Battle />
        </Route>
        <Route path="/pokemon">
          {scroll && <Button className={classes.scroll} onClick={scrollTop} variant='contained' color='primary'>&#8593;</Button>}
          <Pokemons />
        </Route>
        <Route exact path="/">
          <Landing />
        </Route>
      </Switch>
  );
}

export default App;
