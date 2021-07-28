import { useEffect, useState } from "react";

function TransactionItem({ transactionItem }) {

    const [transaction, setTransaction] = useState(transactionItem)


    const handleChange = async (transaction) => {
        const res = await fetch('http://localhost:3001/users/activate/' + transaction.id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        const data = await res.json()
        setTransaction(data)

    }

    return <div>
        <li> {transaction.id}
           
        </li>
    </div>
}

export default TransactionItem;
