'use client';

import { UrlConfig } from '@/configs';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';
import { FiChevronRight } from 'react-icons/fi';
import { useDebouncedCallback } from 'use-debounce';

type PropTypes = {
  userId: string;
};

export default function ClientInfo(props: PropTypes) {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  const showUserInfo = useDebouncedCallback(
    () => {
      setOpen(true);
      setLoading(true);
      const url = new URL(`/apis/users/${props.userId}`, UrlConfig.API_BASE_URL);

      setTimeout(() => {
        axios.get(url.toString()).then((response) => {
          setUserData(response.data.data);
          setLoading(false);
        }).catch((error) => {});
      }, 2000);
    },
    100,
    // The maximum time func is allowed to be delayed before it's invoked:
    { maxWait: 1000 },
  );

  return (
    <>
      <Link href={`/home/users/${props.userId}`} className='w-30 open-user-info cursor-pointer bg-green-50 rounded-md hover:bg-green-400'>
        <FiChevronRight className='text-lg'/>
      </Link>
    </>
  );
}
