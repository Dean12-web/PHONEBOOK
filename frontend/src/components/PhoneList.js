import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove, update }) {
    return (
        <ul>
            {
                users.map((user) => (
                    <PhoneItem 
                        key={user.id} 
                        user={user}
                        update = {update}
                        remove={() => remove(user.id)}/>
                ))
            }
        </ul>
    )
}