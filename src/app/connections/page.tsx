'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import GoBackArrow from '@/app/components/GoBackArrow'
import { PlusIcon, DatabaseIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

const ConnectionsPage = () => {

  const router = useRouter()
  const connections = [
    { id: 1, connectionName: 'Connection 1', dataSource: 'Source 1', user: 'User 1' },
    { id: 2, connectionName: 'Connection 2', dataSource: 'Source 2', user: 'User 2' },
  ]

  return (
    <>
      <GoBackArrow />
      <div className="container mx-auto p-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold md:mb-0">Connections</h1>
          <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mt-4 md:mt-0" onClick={() => router.push('/connections/create')}>
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
                      <button className="text-blue-500 hover:underline flex items-center" onClick={() => router.push(`/connections/${connection.id}`)}>
                        <PencilIcon className="w-5 h-5 mr-2" />
                        Edit
                      </button>
                    </td>
                    <td className="border px-4 py-2">
                      <button className="text-red-500 hover:underline flex items-center">
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
          <p className="text-gray-600">There are no connections to show.</p>
        )}
      </div>
    </>
  )
}

export default ConnectionsPage
