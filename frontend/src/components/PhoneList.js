import PhoneItem from "./PhoneItem"
export default function PhoneList({ users }) {
    return (
        <ul>
            {
                users.map((user) => (
                    <PhoneItem key={user.id} user={user} />
                ))
            }
        </ul>
    )
}