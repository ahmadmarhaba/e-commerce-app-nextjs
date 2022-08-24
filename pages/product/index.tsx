import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../../styles/Product.module.css'
import Nav from '../../components/Nav'
import { Rating } from 'react-simple-star-rating'
import ProductsList from '../../components/ProductsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/actions/userAction'

const Product: NextPage = ({ id } : any) => {
const [product , setProduct] = useState<any>(null);
const [count , setCount] = useState<any>(1);

const dispatch : any = useDispatch();
let { user } = useSelector((state: any) => state.user)

useEffect(()=>{
    fetch(`https://fakestoreapi.com/products/${id}`).then(async res=> {
        let prod = await res.json();
        setProduct(prod);
    })
},[])
  return (
    <>
           <Nav 
              setCategory={null} 
              categories={null} 
              setSearch={null} 
              cartPage={false}
            />
            
          {
            product && <div className={styles.container}>
            <div className={styles.image}>
            <Image src={product.image} width={400} height={400} />
            </div>
            <div className={styles.card}>
                <h2>{product.title}</h2>          
                <div className={styles.rating}>
                    <Rating initialValue={product.rating.rate} readonly ratingValue={0} />
                    <div>{`${product.rating.count} ratings`}</div>
                </div>
                <div className={styles.price}>
                    <div>
                    {`Price: `}<span>{`$${product.price}`}</span>
                    </div>
                    <input type="button" value="Add to Cart" onClick={()=>{
                      const cart = {
                        amount : count,
                        product : product
                      }
                      user.cart.push(cart)
                      dispatch(fetchUser(user))
                    }}/>
                </div> 
                <div className={styles.amount}>
                    <input type="button" value="-" onClick={()=>{  setCount(count > 1 ? count - 1 : count) }} disabled={count === 1}/>
                    <span>{count}</span>
                    <input type="button" value="+" onClick={()=>{  setCount(count < 10 ? count + 1 : count) }} disabled={count === 10}/>
                </div>
                <h4>{`Product Description`}</h4>
                <div>{product.description}</div>          
            </div>
            </div>
          }
          <h3>Brands in this category</h3>
      <ProductsList 
        category={"electronics"} 
        setCategories={null}
        search={''}
      />
    </>
  )
}

export default Product


Product.getInitialProps = async ({query }) => {
    const {id} = query
    return {id}
  }