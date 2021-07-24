import { useEffect, useState } from "react";
import MarchantItem from "./MarchantItem";

function MarchantsList() {
    const [marchants, setMarchants] = useState([])

    const getMarchants = async () => {
        const res = await fetch('http://localhost:3001/users/all')
        const data = await res.json()
        setMarchants(data)
        console.log(data)
    }

    useEffect(() => {
        getMarchants()
    }, [])






    return (
        <ul>

            {marchants.map((marchant) => {
                return <MarchantItem key={marchant.username} marchantItem={marchant} />
            })}

        </ul>
    );
}

export default MarchantsList;
