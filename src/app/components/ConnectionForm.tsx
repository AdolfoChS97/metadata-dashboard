import React, { useState } from 'react'
import { ConnectionForm } from '../types/Connections.dt'

const ConnectionForm = ({ action, id }: ConnectionForm)  => {

    console.log(id)

    const [formData, setFormData] = useState({
        connectionName: '',
        accountName: '',
        userName: '',
        password: '',
        warehouseName: '',
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
        console.log(formData)
    }

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
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userName">
                        User Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        name="userName"
                        value={formData.userName}
                        onChange={handleInputChange}
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
                        onClick={handleCreateConnection}
                    >
                        Create
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ConnectionForm
