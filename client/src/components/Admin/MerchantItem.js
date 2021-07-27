import { useEffect, useState } from "react";

function MerchantItem({ marchantItem }) {

    const [marchant, setMerchant] = useState(marchantItem)


    const handleChange = async (marchant) => {
        const res = await fetch('http://localhost:3001/users/activate/' + marchant.id, {
            method: "PATCH",
            body: JSON.stringify({
                activate: !marchant.isVerified
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        const data = await res.json()
        setMerchant(data)

    }

    return <div>
        <li> {marchant.username}
            <input type="checkbox" onChange={(event) => {
                handleChange(marchant)
            }} checked={marchant.isVerified} />
        </li>
    </div>
}

export default MerchantItem;
