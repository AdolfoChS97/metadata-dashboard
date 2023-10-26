import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { ConnectionForm } from '../types/Connections.dt'
import { findAndRemoveById } from '../utils/findAndRemoveById'

const ConnectionForm = ({ action, id }: ConnectionForm) => {
  
  const router = useRouter()

  const [formData, setFormData] = useState({
    id: 0,
    connectionName: '',
    accountName: '',
    user: '',
    password: '',
    warehouseName: '',
    dataSource: 'Snowflake'
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleTestConnection = () => {
    console.log('Testing connection...')
    console.log(formData)
  }

  const handleCreateConnection = () => {
    console.log('Creating connection...')
    const connections = JSON.parse(localStorage.getItem('connections') as string) || []
    formData.id = connections.length + 1
    connections.push(formData)
    localStorage.setItem('connections', JSON.stringify(connections))

    // Reset the form after saving
    setFormData({
      connectionName: '',
      accountName: '',
      user: '',
      password: '',
      warehouseName: '',
      dataSource: 'Snowflake',
      id: 0
    })

    router.back()

  }

  const handleEditConnection = () => {
    console.log('Editing connection...')
    const connections = JSON.parse(localStorage.getItem('connections') as string) || []
    const connectionsData = findAndRemoveById(connections, id as string)
    
    connectionsData.connectionName = formData.connectionName
    connectionsData.accountName = formData.accountName
    connectionsData.user = formData.user
    connectionsData.password = formData.password
    connectionsData.warehouseName = formData.warehouseName
    connectionsData.dataSource = formData.dataSource
    connectionsData.id = id

    if(connections.length > 0) connections.push(connectionsData)
    else connections.push({ ...connectionsData,})

    localStorage.setItem('connections', JSON.stringify(connections))

    setFormData({
      connectionName: '',
      accountName: '',
      user: '',
      password: '',
      warehouseName: '',
      dataSource: 'Snowflake',
      id: 0
    })

    router.back()
  }

  useEffect(() => {
    let ls = ''
    let connections = []
    if (typeof window !== "undefined" && id) {
      ls = localStorage.getItem("connections") || "" as string
      connections = JSON.parse(ls)

      if(id) {
        const connectionData = connections.find((conn: any) => conn.id == id);
        setFormData({
          connectionName: connectionData.connectionName || '',
          accountName: connectionData.accountName || '',
          user: connectionData.user || '',
          password: connectionData.password || '',
          warehouseName: connectionData.warehouseName || '',
          dataSource: connectionData.dataSource || 'Snowflake',
          id: connectionData.id 
        }) 
      }
    }
  }, [id])

  return (
    <div className="w-full max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-2 mt-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="connectionName">
            Connection Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="connectionName"
            value={formData.connectionName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="accountName">
            Account Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="accountName"
            value={formData.accountName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user">
            User
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="user"
            value={formData.user}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="warehouseName">
            Warehouse Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="warehouseName"
            value={formData.warehouseName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mt-6 mb-1 text-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mx-2 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleTestConnection}
          >
            Test Connection
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full mx-2 focus:outline-none focus:shadow-outline"
            type="button"
            onClick={ action == 'create' ? handleCreateConnection : handleEditConnection }
          >
            { action === 'create' ? 'Create' : 'Update' }
          </button>
        </div>
      </form>
    </div>
  )
}

export default ConnectionForm
