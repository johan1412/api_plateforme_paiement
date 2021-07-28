import { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";

function TransactionsList() {
    const [transactions, setTransactions] = useState([])

    const getTransactions = async () => {
        const res = await fetch('http://localhost:3001/transactions')
        const data = await res.json()
        setTransactions(data)
    }

    useEffect(() => {
        getTransactions()
    }, [])

   return (<>
        <h1>Transactions :</h1>
        <ul>

            {transactions.map((transaction) => {
                return <TransactionItem key={transaction.id} transactionItem={transaction} />
            })}

        </ul>
        </>
    );
}

export default TransactionsList;
