import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function PhoneForm({add}) {
    const navigate = useNavigate()
    const [user, setUser] = useState({name:'', phone:''})
    const submit = (event) =>{
        event.preventDefault()

        if(user.name.trim() === "" || user.phone.trim() === ""){
            alert("Fill the data")
            return
        }
        add(user.name, user.phone)
        setUser({name: '', phone:''})
        navigate('/')
    }
    return (
        <form className="form-parent" onSubmit={submit}>
            <div className="form-child">
                <div className="form-item">
                    <input type="text" className="form-control form-item-input"
                        placeholder="Name..."
                        id="name" name="name" 
                        value={user.name} 
                        onChange={
                            event => setUser({...user, name: event.target.value})} />
                </div>
            </div>
            <div className="form-child">
                <div className="form-item">
                    <input type="text" className="form-control form-item-input"
                        placeholder="Phone..."
                        id="phone" name="phone"
                        value={user.phone}
                        onChange={
                            event => setUser({...user, phone: event.target.value})}/>
                </div>
            </div>
            <div className='form-child'>
                <div className="form-item">
                    <button className="btn btn-brown form-btn-1" type="submit">Save</button>
                </div>
                <div className="form-item">
                    <button className="btn btn-brown form-btn-2" type="button" onClick={() => navigate('/')}>Cancel</button>
                </div>
            </div>
        </form>
    )
}