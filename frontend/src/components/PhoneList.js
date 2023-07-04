import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove, update, onScroll, listInnerRef }) {
    return (
        <div onScroll={onScroll} ref={listInnerRef} style={{ height: "100vh", overflowY: "auto" }}>
        <ul style={{ padding:0, listStyle:'none' }}>
            {
                users.map((user) => (
                    <PhoneItem
                        key={user.id}
                        user={user}
                        update={update}
                        remove={() => remove(user.id)} />
                ))

            }
        </ul>
        </div>
    )
}