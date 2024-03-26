import moment from "moment";
import { FiChevronRight } from "react-icons/fi";

export default function ClientSelectionBar(
    {
        clients,
        setClientId
    }: {
        clients: any,
        setClientId: (id: string) => any
    }
) {
    function obfuscateLastFourDigits(input: string): string {

        const lastFourDigits = input.substring(input.length - 4);
        const obfuscatedDigits = "＊".repeat(4);

        return input.substring(0, input.length - 4) + obfuscatedDigits;
    }

    return (
        <div className="divide-y divide-zinc-100 overflow-scroll">
            <div className="divide-y divide-zinc-100">
                        {
                            !clients?.length && 
                            <span className='text-zinc-300'>
                                No clients found.
                            </span>
                        }
                        {
                            clients?.map((client: any, index: number) => (
                                <div className="w-full flex p-5 flex-row cursor-pointer hover:bg-zinc-50 gap-3"
                                key={client?.id}>
                                    <div className="flex w-1/6 max-w-1/6 avatar placeholder items-center">
                                        <div className="bg-slate-100 text-black rounded-full w-10 h-10">
                                            <span className="text-xl">{client.first_name?.at(0)}</span>
                                            
                                        </div>
                                        </div> 
                                    <div className="flex flex-1 flex-col">
                                    
                                        <span className="text-md capitalize">
                                            {client.first_name} {client.middle_name} {client.last_name}
                                        </span>
                                        
                                        <span className="text-xs text-zinc-400 lower">
                                            {moment(client.created_at).format('DD MMM YYYY')}
                                        </span>
                                        
                                    </div>
                                    <div className="flex flex-none flex-col items-center justify-center">
                                        <span className="items-center">
                                            <button onClick={() => setClientId(client.id)}>
                                                <FiChevronRight className="text-xl"/>
                                            </button>
                                        </span>
                                    </div>
                                </div>
                            ))
                        }
                        </div>
            {/* {
                clients?.map((client: any, index: number) => (
                    <div className="w-full flex p-5 flex-row cursor-pointer hover:bg-zinc-50 gap-3"
                    key={'client'+index}
                    >
                        <div className="flex w-1/6 max-w-1/6 avatar placeholder">
                            <div className="bg-green-100 text-green-400 rounded-full w-20">
                                <span className="text-xl">{client.first_name?.at(0)}</span>
                            </div>
                        </div>
                        <div className="flex flex-1 flex-col">

                            <span className="text-lg capitalize">
                                {client.first_name} {client.last_name}
                            </span>
                            
                        </div>
                        <div className="flex flex-none flex-col items-center justify-center">
                            <span className="items-center">
                                <FiChevronRight className="text-2xl" />
                            </span>
                        </div>
                    </div>
                ))
            } */}
        </div>
    )
}