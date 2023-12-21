'use client'
import ConnectionForm from '@/app/components/ConnectionForm'
import GoBackArrow from '@/app/components/GoBackArrow'
import React, { useState } from 'react'

const ConnectionCreate = () => {
  
  return (
    <div>
      <GoBackArrow />
      <h2 className="text-2xl font-bold md:mb-0 text-center">Create connections</h2>
      <ConnectionForm action='create' />
    </div>
  )
}

export default ConnectionCreate
