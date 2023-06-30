import './App.css';
import { BrowserRouter as Router,Outlet, Route, Routes } from "react-router-dom"
import { useEffect, useState } from 'react';
import axios from "axios"
import PhoneBox from './components/PhoneBox';

function Layout() {
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
            <button className="btn btn-brown ms-3">
              <span className="fa-solid fa-user-plus text-black"></span>
            </button>
          </div>
        </div>
      </header>
      <form className="form-parent">
            <div className="form-child">
                <div className="form-item">
                    <input type="text" className="form-control form-item-input" id="name" name="name" />
                </div>
            </div>
            <div className="form-child">
                <div className="form-item">
                    <input type="text" className="form-control form-item-input" id="phone" name="phone" />
                </div>
            </div>
            <div className='form-child'>
                <div className="form-item">
                    <button className="btn btn-brown form-btn-1" type="button">Save</button>
                </div>
                <div className="form-item">
                    <button className="btn btn-brown form-btn-2" type="button">Cancel</button>
                </div>
            </div>
      </form>
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

  useEffect(() => {
    axios.get(`http://localhost:3001/api/phonebooks`).then((response) => {
      if (response.data.success) {
        setData(response.data.data.users)
      }
    }).catch(() => {
      setData([])
    })
  }, [data])


  const updateUser = (id, name, phone) => {
    axios.put(`http://localhost:3001/api/phonebooks/${id}`, { name, phone }).then((response) => {
      setData(currentData => currentData.map(item => {
        if (item.id === id) {
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
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<PhoneBox 
            data={data}
            updateUser = {updateUser}
            removeUser = {removeUser} /> } />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
