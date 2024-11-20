'use client'
import { getUsers } from '@/actions/user'
import UserAddForm from '@/components/forms/UserAddForm'
import UsersTable from '@/components/tables/UsersTable'
import React from 'react'
import { useEffect, useState } from 'react'

export default function Page() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    (async () => {
      await revalidate()
    })();
  }, []);

  const revalidate = async () => {
    const data = await getUsers()
    setUsers(data)
  }

  const handleRowClick = (clickedUser) => {
    setUser(clickedUser)
  }

  return (
    <div className="grid grid-cols-4 h-full">
      <div className="col-span-3 mr-8">
        <UsersTable users={users} onClick={handleRowClick} revalidate={revalidate} />
      </div>
      <div className="col-span-1 border-l-8">
        <UserAddForm user={user} revalidate={revalidate} />
      </div>
    </div>
  )
}