import { useState, useEffect, useContext, createContext } from 'react';
import { Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Cog8ToothIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import './App.css';

function App() {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [search, setSearch] = useState('');
  const [updateText, setUpdateText] = useState('');
  const [inputText, setInputText] = useState('');
  const [userId, setUserId] = useState('');
  const [users, setUsers] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleUpdateChange = (e) => {
    setUpdateText(e.target.value);
  };

  const handleSearchText = (e) => {
    setSearch(e.target.value)
  }

  const handleSearchButton = (e) => {
    e.preventDefault();
    console.log('Search started')
    axios.get(`http://localhost:8080/users`, { params: { name: search } })
      .then(res => {
        setUsers(res.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  const handleButtonClick = (e) => {
    e.preventDefault();
    const name = inputText
    axios.post(`http://localhost:8080/users`, { name })
  };

  const deleteUser = (id) => {
    axios.delete(`http://localhost:8080/users/${id}`)
  }

  const updateUser = (id) => {
    const name = updateText
    axios.put(`http://localhost:8080/users/${id}`, { name })
  }
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search === '') {
        axios.get(`http://localhost:8080/users`)
          .then(res => {
            setUsers(res.data);
            console.log('List Of Users Updated')
          })
          .catch(error => {
            console.error(error);
          });
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [handleSearchButton])


  if (!users) return null;



  return (
    <>
      <div className="flex flex-col w-96 m-auto">
        <div className="flex flex-row items-center relative">
          <input onChange={handleInputChange} className="transition-all bg-white shadow-xl border rounded w-96 h-12 p-6 pr-20 focus:outline-12 focus:outline-blue-400 border-blue-300 placeholder:pl-1 mb-3" type="text" placeholder='Name Of User' />
          <button onClick={handleButtonClick} type='submit' className="transition-all bg-transparent border-2 border-blue-300 py-3 px-4 rounded absolute right-0 top-0 hover:bg-blue-300 hover:text-white" >Add</button>
        </div>
        <div className="transition-all font-semibold ml-35 w-96 bg-white shadow-lg border-2 border-blue-300 hover:bg-black-100 p-2 rounded-md text-left break-words">
          {users.map(user =>
            <div key={user.id} className='relative items-center'>
              <p className='p-3'><p className='w-40 break-words'>{user.id} / {user.name}</p>
                <button onClick={() => {setUserId(user.id);setOpen(true)}} className='bg-white shadow-lg hover:bg-green-500 text-green-500 font-semibold hover:text-white py-1 px-4 border border-green-500 transition-all rounded-md absolute right-24 top-2'>Update</button>
                <button onClick={deleteUser.bind(null, user.id)} className='bg-white shadow-lg hover:bg-red-500 text-red-500 font-semibold hover:text-white py-1 px-4 border border-red-500 transition-all rounded-md absolute right-0 top-2'>Delete</button></p>
              <hr />
            </div>
          )}
          <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white sm:mx-0 sm:h-10 sm:w-10">
                            <Cog8ToothIcon className="h-6 w-6 text-black-600" aria-hidden="true" />
                          </div>
                          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                            <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Update User
                            </Dialog.Title>
                            <div className="mt-2">
                              <p className="text-sm text-gray-500">
                                Enter Updating Data:
                              </p>
                              <form>
                                <div class="relative mb-3" data-te-input-wrapper-init>
                                  <input
                                    type="text"
                                    class="border peer block min-h-[auto] w-[22rem] rounded border-black-400 bg-transparent pl-2 py-2 mt-3 leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:peer-focus:text-primary [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                                    id="exampleFormControlInput1"
                                    onChange={handleUpdateChange}
                                    placeholder="Example label" />
                                  <label
                                    for="exampleFormControlInput1"
                                    class="bg-white w-min he-min pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.42rem] leading-[1.6] peer-focus:scale-[0.8] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:text-primary peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary"
                                    >User Name
                                  </label>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                        
                        <button
                          type="button"
                          onClick={/*(event) => {updateUser.bind(null, event.currentTarget.id); setOpen(false);*/updateUser.bind(null, userId)}
                          className="transition-all inline-flex w-full justify-center border border-green-500 rounded-md bg-white px-3 py-2 text-sm font-semibold text-green-500 hover:text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                        >
                          Update  
                        </button>
                        <button
                          type="button"
                          className="transition-all mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          onClick={() => setOpen(false)}
                          ref={cancelButtonRef}
                        >
                          Cancel
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

        </div>
          <div className='mt-3 flex'>
            <div className="flex flex-row items-center relative">
                <input onChange={handleSearchText} className="transition-all bg-white shadow-xl border rounded w-96 h-12 p-6 pr-20 focus:outline-12 focus:outline-blue-400 border-blue-300 placeholder:pl-1 mb-3" type="text" placeholder='Type User Name' />
                <button onClick={handleSearchButton} type='submit' className="transition-all bg-transparent border-2 border-blue-300 py-3 px-4 rounded absolute right-0 top-0 hover:bg-blue-300 hover:text-white" >Search</button>
            </div>
          </div>
      </div>
    </>
  )
}

export default App
