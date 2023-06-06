import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

type Props = {}

function Profile({}: Props) {
  const {user} = useSelector((state: RootState) => state.user)

  return (
    <div>
       
    </div>
  )
}

export default Profile