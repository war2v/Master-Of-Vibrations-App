import Link from "next/link";
import { LuConstruction } from "react-icons/lu";

const AccountPage = () => {
    return ( 
        <div className="flex justify-center items-center h-full">
            <div className="bg-neutral-900 p-20 md:p-10 rounded-lg">
                <h1 className="text-xl justify-center flex items-center gap-x-2"><LuConstruction/>Under Construction</h1>
                <p className="text-md text-neutral-500">Accounts Page Will be completed soon!</p>
                <p>Navigate back to <span className="text-purple-400"><Link href="/">here</Link></span> for more music.</p>
            </div> 
        </div>
     );
}
 
export default AccountPage;