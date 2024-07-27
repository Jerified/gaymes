import React from 'react'
import GamesTitle from './GamesTitle'

const Navbar = () => {
  return (
    <header className='py-6 lg:max-w-6xl mx-auto px-4 '>
        <h1 className="font-semibold text-2xl">Gaymes</h1>
        <div className="pl-12 mt-[-6px]">
            <GamesTitle />
        </div>
    </header>
  )
}

export default Navbar