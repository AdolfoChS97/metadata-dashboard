'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  SearchIcon,
  UserCircleIcon,
} from '@heroicons/react/outline'
import ProfileModal from './ProfileModal'


const Navbar = () => {

  const router = useRouter()
  const [profileMenuVisible, setProfileMenuVisible] = useState(false)
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible)
  }

  const openProfileModal = () => {
    setProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setProfileModalOpen(false);
  };


  return (
    <nav className="bg-blue-500 p-4 flex justify-between items-center">
      <div className="flex items-center">
        {/* <img src="/path-to-your-logo.png" alt="Logo" className="h-8 w-8" /> */}
        <span className="text-white ml-2">KO</span>
      </div>
      <ul className="hidden md:flex space-x-4 justify-center">
        <li className="text-white cursor-pointer">Data Health</li>
        <li className="text-white cursor-pointer">My Data</li>
        <li className="text-white cursor-pointer">Help</li>
      </ul>
      <div className="flex space-x-4">
        <i className="text-white text-xl cursor-pointer">
          <SearchIcon className="h-6 w-6" />
        </i>
        <div
          className="relative cursor-pointer"
          onClick={toggleProfileMenu}
        >
          <i className="text-white text-xl" onClick={openProfileModal}>
            <UserCircleIcon className="h-6 w-6" />
          </i>
          {profileMenuVisible && (
            <ul className="absolute right-1 mt-4 bg-white border border-gray-300 w-48 p-2">
              <li className="text-black cursor-pointer">
                <span> Account Settings</span>
              </li>
              <li className="text-black cursor-pointer">
                  <span onClick={() => router.push('/connections')}>Connections</span>
              </li>
            </ul>
          )}
        </div>
      </div>
      <ProfileModal isOpen={isProfileModalOpen} onClose={closeProfileModal} />
    </nav>
  )
}

export default Navbar
