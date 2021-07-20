import { useEffect, useState } from "react";


function MerchantsList() {
    const [merchants, setMerchants] = useState([])

    const getMerchants = async () => {
        const res = await fetch('http://localhost:3001/users/all')
        const data = await res.json()
        setMerchants(data)
    }

    useEffect( () => {
        getMerchants()
    }, [] )


    const merchantsDom = merchants.map((merchant) => {
        return <li key={merchant.username}> { merchant.username } </li>
    } )

    return (
        <ul>
            { merchantsDom }
        </ul>
    );
}

export default MerchantsList;
