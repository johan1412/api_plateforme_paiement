import { useEffect, useState, useRef } from "react";
import AdminDataService from "../../services/AdminService";
import MerchandDataService from "../../services/MerchandService";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));


function TransactionsList() {
  const [transactions, setTransactions] = useState([]);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const inputSearch = useRef(null);

  const getTransactions = async () => {
    ////////////////////////////
    // IF (role == ADMIN)
    AdminDataService.getAll()
      // ELSE
      // MerchandDataService.getAll()
      ////////////////////////////
      .then(response => {
        setTransactions(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  useEffect(() => {
    getTransactions()
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = inputSearch.current.value;
    const res = await fetch('http://localhost:3001/admin/transactions/some', {
      method: "POST",
      body: JSON.stringify(data),
    });
    setTransactions(res);
  }

  const setActiveTransaction = (Transaction, index) => {
    setCurrentTransaction(Transaction);
    setCurrentIndex(index);
  };

  const classes = useStyles();


  const transactionsList = transactions.map((transaction) => {
    return <tr key={transaction.consumer.email}>
      <td>
        <ul>
          <li>{transaction.consumer.lastname} {transaction.consumer.firstname}</li>
          <li>{transaction.consumer.email}</li>
        </ul>
      </td>
      <td> {transaction.facturation} </td>
      <td> {transaction.livraison} </td>
      <td> {transaction.cart} </td>
      <td> {transaction.totalPrice} {transaction.currency}</td>
    </tr>
  })

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input ref={inputSearch} type="text" placeholder="chercher une transaction" />
        <input type="submit" value="Chercher" />
      </form>
      <table>
        <thead>
          <tr>
            <th>Client</th>
            <th>Facturation</th>
            <th>livraison</th>
            <th>Panier</th>
            <th>Montant</th>
          </tr>
        </thead>
        <tbody>
          {transactionsList}
        </tbody>
      </table>
    </>

    /*
     <div className="list row">
        <div className="col-md-6">
            <h4>Transactions List</h4>

            <ul className="list-group">
            {Transactions &&
                Transactions.map((Transaction, index) => (
                <li
                    className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                    }
                    onClick={() => setActiveTransaction(Transaction, index)}
                    key={index}
                >
                    {Transaction.name}
                </li>
                ))}
            </ul>
        </div>
        <div className="col-md-6">
            {currentTransaction ? (
            <div>
                <h4>Transaction</h4>
                <div>
                <label>
                    <strong>First Name:</strong>
                </label>{" "}
                {currentTransaction.customer.firstName}
                </div>
                <div>
                <label>
                    <strong>Last Name:</strong>
                </label>{" "}
                {currentTransaction.customer.lastName}
                </div>
                <div>
                <label>
                    <strong>Total Price:</strong>
                </label>{" "}
                {currentTransaction.totalPrice}
                {currentTransaction.currency}
                
                </div>
                <div>
                <label>
                    <strong>Address:</strong>
                </label>{" "}
                {currentTransaction.billingAddress.address}
                </div>
                <div>
                <label>
                    <strong>zipCode:</strong>
                </label>{" "}
                {currentTransaction.billingAddress.zipCode}
                </div>
                <div>
                <label>
                    <strong>City:</strong>
                </label>{" "}
                {currentTransaction.billingAddress.city}
                </div>
                <div>
                <label>
                    <strong>Country:</strong>
                </label>{" "}
                {currentTransaction.billingAddress.country}
                </div>
                <Link
                to={"/Transactions/" + currentTransaction._id}
                className="badge badge-warning"
                >
                <Button size="small" className={classes.margin}>
                Edit
                </Button>
                </Link>
            </div>
            ) : (
            <div>
                <br />
                <p>Please click on a Transaction...</p>
            </div>
            )}
        </div>
    </div>
     */
  );
}

export default TransactionsList;
