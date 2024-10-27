import UserAddForm from '@/components/forms/UserAddForm'
import UsersTable from '@/components/tables/UsersTable'
import { prisma } from '@/prisma/db'
import React from 'react'

export default async function page() {
  const users = await prisma.user.findMany()

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3 mr-8">
        <UsersTable users={users} />
      </div>
      <div className="col-span-1 border-l-8">
        <UserAddForm />
      </div>
    </div>
  )
}