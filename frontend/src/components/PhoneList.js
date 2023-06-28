import PhoneItem from "./PhoneItem"
export default function PhoneList({ users, remove }) {
    return (
        <ul>
            {
                users.map((user) => (
                    <PhoneItem 
                        key={user.id} 
                        user={user}
                        remove={() => remove(user.id)}/>
                ))
            }
        </ul>
    )
}