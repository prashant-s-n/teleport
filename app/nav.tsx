import Image from 'next/image';
import React from 'react';
import { FiUser } from 'react-icons/fi';

export default function Nav() {
  return (
    <div className='navbar bg-green-50 p-5 shadow-md' style={{
      fontFamily: 'var(--font-inter)',
    }}>
      <div className='flex-1 gap-x-3'>
        <Image
          src={'/teleport-brand.png'}
          alt='Brand logo'
          width='50'
          height='50'
        />
        <span className='text-xl font-bold text-green-500' style={{ lineHeight: '1.3' }}>
          Teleport
          <span className='text-zinc-400 block' style={{ fontSize: '9pt' }}>All Abroad Education</span>
        </span>
      </div>

      <div className='flex-none'>
        <ul className='menu menu-horizontal menu-end p-1 text-dacopsy-blue bg-green-50 text-sm'>
          
        </ul>
      </div>
    </div>
  );
}
