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

    const transaction = {id: '12', customer: 'customer name' , state: 'state' , totalPrice: '1459'}

   return (<div className="list-transactions">
        <h1 className="text-center">Transactions</h1>
        <ul>
            <TransactionItem transactionItem={transaction} />
        </ul>
        <ul>
            {transactions.map((transaction) => {
                return <TransactionItem key={transaction.id} transactionItem={transaction} />
            })}

        </ul>
        </div>
    );
}

export default TransactionsList;
