import { Fragment } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/legacy/image';

const navigation = [
  { name: 'Pricing', href: '#', current: true },
  { name: 'Sign Up', href: '#', current: false },
];

const Navbar = () => {
  return (
    <Fragment>
      <div className='min-h-full'>
        <Disclosure as='nav'>
          {({ open }) => (
            <>
              <div className='mx-auto max-w-[90rem]  px-4 py-4 lg:py-8 sm:px-6 lg:px-8'>
                <div className='flex h-16 items-center justify-between'>
                  <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                      <div className='h-[51px]  w-[192px] relative '>
                        <Image
                          src='/img/Logo-3-1024x272.png'
                          alt='Vision'
                          layout='fill' // required
                        />
                      </div>
                    </div>
                    <div className='hidden md:block'>
                      <div className='ml-10 flex items-baseline space-x-4 mt-3'>
                        {navigation.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className='text-white  hover:bg-gray-700 hover:text-white rounded-md px-10 py-2 mx-10  font-bold'
                            aria-current={item.current ? 'page' : undefined}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className='ml-4 flex items-center md:ml-6 mt-3'>
                      <Link
                        href='/'
                        className='bg-gray-500 text-white rounded-md px-4 py-2 text-sm font-medium'
                      >
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className='-mr-2 flex md:hidden'>
                    {/* Mobile menu button */}
                    <Disclosure.Button className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-0.5' />
                      <span className='sr-only'>Open main menu</span>
                      {open ? (
                        <XMarkIcon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      ) : (
                        <Bars3Icon
                          className='block h-6 w-6'
                          aria-hidden='true'
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className='md:hidden'>
                <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as='a'
                      href={item.href}
                      className={`
                        ${
                          item.current
                            ? 'bg-gray-900 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        }
                        'block rounded-md px-3 py-2 text-base font-medium'
                      `}
                      aria-current={item.current ? 'page' : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </Fragment>
  );
};

export default Navbar;