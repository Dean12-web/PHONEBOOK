export default function PhoneHeader() {
    return (
        <div className="flex-container">
        <div className="flex-item">
            <button className="btn btn-warning float-end me-3">
                <span className="fa-solid fa-arrow-up-z-a text-black"></span>
            </button>
        </div>
        <div className="flex-item input-wrapper">
            <input type="text" className="form-control" />
        </div>
        <div className="flex-item">
            <button className="btn btn-warning ms-3">
                <span className="fa-solid fa-user-plus text-black"></span>
            </button>
        </div>
    </div>
    )
}