import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import ProductsList from '../components/ProductsList'

const Home: NextPage = () => {
  const [categories , setCategories] = useState([]);
  const [category , setCategory] = useState("all");
  const [search , setSearch] = useState('');

  useEffect(()=>{
    fetch('https://fakestoreapi.com/products/categories').then(async res => {
      const list = await res.json();
      setCategories(list ? list : []);
    })
  },[])
  
  return (
    <>
      <Nav 
        setCategory={setCategory} 
        categories={categories} 
        setSearch={setSearch} 
        cartPage={false}
      />
      <ProductsList 
        category={category} 
        setCategories={setCategories}
        search={search}
      />
    </>
  )
}

export default Home
