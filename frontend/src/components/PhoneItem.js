import { useState } from "react"
import axios from "axios"
export default function PhoneItem({ user, remove, update, updateAvatar }) {
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)
    const handleImageClick = () => {
        const fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = "image/*"
        fileInput.addEventListener("change", (event) => {
            const file = event.target.files[0]
            const formData = new FormData()
            formData.append("avatar", file)

            axios
                .put(`http://localhost:3001/api/phonebooks/${user.id}/avatar`, formData)
                .then((response) => {
                    updateAvatar(user.id, response.data.data.avatar)
                })
                .catch(() => {
                    
                })
                window.location.reload(); // Refresh the page
        })
        fileInput.click()
    }
    return (
        <li className="card bg-secondary mb-1">
            <div className="image">
                <img src={user.avatar ? `http://localhost:3001/images/${user.avatar}` : '/profile.png'}
                    className="img-fluid"
                    alt=""
                    onClick={handleImageClick} />
            </div>
            <div className="info">
                <span>{isEdit ? (
                    <input
                        type="text"
                        value={name}
                        onChange={event => setName(event.target.value)}
                    />
                ) : user.name
                }</span><br />
                <span>{isEdit ? (
                    <input
                        type="text"
                        value={phone}
                        onChange={event => setPhone(event.target.value)}
                    />
                ) : user.phone
                }</span><br />


                {isEdit ? (
                    <div className="action">
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() => { update(user.id, name, phone); setIsEdit(false) }} >
                            <i className="fa-solid fa-floppy-disk fa-sm" />
                        </button>
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() => {
                                setIsEdit(false);
                                setName(user.name);
                                setPhone(user.phone);
                            }}>
                            <i className="fa-solid fa-arrow-left fa-sm" />
                        </button>
                    </div>
                ) :
                    <div className="action">
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={() =>
                                setIsEdit(true)}>
                            <i className="fa-solid fa-pen-to-square fa-sm" />
                        </button>
                        <button
                            className="btn btn-xs"
                            type="button"
                            onClick={remove}>
                            <i className="fa-solid fa-trash fa-sm" />
                        </button>
                    </div>
                }
            </div>
        </li>
    )
}