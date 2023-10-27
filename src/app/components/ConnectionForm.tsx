import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { ConnectionForm } from '../types/Connections.dt'
import { findAndRemoveById } from '../utils/findAndRemoveById'
import LocalStorageService from '../services/localStorage.service'
import ConnectionService from '../services/connection.service'

const ConnectionForm = ({ action, id }: ConnectionForm) => {
  
  const router = useRouter()
  const localStorageService = new LocalStorageService()
  const [isLoadingRequest, setLoadingRequest] = useState(false)
  const [testConnectionResponse, setTestConnectionResponse] = useState(undefined)
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

  const handleTestConnection = async () => {
    try {
      console.log('Testing connection...')
      setLoadingRequest(true)
      const response = await ConnectionService.test({     
        accountName: formData.accountName,
        user: formData.user,
        password: formData.password,
        warehouseName: formData.warehouseName  
      })
      setLoadingRequest(false)
      setTestConnectionResponse(response.data)
      console.log(testConnectionResponse)
    } catch (e) {
      setLoadingRequest(false)
      setTestConnectionResponse(e?.response)      
    }
  }

  const handleCreateConnection = () => {
    console.log('Creating connection...')
    const connections = localStorageService.getAllRecordsByKey('connections')
    formData.id = connections.length + 1
    localStorageService.addRecordByKey(connections, formData, 'connections')

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
    const connections = localStorageService.getAllRecordsByKey('connections')
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

    localStorageService.updateRecordByKey(connections, 'connections')

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
    let connections = []
    if (typeof window !== "undefined" && id) {
      connections = localStorageService.getAllRecordsByKey('connections')

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
        { isLoadingRequest &&
          <>
            <div className='flex justify-center mt-6'>
              <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span className="sr-only text-black">Loading...</span>
              </div>
            </div>
          </>  
        }
        {
          !isLoadingRequest && testConnectionResponse?.err === 0 &&
          <>
            <div className='flex justify-center mt-6'>
              <span className='text-black text-sm'>Connected succesfully</span>
            </div>
          </> 
        }
        {
          !isLoadingRequest && testConnectionResponse?.status === 500  && 
          <>
            <div className='flex justify-center mt-6'>
              <span className='text-black text-sm'>{testConnectionResponse?.data?.message}</span>
            </div>
          </> 
        }
      </form>
    </div>
  )
}

export default ConnectionForm
