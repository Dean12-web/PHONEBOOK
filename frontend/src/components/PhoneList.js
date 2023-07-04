import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove, update, isLoading, containerRef,handleRefresh, }) {
    return (
        <div ref={containerRef} style={{ height:'250px', overflow:'auto' }}>
            <ul>
                {
                    users.map((user) => (
                        <PhoneItem
                            key={user.id}
                            user={user}
                            update={update}
                            remove={() => remove(user.id)} />
                    ))
                }
                {isLoading && <p>Loading...</p>}
                {/* <button className="btn btn-brown" onClick={handleRefresh}>refresh</button> */}
            </ul>
        </div>
    )
}