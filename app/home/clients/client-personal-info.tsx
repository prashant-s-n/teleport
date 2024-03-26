import moment from "moment"
import { FcQuestions, FcSignature } from "react-icons/fc"
import { FiCalendar, FiMail, FiMessageCircle, FiPhone } from "react-icons/fi"

export default function ClientPersonalInfo({
    userData
}: {
    userData: any
}) {
    return (
        <main className="h-100 w-full bg-white rounded-md">
            <div className="flex flex-col w-full p-4 gap-6">

                <div className="flex flex-col items-start p-2">
                    <span className="text-sm text-zinc-400"><FiMail className="inline mr-1"/>Email</span>
                    <span className="text-md text-zinc-600">{userData?.email}</span>
                </div>

                <div className="flex flex-col items-start p-2">
                    <span className="text-sm text-zinc-400"><FiPhone className="inline mr-1"/>Phone</span>
                    <span className="text-md text-zinc-600">{userData?.phone}</span>
                </div>

                <div className="flex flex-col items-start p-2">
                    <span className="text-sm text-zinc-400"><FiCalendar className="inline mr-1"/>Created on</span>
                    <span className="text-md text-zinc-600">{moment(userData?.created_at).format('DD MMM YYYY hh:mm A')}</span>
                </div>

                <div className="flex flex-col items-start p-2">
                    <span className="text-sm text-zinc-400"><FiMessageCircle className="inline mr-1"/>Gender</span>
                    <span className="text-md text-zinc-600">{userData?.gender}</span>
                </div>

            </div>
        </main>
    )
}