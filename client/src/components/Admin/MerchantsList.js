import { useEffect, useState } from "react";
import MerchantItem from "./MerchantItem";

function MerchantsList() {
    const [merchants, setMerchants] = useState([])

    const getMerchants = async () => {
        const res = await fetch('http://localhost:3001/users/all')
        const data = await res.json()
        setMerchants(data)
        console.log(data)
    }

    useEffect(() => {
        getMerchants()
    }, [])



   


    return (
        <ul>

            {merchants.map((merchant) => {
                return <MerchantItem  key={merchant.username} merchantItem={merchant} />
            })}

        </ul>
    );
}

export default MerchantsList;
