import PhoneList from "./PhoneList"

export default function PhoneBox({data, updateUser, removeUser, isLoading, containerRef,handleRefresh}) {
    return (
        <div className="container mt-3">
            <main className="mt-3">
                <PhoneList
                    users={data}
                    update={updateUser}
                    remove={removeUser}
                    containerRef={containerRef}
                    handleRefresh={handleRefresh}
                    isLoading={isLoading}/>
            </main>
        </div>
    )
}