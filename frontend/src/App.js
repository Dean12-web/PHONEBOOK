import './App.css';
import { BrowserRouter as Router, Outlet, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from "axios"
import PhoneBox from './components/PhoneBox';
import PhoneForm from './components/PhoneForm';


function Layout() {
    const navigate = useNavigate()
    return (
        <div className='container'>
            <header>
                <div className="flex-container">
                    <div className="flex-item">
                        <button className="btn btn-brown float-end me-3">
                            <span className="fa-solid fa-arrow-up-z-a text-black"></span>
                        </button>
                    </div>
                    <div className="flex-item input-wrapper">
                        <div className="input-icons mt-1">
                            <i className="fa fa-magnifying-glass icon"></i>
                            <input type="text" className="form-control input-field" />
                        </div>
                    </div>
                    <div className="flex-item">
                        <button className="btn btn-brown ms-3" onClick={() => navigate('add')}>
                            <span className="fa-solid fa-user-plus text-black"></span>
                        </button>
                    </div>
                </div>
            </header>
            <Outlet />
        </div>
    )
}

function NotFound() {
    return (
        <h1>Page Not Found</h1>
    )
}

function App() {
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
        setData([{ id, name, phone, sent: true }, ...data])
        axios.post(`http://localhost:3001/api/phonebooks`, { name, phone }).then((response) => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
                    item.id = response.data.data.users.id
                }
                return item
            }))
        }).catch(() => {
            setData(currentData => currentData.map(item => {
                if (item.id === id) {
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
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<PhoneBox
                        data={data}
                        updateUser={updateUser}
                        removeUser={removeUser} />} />
                    <Route path="add" element={<PhoneForm  add={addUser} /> } />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;