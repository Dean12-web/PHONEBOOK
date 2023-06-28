export default function PhoneItem() {
    return (
        <li className="card bg-secondary">
            <div className="image">
                <img src="profile.png" className="img-fluid" alt="" />
            </div>
            <div className="info">
                <span>Name</span><br />
                <span>0823741311</span><br />
                <button className="btn btn-xs"><i className="fa-solid fa-pen-to-square fa-xs"></i></button>
                <button className="btn btn-xs"><i className="fa-solid fa-trash fa-xs"></i></button>
            </div>
        </li>
    )
}