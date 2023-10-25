'use client'
import ConnectionForm from '@/app/components/ConnectionForm'
import GoBackArrow from '@/app/components/GoBackArrow'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

const ConnectionEdit = () => {

  const params = useParams() as { id: string }

  return (
    <div>
      <GoBackArrow />
      <h2 className="text-2xl font-bold md:mb-0 text-center">Edit connection</h2>
      <ConnectionForm action='edit' id={params?.id}/>
    </div>
  )
}

export default ConnectionEdit
