import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';
import { Rating } from 'react-simple-star-rating'


const ProductsList = ({category, search} : any) => {
  const router = useRouter()
  const [products , setProducts] = useState([]);
  
  async function getProducts(){
    let query = category !== 'all' ? `/category/${category}` : ''
    const response = await fetch(`https://fakestoreapi.com/products${query}`)
    let res = await response.json();
    setProducts(res ? res : [])
  }
  useEffect(()=>{
    category && getProducts();
  },[category])

  return (
    <>
      <div className={styles.products}>
        {
          products && products.filter((item : any) => item.title.toLowerCase().includes(search)).map((item : any)=>{
            return (
              <div key={item.id} className={styles.card} onClick={()=>{ router.push({
                  pathname: '/product',
                  query: { id: item.id }
              })}}>
                <div className={styles.split}>
                  <Image src={item.image} width={140} height={140} layout="responsive"/>
                  <div>{item.title}</div>
                </div>
                <div className={styles.split}>
                <div className={styles.rating}>
                <Rating initialValue={item.rating.rate}
                    readonly ratingValue={0}/>
                  <div>{`${item.rating.count}`}</div>
                </div>
                <div className={styles.price}>{`${item.price}$`}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}

export default ProductsList
