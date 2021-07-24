import { useEffect, useState } from "react";

function MarchantItem({ marchantItem }) {

    const [marchant, setMarchant] = useState(marchantItem)


    const handleChange = async (marchant) => {
        const res = await fetch('http://localhost:3001/users/activate/' + marchant.username, {
            method: "PUT",
            body: JSON.stringify({
                activate: !marchant.isVerified
            }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        })
        const data = await res.json()
        setMarchant(data)

    }

    return <div>
        <h1>Marchants :</h1>
        <li> {marchant.username}
            <input type="checkbox" onChange={(event) => {
                handleChange(marchant)
            }} checked={marchant.isVerified} />
        </li>
    </div>
}

export default MarchantItem;
