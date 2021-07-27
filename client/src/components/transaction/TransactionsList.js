import { useEffect, useState, useRef } from "react";
import TransactionDataService from "../../services/TransactionService";
import MerchandDataService from "../../services/MerchandService";


function TransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const inputSearch = useRef(null);

    const getTransactions = async () => {
        TransactionDataService.getAll()
        .then(response => {
            setTransactions(Object.values(response.data));
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    }

    useEffect( () => {
        getTransactions()
    }, [] );
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = inputSearch.current.value;
        const res = await fetch('http://localhost:3001/transactions', {
            method: "POST",
            body: JSON.stringify(data),
        });
        setTransactions(res);
    }


    const transactionsList = transactions.map((transaction) => {
        return <tr key={transaction.user.username}>
            <td>
                <ul>
                    <li>{transaction.user.username} {transaction.user.username}</li>
                    <li>{transaction.user.username}</li>
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
                <input ref={inputSearch} type="text" placeholder="chercher une transaction"/>
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
                    { transactionsList }
                </tbody>
            </table>

        
         <div className="list row">
            <div className="col-md-6">
                <h4>Transactions List</h4>

                <ul className="list-group">
                {transactionsList &&
                    transactionsList.map((Transaction, index) => (
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
                    {currentTransaction.user.username}
                    </div>
                    <div>
                    <label>
                        <strong>Last Name:</strong>
                    </label>{" "}
                    {currentTransaction.user.username}
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
        </>

    );
}

export default TransactionsList;
