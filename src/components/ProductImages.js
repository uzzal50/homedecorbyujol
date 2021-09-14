import React, { useState } from 'react'
import styled from 'styled-components'

const ProductImages = ({ images = [{ url: '' }] }) => {
  //if images is undefined it just gone be empty array.

  const [mainImage, setMainImage] = useState(images[0])

  return (
    <Wrapper>
      <img src={mainImage.url} alt='main' className='main' />
      {/* <div className='gallery'>
        {images.map((item, index) => {
          return (
            <img
              src={item.url}
              className={`${mainImage.url === item.url ? 'active' : null}`}
              alt={item.filename}
              key={index}
              onClick={() => setMainImage(images[index])}
            /> */}
      {/* )
        })} */}
      {/* </div> */}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .main {
    height: 250px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    box-shadow: 0px 0px 0px 2px var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
