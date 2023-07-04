import PhoneList from "./PhoneList"

export default function PhoneBox({data, updateUser, removeUser, onScroll, listInnerRef}) {
    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    users={data}
                    update={updateUser}
                    remove={removeUser}
                    onScroll={onScroll}
                    listInnerRef={listInnerRef} />
            </main>
        </div>
    )
}