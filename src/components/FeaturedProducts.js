import React from 'react'
import { useProductsContext } from '../context/products_context'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'

const FeaturedProducts = () => {
  const {
    products_loading: loading,
    products_error: error,
    featured_Products,
  } = useProductsContext()
  if (loading) {
    return <Loading />
  }
  if (error) {
    return <Error />
  }
  return (
    <Wrapper>
      <section className='section'>
        <div className='title'>
          <h2>featured products</h2>
          <div className='underline'></div>
        </div>
        <div className='section-center featured'>
          {featured_Products.slice(0, 6).map((item) => {
            return <Product key={item.id} {...item} />
          })}
        </div>
        <Link to='products'>
          <button className='btn'>All products</button>
        </Link>
      </section>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 170px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
