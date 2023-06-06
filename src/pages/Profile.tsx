import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'

type Props = {}

function Profile({}: Props) {
  const {user} = useSelector((state: RootState) => state.user)
  return (
    <div>
       <h1> Profile </h1>
    </div>
  )
}

export default Profile