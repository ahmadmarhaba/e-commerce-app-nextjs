import type { NextPage } from 'next'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../../styles/Cart.module.css'
import Nav from '../../components/Nav'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../../store/actions/userAction'
import { useRouter } from 'next/router'

const Cart: NextPage = () => {
    const router = useRouter();
    const [bill,setBill] = useState(0);
const dispatch : any = useDispatch();
let { user } = useSelector((state: any) => state.user)
useEffect(()=>{
    let bill = 0;
    user.cart.forEach((cart : any) => {
        bill += (cart.amount * cart.product.price);
    });
    setBill(bill)
},[user])
  return (
    <>
           <Nav 
              setCategory={null} 
              categories={null} 
              setSearch={null}
              cartPage={true}
            />
            {
                user&& user.cart.length > 0 ? <>
               
           <div className={styles.checkout}>
            <div>
                {`Subtotal: $${bill}`}
            </div>
            <div className={styles.checkoutDiv} onClick={()=>{ 
                dispatch(fetchUser({...user , checkout : bill}))
                router.push({
                    pathname: '/stripe-checkout'
                })
             }}>
                <span className='bi bi-cart-check'></span>
                <span>{`Proceed to checkout`}</span>
            </div>
           </div>
            <div>
                {
                user.cart.map((item : any,index : number , arr : any[])=>{
                        return <div key={index} className={styles.card}>
                            <Image src={item.product.image} width={150} height={150}/>
                            <div className={styles.details}>
                                <h4>{`${item.product.title}`}</h4>
                                <div>{`Number of Items: ${item.amount}`}</div>
                                <div>{`Price per item: ${item.product.price}`}</div>
                                <div>{`Price: ${item.product.price * item.amount}`}</div>
                            </div>
                            <div>
                            <input type="button" value="Remove" className={styles.remove} onClick={()=>{
                                let temp = [...arr];
                                temp.splice(index,1);
                                dispatch(fetchUser({
                                    ...user,
                                    cart : temp
                                }))
                            }}/>
                            </div>
                        </div>
                    })
                }
            </div>
               </> : <div className={styles.empty}>{`Cart is empty`}</div>
            }
    </>
  )
}

export default Cart
