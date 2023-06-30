import PhoneHeader from "./PhoneHeader"
import PhoneList from "./PhoneList"
import { useEffect, useState } from 'react'
import axios from 'axios'
import PhoneForm from "./PhoneForm"

export default function PhoneBox() {
    const [data, setData] = useState([])
    const [refreshFlag, setRefreshFlag] = useState(false); //Handling For Update Data, make the data refreshed manually when update

    useEffect(() => {
            axios.get(`http://localhost:3001/api/phonebooks`).then((response) => {
                if (response.data.success) {
                    setData(response.data.data.users)
                }
            }).catch(() => {
                setData([])
            })
    }, [refreshFlag])

    const addUser = (name, phone) => {
        const id = parseInt(Date.now())
        console.log(id)
        setData([{id, name, phone, sent:true}, ...data])
        axios.post(`http://localhost:3001/api/phonebooks`, {name, phone}).then((response)=>{
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.id = response.data.data.users.id                    
                }
                return item
            }))
        }).catch(() => {
            setData(currentData => currentData.map(item => {
                if(item.id === id){
                    item.sent = false
                }
                return item
            }))
        })
    }
    
    const updateUser = (id, name, phone) => {
        axios.put(`http://localhost:3001/api/phonebooks/${id}`, { name, phone }).then((response) => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.name = response.data.data.name
                    item.phone = response.data.data.phone
                }
                return item
            }))
            setRefreshFlag((prevFlag) => !prevFlag); // Toggle the refresh flag
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
                <PhoneForm  add={addUser} />
                <PhoneList
                    users={data}
                    update={updateUser}
                    remove={removeUser} />
            </main>
        </div>
    )
}