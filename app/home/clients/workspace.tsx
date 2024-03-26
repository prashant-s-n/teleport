'use client';
import { FiSearch } from "react-icons/fi";
import { Suspense, useState } from "react";
import ClientSelectionBar from "./selection-bar";
import { useRouter } from "next/navigation";
import ClientInfo from "./clients-info";

export default function ClientWorkspace(
    {
        clients,
        currentPage,
        resultId,
        totalPages,
    }: {
        clients: any;
        currentPage: number;
        totalPages?: number;
        resultId?: string;
    }
) {

    const router = useRouter();

    function searchClient(event: any) {
        event.preventDefault();
        router.replace(`?query=${searchTerm}`);
        setIsSearching(true);
        router.refresh();
    }

    const [clientId, setClientId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [currentResultId, setCurrentResultId] = useState('');


    // Loading states
    const [isSearching, setIsSearching] = useState(false);

    // Class names
    let dynamicClientResultsClassName = 'flex flex-col mt-5 rounded-lg bg-white shadow-md mb-5';
    //if(!clients?.length) dynamicClientResultsClassName += ' hidden transition ease-in duration-75';

    
    return (
        <main className="h-full flex flex-col items-start h-screen">
            
            <div className="flex flex-row  flex-none max-w-1/6 min-w-1/6 w-full items-start">
                <div className="flex-col w-1/4 p-3">
                    <div className="flex flex-col overflow-y-auto bg-white rounded-xl h-fit shadow-sm">
                    <form onSubmit={searchClient}>
                        <div className="w-full p-3">
                            <label className="input input-md flex items-center gap-2">
                                
                                <input type="text" className="grow" placeholder="Search" onChange={(event) => setSearchTerm(event.target.value)}/>
                                <FiSearch className="text-lg"/>
                                
                                
                            </label>
                            
                        </div>
                        </form>
                        <div className="w-full p-3 p-4 leading-tight">
                            <span className="text-zinc-400 text-xs">
                                Search client(s) from their first name, phone or email address.
                            </span>
                        </div>

                        {/* <Pagination basePath="/home/users" currentPage={currentPage} totalPages={totalPages} /> */}
                    </div>
                    
                    <div className={dynamicClientResultsClassName}>
                        <div className="flex flex-col p-5">
                            <span className="text-md">Customers</span>
                            <span className="text-xs text-zinc-500">Recently onboarded</span>
                        </div>
                        <ClientSelectionBar clients={clients} setClientId={setClientId} />
                    </div>
                </div>
                <div className="flex w-full border-red-400 p-0">

                    {
                        clientId && 
                        <div className="w-full p-0 mt-0">
                                <ClientInfo clientId={clientId}/>
                            </div>
                    }
                </div> 

            </div>
            
        </main>
    )
}