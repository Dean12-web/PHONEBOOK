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

    }, [data])

    const updateUser = (id,name, phone) => {
        axios.put(`http://localhost:3001/api/phonebooks/${id}`, {name, phone}).then((response) => {
            setData(currentData => currentData.map(item => {
                if(item.id === id){
                    item.name = response.data.data.name
                    item.phone = response.data.data.phone
                }
                return item
            }))
        }).catch(() => {
            alert('Update Gagal')
        })
    }

    const removeUser = (id) => {
        axios.delete(`http://localhost:3001/api/phonebooks/${id}`).then((response) => {
            setData(data.filter(item => item.id !== id))
        }).catch(() => {
            alert('Hapus Gagal')
        })
    }

    return (
        <div className="container mt-3">
            <header>
                <PhoneHeader />
            </header>
            <main className="mt-3">
                <PhoneList
                    users={data}
                    update = {updateUser}
                    remove={removeUser}/>
            </main>
        </div>
    )
}