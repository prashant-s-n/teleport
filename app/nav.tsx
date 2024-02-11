import Image from 'next/image';
import { FiUmbrella, FiUser } from 'react-icons/fi';

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
          <div className="dropdown dropdown-end hover:bg-none">
            <div tabIndex={0} role="button" className=" text-green-500 rounded-btn hover:bg-none">
              <FiUser className='text-xl' />
            </div>
            <ul tabIndex={0} className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box text-zinc-400 w-52 mt-4">
              <li><a>Logout</a></li>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}
