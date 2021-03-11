import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Landing from '../components/landing'
import Usermain from './user-main'

export default function Home() {
  return (
    <div className='h-screen flex justify-center px-4 items-center'>
      <Usermain />
    </div>
  )
}
