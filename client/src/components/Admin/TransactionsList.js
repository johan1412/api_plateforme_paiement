import { useEffect, useState } from "react";



function TransactionsList() {
    const [transactions, setTransactions] = useState([]);

    const getTransactions = async () => {
        const res = await fetch('http://localhost:3001/admin/transactions')
        const data = await res.json()
        setTansactions(data)
    }

    useEffect( () => {
        getTransactions()
    }, [] )


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
            <td> {transaction.montant_commande} </td>
        </tr>
    })

    return (
        <table>
            <thead>
                <th>Client</th>
                <th>Facturation</th>
                <th>livraison</th>
                <th>Panier</th>
                <th>Montant</th>
            </thead>
            <tbody>
                { transactionsList }
            </tbody>
        </table>
    );
}

export default TransactionsList;
