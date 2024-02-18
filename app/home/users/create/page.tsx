'use client';

import { UrlConfig } from '@/configs';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';
import { useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { FiCompass, FiInfo, FiUser } from 'react-icons/fi';
import debounce from 'lodash/debounce';
import { useRouter } from 'next/navigation';
import BreadcrumbGenerator from '@/app/common/components/breadcrumb-generator';
import { FcApproval, FcHighPriority } from 'react-icons/fc';

const phoneRegExp = /^\+(?:[0-9] ?){6,14}[0-9]$/;
const passwordExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

async function getBranches() {
  const response = await axios.get(`${UrlConfig.API_BASE_URL}/apis/branches`);
  return response.data.data;
}

async function getRoles() {
  const response = await axios.get(`${UrlConfig.API_BASE_URL}/apis/roles`);
  return response.data.data;
}

const cascadingLinks = [
  { name: 'Home', href: '/home' },
  { name: 'Users', href: '/home/users' },
  { name: 'Create', href: '/home/users/create' },
];

export default function CreateUser() {
  const [officeBranches, setOfficeBranches] = useState([]);
  const [roles, setRoles] = useState([]);

  const [isFormProcessing, setIsFormProcessing] = useState<boolean>(false);
  const [isUserCreated, setIsUserCreated] = useState<boolean>(false);
  const [adverseAction, setAdverseAction] = useState<boolean | string>(false);
  const [fullName, setFullName] = useState('');

  const router = useRouter();

  useEffect(() => {
    getBranches().then((branches: any) => setOfficeBranches(branches));
    getRoles().then((roles: any) => setRoles(roles));
  }, []);

  const schema = yup
    .object({
      email: yup.string().email().required(),
      first_name: yup.string().required(),
      middle_name: yup.string().optional(),
      last_name: yup.string().required(),
      dob: yup.date().nullable().notRequired(),
      gender: yup.string().required(),
      location: yup.string().required(),
      role: yup.string().required(),
      phone: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
      password: yup.string().matches(passwordExp, 'Password is not meeting the standards'),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Do entertain a click after 3s of duplicate
  // form submissions.
  const debouncedClick = useCallback(debounce((data) => {
    setIsFormProcessing(true);
    onSubmit(data);
  }, 3000, { leading: true, trailing: false, maxWait: 1000 }), []);

  const onSubmit = (data: any) => {

    const url = new URL('apis/auth/api/signup', UrlConfig.API_BASE_URL);

    setFullName(data?.first_name + ' ' + data?.last_name) 

    axios.post(url.toString(), {
      data,
    }).then((response) => {
      setIsFormProcessing(false);
      setIsUserCreated(true);

      setTimeout(() => {
        router.replace('/home/users');
        router.refresh();
      }, 3000);
    }).catch((error) => {
      setIsFormProcessing(false);
      setAdverseAction(error.response.data.message);
    });
  };

  if (isFormProcessing) {
    return (
      <main className='gap-4 p-4 rounded-md flex bg-white items-center flex-col h-screen justify-center'>
        <div className='bg-white flex flex-col items-center p-4 rounded-lg gap-6 animate-pulse'>
          <span className='loading loading-infinity loading-lg'></span>
          <p className='p-6'>A new user is getting <span className='line-through	inline'>created</span> teleported.</p>
        </div>
      </main>
    );
  }

  if (isUserCreated) {
    return (
      <main className='gap-4 p-4 rounded-md flex bg-white flex-col h-screen justify-center items-center'>
        <div className=' text-green-600 w-fit flex flex-col items-center p-7 rounded-lg gap-2 justify-center'>
          <span className='p-1  '><FcApproval className='text-9xl'/></span>
          <p className='p-1'>{fullName} has been onboarded</p>
          <p className='p-1'>
            <span className='text-green-700 text-sm'>
              You will be getting redirected shortly in 3s
            </span>
          </p>
        </div>
      </main>
    );
  }

  if (adverseAction) {
    return (
      <main className='gap-4 p-4 rounded-md flex bg-white items-center flex-col h-screen justify-center'>
        <div className='text-red-600  flex flex-col items-center p-7 rounded-lg  gap-2 justify-center'>
          <span className='p-1  '><FcHighPriority className='text-9xl'/></span>
          <p className='p-1'>User could not be created</p>
          <p className='p-1'>
            <span className='text-red-700 text-sm'>
              {adverseAction}
            </span>
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className='rounded-md bg-white p-4'>
      <div className='flex w-full flex-col'>
        <div className='flex flex-1 flex-col p-0'>
          <h1 className='mb-0 text-xl'>Create User</h1>
          <BreadcrumbGenerator cascadingLinks={cascadingLinks}/>
        </div>
        <div className='flex min-w-full flex-col p-4'>
          <form onSubmit={handleSubmit(debouncedClick)}>
            <div className='flex flex-col'>
              <div className='flex flex-none items-center py-3 text-zinc-700'>
                <FiUser className='mr-3 text-sm' />
                <span className='text-sm'>Personal Details</span>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>Email address</span>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('email')}
                    name='email'
                    type='email'
                    placeholder='michaelscott@gmail.com'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.email?.message}
                  </p>
                </div>
                <div className='flex py-2 '>
                  <span className='text-xs text-zinc-700'>
                    <FiInfo className='mr-1 inline' />
                    This will also be utilized as your username while logging
                    into Teleport
                  </span>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>First Name</span>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('first_name')}
                    type='text'
                    placeholder='Michael'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.first_name?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>Middle Name</span>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('middle_name')}
                    type='text'
                    placeholder='Jeffrey'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.middle_name?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>Last Name</span>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('last_name')}
                    type='text'
                    placeholder='Scott'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.last_name?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>
                    Date of Birth (Optional)
                  </span>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('dob')}
                    type='text'
                    placeholder='YYYY/MM/DD'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.dob?.message ? 'Please enter a valid date' : ''}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex'>
                  <span className='text-sm text-zinc-400'>Gender</span>
                </div>
                <div className='flex flex-col'>
                  <select
                    {...register('gender')}
                    className='select select-bordered w-full max-w-xs'
                  >
                    <option value='Male'>Male</option>
                    <option value='Female'>Female</option>
                    <option value='Others'>Others</option>
                  </select>
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.gender?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex flex-col'>
                  <span className='text-sm text-zinc-400'>Password</span>
                  <p className='py-2 text-xs block text-gray-400'>
                    Must be a 8 digit password with 1 UPPERCASE, 1 lowercase, numbers and atleast 1
                    special character.
                  </p>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('password')}
                    type='password'
                    placeholder='YourSecREtPw'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.password?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-col py-2'>
                <div className='flex flex-col'>
                  <span className='text-sm text-zinc-400'>Phone no.</span>
                  <p className='py-2 text-xs block text-gray-400'>
                    Add a prefix based on the country
                  </p>
                </div>
                <div className='flex flex-col'>
                  <input
                    {...register('phone')}
                    type='text'
                    placeholder='+910909090'
                    className='input input-bordered w-full max-w-xs'
                  />
                  <p className='py-2 text-xs uppercase text-red-400'>
                    {errors.phone?.message}
                  </p>
                </div>
              </div>

              <div className='flex flex-none items-center py-3 text-zinc-700'>
                <FiCompass className='mr-3 text-sm' />
                <span className='text-sm'>Official details</span>
              </div>

              {officeBranches && officeBranches.length ? (
                <div className='flex flex-col py-2'>
                  <div className='flex'>
                    <span className='text-sm text-zinc-400'>
                      Office Location/ Branch
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <select
                      {...register('location')}
                      className='select select-bordered w-full max-w-xs'
                    >
                      {officeBranches.length
                        && officeBranches?.map((officeBranch: any) => (
                          <option key={officeBranch.id} value={officeBranch.id}>
                            {officeBranch.branch_name}
                          </option>
                        ))}
                    </select>
                    <p className='py-2 text-xs uppercase text-red-400'>
                      {errors.location?.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='p-4'>Loading Locations...</div>
              )}

              {roles && roles.length ? (
                <div className='flex flex-col py-2'>
                  <div className='flex'>
                    <span className='text-sm text-zinc-400'>
                      Roles
                    </span>
                  </div>
                  <div className='flex flex-col'>
                    <select
                      {...register('role')}
                      className='select select-bordered w-full max-w-xs'
                    >
                      {roles.length
                        && roles?.map((role: any) => (
                          <option key={role.id} value={role.id}
                          >
                            {role.canonical_name}
                          </option>
                        ))}
                    </select>
                    <p className='py-2 text-xs uppercase text-red-400'>
                      {errors.role?.message}
                    </p>
                  </div>
                </div>
              ) : (
                <div className='p-4'>Loading Locations...</div>
              )}

              <div className='flex flex-col py-2'>
                <button
                  type='submit'
                  className='btn w-fit bg-green-400 text-white'
                >
                  Create account
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
