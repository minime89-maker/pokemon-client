import './App.css';
import Pokemons from './components/Pokemons'
import Pokemon from './components/Pokemon'
import Info from './components/Info'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
   <Router>
     <Switch>
       <Route path="/pokemon/:id/:info">
          <Info />
       </Route>
       <Route path="/pokemon/:id">
          <Pokemon />
       </Route>
       <Route path="/">
          <Pokemons />
       </Route>
     </Switch>
   </Router>
  );
}

export default App;
