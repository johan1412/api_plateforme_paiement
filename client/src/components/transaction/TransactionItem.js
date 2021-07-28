import { useEffect, useState } from "react";

function TransactionItem({ transactionItem }) {

    const [transaction, setTransaction] = useState(transactionItem)

    return <div>
        <li> {transaction.id}
           
        </li>
    </div>
}

export default TransactionItem;
