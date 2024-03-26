'use client';

import { UrlConfig } from '@/configs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FiClock, FiMail, FiPhoneCall } from 'react-icons/fi';
import moment from 'moment-timezone';
import { FcBusinessContact, FcCalendar, FcCurrencyExchange, FcViewDetails } from 'react-icons/fc';
import classNames from 'classnames';
import ClientPersonalInfo from './client-personal-info';
import UserMessagesPage from './messages/[id]/page';
import ChatPage from './messages/[id]/chat';

type PropTypes = {
  clientId: string;
};

enum ClientInfoTabStates {
  NOTES = 'notes',
  TRANSACTIONS = 'transactions',
  PERSONAL_INFORMATION = 'personal_information',
}

export default function ClientInfo(props: PropTypes) {

  const clientId = props.clientId;

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // State management of tabs
  const [currentTab, setCurrentTab] = useState<ClientInfoTabStates>(ClientInfoTabStates.PERSONAL_INFORMATION);

  // Style information
  const baseTabStyle = 'flex w-1/4 items-center justify-center gap-2 p-4 rounded-lg';

  useEffect(() => {
    const url = new URL(`/apis/clients/${props.clientId}`, UrlConfig.API_BASE_URL);
    
    setLoading(true);
    axios.get(url.toString()).then((response) => {
      setUserData(response.data.data);
      setLoading(false);
    }).catch((error) => {});
  }, [clientId])

  if(loading) return (
    <div className='flex w-full justify-left p-5 items-center'>
      <div className="flex flex-col gap-4 w-52">
        
        <div className="skeleton h-4 w-28"></div>
        <div className="skeleton h-4 w-full"></div>
        <div className="skeleton h-4 w-full"></div>
      </div>
    </div>
  )

  return (
    <>
     <main className='flex flex-col transition ease-in duration-300 bg-transparent w-full p-3'>
     
       <div className='flex flex-row w-full bg-white rounded-lg '>
        <div className='flex flex-col flex-1 shadow-sm rounded-lg p-4'>
          <span className='text-sm text-zinc-400'>
            Name
          </span>
          <span className='text-lg capitalize'>
            {userData?.first_name} {userData?.middle_name} {userData?.last_name}
          </span>
          
        </div>
        
        </div>

        <div className='flex flex-row w-full p-1  my-1 text-center bg-white rounded-lg items-stretch cursor-pointer'>
            <div className={classNames({
              [baseTabStyle]: true,
              'bg-zinc-100 transition ease-in duration-300': currentTab === ClientInfoTabStates.NOTES
            })}
            onClick={() => setCurrentTab(ClientInfoTabStates.NOTES)}
            >
              <FcViewDetails className='text-xl'/> Notes
            </div>
            <div className={classNames({
              [baseTabStyle]: true,
              'bg-zinc-100 transition ease-in duration-300': currentTab === ClientInfoTabStates.TRANSACTIONS
            })}
            onClick={() => setCurrentTab(ClientInfoTabStates.TRANSACTIONS)}
            >
              <FcCurrencyExchange className='text-4xl'/> Transactions
            </div>
            <div className={classNames({
              [baseTabStyle]: true,
              'bg-zinc-100 transition ease-in duration-300': currentTab === ClientInfoTabStates.PERSONAL_INFORMATION
            })}
            onClick={() => setCurrentTab(ClientInfoTabStates.PERSONAL_INFORMATION)}
            >
              <FcBusinessContact className='text-4xl'/> Personal Information
            </div>
            <div className={classNames({
              [baseTabStyle]: true,
              'bg-zinc-100 transition ease-in duration-300': currentTab === ClientInfoTabStates.PERSONAL_INFORMATION
            })}
            onClick={() => setCurrentTab(ClientInfoTabStates.PERSONAL_INFORMATION)}
            >
              <FcCalendar className='text-4xl'/> Schedules
            </div>
        </div>

        <div className='flex flex-row w-full p-1  my-1 text-center rounded-lg items-stretch cursor-pointer'>
            {
              currentTab === ClientInfoTabStates.NOTES
              && 
              <UserMessagesPage params={{id : userData.id}}/>
            }
            {
              currentTab === ClientInfoTabStates.PERSONAL_INFORMATION && 
              <ClientPersonalInfo userData={userData}/>
            }
            {
              currentTab === ClientInfoTabStates.TRANSACTIONS && <>Transactions</>
            }
        </div>
        
     </main>
    </>
  );
}
