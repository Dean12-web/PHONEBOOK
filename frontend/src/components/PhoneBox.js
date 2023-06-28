import PhoneHeader from "./PhoneHeader"
import PhoneList from "./PhoneList"
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function PhoneBox() {
    const [data, setData] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/api/phonebooks`).then((response) => {
            if (response.data.success) {
                setData(response.data.data.users)
            }
        })

    }, [])

    const removeUser = (id) => {
        axios.delete(`http://localhost:3001/api/phonebooks/${id}`).then((response) => {
            setData(data.filter(item => item.id !== id))
        }).catch(() => {
            alert('Hapus Gagal')
        })
    }

    return (
        <div className="container">
            <header>
                <PhoneHeader />
            </header>
            <main className="mt-3">
                <PhoneList
                    users={data}
                    remove={removeUser}/>
            </main>
        </div>
    )
}