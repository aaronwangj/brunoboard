import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Landing from '../components/landing'
import Usermain from './user-main'

export default function Home() {
  return (
    <div className='h-screen font-display flex justify-center px-4 items-center'>
      <style>
        {/* @import url('https://fonts.googleapis.com/css2?family=Comic+Neue&display=swap'); */}
      </style>
      <Usermain />
    </div>
  )
}
