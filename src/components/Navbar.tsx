import { Fragment, useEffect, useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/legacy/image';
import { useRouter } from 'next/navigation';

const navigation = [
  { name: 'Pricing', href: '#', current: true },
  { name: 'Sign Up', href: '#', current: false },
];

const Navbar = () => {
  const router = useRouter();

  const [token, setToken] = useState('');

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const data = localStorage.getItem('token');
      const parsedData = data || '';
      setToken(parsedData);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    router.push('/');
  };

  return (
    <Fragment>
      <div className="min-h-full">
        <Disclosure as="nav">
          {({ open }) => (
            <>
              <div className="mx-auto max-w-[90rem]  px-4 py-4 lg:py-5 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        src="/img/Logo-3-1024x272.png"
                        alt="Vision"
                        className="h-[51px]  w-[192px]"
                        onClick={() =>
                          token ? router.push('/') : router.push('/login')
                        }
                      />
                    </div>
                  </div>
                  <div>
                    <div className="ml-4 flex items-center md:ml-6 mt-3">
                      {token ? (
                        <button
                          onClick={() => handleLogout()}
                          className="bg-gray-500 text-white rounded-md px-4 py-2 text-sm font-medium"
                        >
                          Logout
                        </button>
                      ) : (
                        <Link
                          href="/login"
                          className="bg-gray-500 text-white rounded-md px-4 py-2 text-sm font-medium"
                        >
                          Login
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
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
