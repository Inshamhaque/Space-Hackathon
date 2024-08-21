import { useState } from 'react'
import Card from './components/Card'
import Header from './components/Header'

function App() {

  return (
    <div className='w-[100vh] h-[100vh] mx-auto flex flex-col gap-10 items-center justify-center overflow-x-auto'>
      
      <Header></Header>
      <Card></Card>

    </div>
  )
}

export default App
