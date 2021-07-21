import { useEffect, useState, useRef } from "react";



function TransactionsList() {
    const [transactions, setTransactions] = useState([]);
    const inputSearch = useRef(null);

    const getTransactions = async () => {
        const res = await fetch('http://localhost:3001/admin/transactions');
        const data = await res.json();
        setTransactions(data);
    }

    useEffect( () => {
        getTransactions()
    }, [] );
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = inputSearch.current.value;
        const res = await fetch('http://localhost:3001/admin/transactions/some', {
            method: "POST",
            body: JSON.stringify(data),
        });
        setTransactions(res);
    }


    const transactionsList = transactions.map((transaction) => {
        return <tr key={transaction.username}>
            <td>
                <ul>
                    <li>{transaction.lastname} {transaction.firstname}</li>
                    <li>{transaction.email}</li>
                </ul>
            </td>
            <td> {transaction.facturation} </td>
            <td> {transaction.livraison} </td>
            <td> {transaction.panier} </td>
            <td> {transaction.montant_commande} {transaction.currency}</td>
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
        </>
    );
}

export default TransactionsList;
