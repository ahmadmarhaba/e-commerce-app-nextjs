import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux';
import styles from '../styles/Nav.module.css'

const Nav  = ({categories , setCategory , setSearch ,cartPage} : any) => {
    const router = useRouter();
    let { user } = useSelector((state: any) => state.user)
  return (
    <>
      <Head>
        <title>E-Commerce App</title>
        <meta name="description" content="E-Commerce App testing" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.nav }>
        {
            categories ? <>
        <select  onChange={(e)=>{ 
          setCategory(e.target.value)
        }}>
          <option value={"all"}>{`All`}</option >
        {
          categories.map((item : any , index : number)=>{
            return (
              <option  key={index} value={item}>
                {item}
              </option >
            )
          })
        }
        </select>
        <input type="text" placeholder='Search here...' onChange={(e)=>{ setSearch(e.target.value.trim().toLowerCase()) }}/>
            </>
            : <div className={styles.button} onClick={()=>{ router.push({
                pathname: '/'
            })}}>
                <span className='bi bi-arrow-left'></span>
                <span>Return to Home</span>
            </div>
        }
        {
          !cartPage && <div className={styles.button} onClick={()=>{ router.push({
                    pathname: '/Cart'
                })}}>
                    <span className='bi bi-cart2'></span>
                    <span>Cart</span>
                    {
                    user && user.cart.length > 0 && <span>{`(${user.cart.length})`}</span>
                    }
                    
                </div>
        }
      </div>
    </>
  )
}

export default Nav
