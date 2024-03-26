'use client';

import Link from "next/link";
import CreateClient from "./page";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";
import UserMessagesPage from "./page";

export default function ViewMessagesDialog() {

    const [showDialog, setShowDialog] = useState<boolean>(false);

    return (
        <main>
            {/* Trigger */}
            <div className='flex flex-none items-center p-3' onClick={() => setShowDialog(true)}>
                <button className='btn bg-green-500 text-green-100 btn-md'>
                    <FiPlus className='text-xl' />
                </button>
            </div>
            <dialog id="my_modal_4" className="modal" open={showDialog}>
                <UserMessagesPage params={{id: '12'}}/>
            </dialog>
        </main>
    );
}