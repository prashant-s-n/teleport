'use client';

import Link from "next/link";
import CreateClient from "./page";
import { FiPlus } from "react-icons/fi";
import { useState } from "react";

export default function CreateClientDialog() {

    const [showDialog, setShowDialog] = useState<boolean>(false);

    return (
        <main>
            {/* Trigger */}
            <div className='flex flex-none items-center p-3 modal-backdrop' onClick={() => setShowDialog(true)}>
                <button className='btn bg-black text-green-100 btn-md'>
                    <FiPlus className='text-xl' />
                </button>
            </div>
            <dialog id="my_modal_4" className="modal" open={showDialog}>
                
                <div className="modal-box w-md max-w-md p-6">
                    <CreateClient closeDialogHandler={() => setShowDialog(false)}/>
                </div>
                
            </dialog>
        </main>
    );
}