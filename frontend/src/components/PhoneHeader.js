export default function PhoneHeader() {
    return (
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
    )
}