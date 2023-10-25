import React from 'react'

const ProfileModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-60">
      <div className="bg-white p-4 rounded-lg">
        <p className="text-black">To get started, click <b>Connections</b>.</p>
        <div className="flex justify-between">
          <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Ok
          </button>
          <button onClick={onClose} className="mt-4 p-2 bg-blue-500 text-white rounded">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProfileModal
