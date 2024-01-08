import React from 'react'
import Sidebar from '../components/sidebar'
import Header from '../components/Header'
import CategoryMain from '../components/Category/CategoryMain'

const CategoryScreen = () => {
  return (
    <>
    <Sidebar />
    <main className="main-wrap">
      <Header />
      <CategoryMain/>
    </main>
  </>
  )
}

export default CategoryScreen