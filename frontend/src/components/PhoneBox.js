import PhoneHeader from "./PhoneHeader"
import PhoneList from "./PhoneList"
export default function PhoneBox() {
    return (
        <div className="container">
            <header>
                <PhoneHeader />
            </header>
            <main className="mt-3">
                <PhoneList />
            </main>
        </div>
    )
}