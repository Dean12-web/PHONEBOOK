export default function PhoneItem({ user, remove }) {
    return (
        <li className="card bg-secondary mb-1">
            <div className="image">
                <img src={user.avatar ? `http://localhost:3001/images/${user.avatar}` : '/profile.png'}
                    className="img-fluid" alt="" />
            </div>
            <div className="info">
                <span>{user.name}</span><br />
                <span>{user.phone}</span><br />
                <button class="btn btn-xs"><i class="fa-solid fa-pen-to-square fa-xs"></i></button>
                <button class="btn btn-xs" type="button" onClick={remove}><i class="fa-solid fa-trash fa-xs"></i></button>
        </div>
        </li >
    )
}