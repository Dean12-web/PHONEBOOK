import { useState} from "react"
export default function PhoneItem({ user, remove, update }) {
    const [isEdit, setIsEdit] = useState(false)
    const [name, setName] = useState(user.name)
    const [phone, setPhone] = useState(user.phone)


    return (
        <li className="card bg-secondary mb-1">
            <div className="image">
                <img src={user.avatar ? `http://localhost:3001/images/${user.avatar}` : '/profile.png'}
                    className="img-fluid" alt="" />
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