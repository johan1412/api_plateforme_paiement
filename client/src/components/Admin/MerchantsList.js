import { useEffect, useState } from "react";
import MerchantItem from "./MerchantItem";

function MerchantsList() {
    const [marchants, setMerchants] = useState([])

    const getMerchants = async () => {
        const res = await fetch('http://localhost:3001/users')
        const data = await res.json()
        setMerchants(data)
        console.log(data)
    }

    useEffect(() => {
        getMerchants()
    }, [])

   return (
        <ul>

            {marchants.map((marchant) => {
                return <MerchantItem key={marchant.username} marchantItem={marchant} />
            })}

        </ul>
    );
}

export default MerchantsList;
