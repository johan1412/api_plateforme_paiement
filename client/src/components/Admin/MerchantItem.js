import { useEffect, useState } from "react";

function MerchantItem({ merchantItem }) {

    const [merchant, setMerchant] = useState(merchantItem)


    const handleChange = async (merchant) => {
        const res = await fetch('http://localhost:3001/users/activate/' + merchant.username, {
            method: "PUT",
            body: JSON.stringify({
                activate: !merchant.isVerified
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
        <h1>Merchants :</h1>
    <li> {merchant.username}
        <input type="checkbox" onChange={(event) => {
            handleChange(merchant)
        }} checked={merchant.isVerified} />
    </li>
    </div>
}

export default MerchantItem;
