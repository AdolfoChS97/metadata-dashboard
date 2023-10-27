'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import GoBackArrow from '@/app/components/GoBackArrow'
import { findAndRemoveById } from '../utils/findAndRemoveById'
import LocalStorageService from '../services/localStorage.service'
import { PlusIcon, DatabaseIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

const ConnectionsPage = () => {

  const router = useRouter()
  const localStorageService = new LocalStorageService()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [connectionToDelete, setConnectionToDelete] = useState(null)

  let connections: any[] = []

  if (typeof window !== "undefined") {
    connections = localStorageService.getAllRecordsByKey('connections')
  }

  const handleDeleteClick = (connection) => {
    setConnectionToDelete(connection)
    setShowDeleteModal(true) 
  }

  const handleConfirmDelete = (id: string) => {
    console.log('Deleting connection ...')
    findAndRemoveById(connections, id)
    localStorageService.updateRecordByKey(connections, 'connections')
    connections = localStorageService.getAllRecordsByKey('connections')
    setShowDeleteModal(false)
  }

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  }

  return (
    <div>
      <GoBackArrow />
      <section className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold md:mb-0">Connections</h1>
          <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mt-4 md:mt-0" onClick={() => router.push('/connection/create')}>
            <PlusIcon className="w-3 h-3 mr-2" /> 
            <span>Add Connection</span>
          </button>
        </div>

        {connections.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 flex items-center">
                    <DatabaseIcon className="w-6 h-6 mr-2" /> Connection Name
                  </th>
                  <th className="px-4 py-2">Data Source</th>
                  <th className="px-4 py-2">User</th>
                  <th className="px-4 py-2">Edit</th>
                  <th className="px-4 py-2">Delete</th>
                </tr>
              </thead>
              <tbody>
                {connections.map((connection) => (
                  <tr key={connection.id}>
                    <td className="border px-4 py-2">{connection.connectionName}</td>
                    <td className="border px-4 py-2">{connection.dataSource}</td>
                    <td className="border px-4 py-2">{connection.user}</td>
                    <td className="border px-4 py-2">
                      <button className="text-blue-500 hover:underline flex items-center" onClick={() => router.push(`/connection/${connection.id}`)}>
                        <PencilIcon className="w-5 h-5 mr-2" />
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button className="text-red-500 hover:underline flex items-center" onClick={() => handleDeleteClick(connection)}>
                        <TrashIcon className="w-5 h-5 mr-2" />
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-6">There are no connections to show.</p>
        )}
      </section>
      {showDeleteModal && connectionToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg text-black">
            <p>Are you sure you want to delete the connection:</p>
            <p>{connectionToDelete?.connectionName}</p>
            <div className="flex justify-around">
              <button className="mt-4 p-2 bg-blue-500 text-white rounded" onClick={() => handleConfirmDelete(connectionToDelete?.id)}>Yes</button>
              <button className="mt-4 p-1 bg-blue-500 text-white rounded" onClick={handleCancelDelete}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ConnectionsPage
