import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MerchantsList from './MerchantsList';

function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/marchands">Liste Marchands</Link>
          </li>
        </ul>
        
        <Switch>

          <Route path="/marchands">
            <MerchantsList />
          </Route>

          <Route path="/">
            <h1>Accueil</h1>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
