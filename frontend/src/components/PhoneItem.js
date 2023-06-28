export default function PhoneItem({ user }) {
    return (
        <li className="card bg-secondary mb-1">
            <div className="image">
                <img src={user.avatar ? `http://localhost:3001/images/${user.avatar}` : '/profile.png'}
                    className="img-fluid" alt="" />
            </div>
            <div className="info">
                <span>{user.name}</span><br />
                <span>{user.phone}</span><br />
            </div>
        </li>
    )
}