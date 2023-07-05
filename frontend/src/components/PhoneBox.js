import PhoneList from "./PhoneList"

export default function PhoneBox({data, updateUser, removeUser, isLoading, containerRef}) {
    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    users={data}
                    update={updateUser}
                    remove={removeUser}
                    containerRef={containerRef}
                    isLoading={isLoading}/>
            </main>
        </div>
    )
}