import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/solid' // Import the Plus icon

const ConnectionsPage = () => {
  // Sample data for connections
  const connections = [
    // { id: 1, name: 'Connection 1', description: 'Description 1' },
    // { id: 2, name: 'Connection 2', description: 'Description 2' },
  ]

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-2xl font-bold md:mb-0">Connections</h1>
        <button className="flex items-center bg-blue-500 text-white py-2 px-4 rounded mt-4 md:mt-0">
          <PlusIcon className="w-3 h-3 mr-2" /> 
          <span>Add Connection</span>
        </button>
      </div>

      {connections.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {connections.map((connection) => (
                <tr key={connection.id}>
                  <td className="border px-4 py-2">{connection.name}</td>
                  <td className="border px-4 py-2">{connection.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-600">There are no connections to show.</p>
      )}
    </div>
  )
}

export default ConnectionsPage
