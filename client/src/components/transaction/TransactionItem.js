import { useEffect, useState } from "react";

function TransactionItem({ transactionItem }) {

    const [transaction, setTransaction] = useState(transactionItem)


    return <div>
        <li> n°{transaction.id} - {transaction.customer} | {transaction.state}
            <button className="btn btn-secondary ml-5" onClick={async () => {
                const res = await fetch('http://localhost:3001/operations', {
                    method: "POST",
                    body: JSON.stringify({
                        type: "refund",
                        transactionId: transaction.id
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                })
                const res2 = await fetch('http://localhost:3001/transactions/refund/'+transaction.id, {
                    method: "PATCH",
                   headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                })
            }}>
                Refund
            </button>
        </li>
    </div>
}

export default TransactionItem;
