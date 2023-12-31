
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AddTransaction from "./components/transaction/AddTransaction";
import TransactionsList from "./components/transaction/TransactionsList";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import MerchantsList from "./components/Admin/MerchantsList";
import MerchantAbout from "./components/Merchand/MerchandAbout";


function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/Transaction" className="navbar-brand mr-5 px-3">
          Amazon
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/Transactions"} className="nav-link">
              Transactions
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/"} className="nav-link">
              New Transaction
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/marchants"} className="nav-link">
              Merchants
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/marchants-about"} className="nav-link">
              Espace Merchant
            </Link>
          </li>
        </div>
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/Login"} className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/Register"} className="nav-link">
              Register
            </Link>
          </li>
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
            <Route exact path="/Transactions" component={TransactionsList} />
            <Route exact path={["/", "/Transaction"]} component={AddTransaction} />
            <Route path="/Transaction/:id" component={AddTransaction} />
            <Route path="/Login" component={Login} />
            <Route path="/Register" component={Register} />
            <Route path="/marchants" component={MerchantsList} />
            <Route path="/marchants-about" component={MerchantAbout} />
        </Switch>
      </div>
    </div>
  );
}

export default App;
