import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductShowcase from "./components/ProductShowcase";

function App() {
    const [products, updateProducts] = useState([])
    const [skipProductsBy, updateSkipProductsBy] = useState(0)
    const [totalNoOfProducts, updateTotalNoOfProducts] = useState(0)
    const [element, updateElement] = useState(null)
    const isProductListEmpty = products.length > 0 && products.length === totalNoOfProducts
    
    const observer = new IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0]
        
        if (isIntersecting) updateSkipProductsBy(prevState => prevState + 5)
    }, { threshold: 1 })
    
    //Get products from API
    useEffect(() => {
        if (isProductListEmpty) return
        
        const getProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products', {
                    params: {
                        limit: 5,
                        skip: skipProductsBy
                    }
                })
                
                const { products: updatedListOfProducts, total } = await response.data
                
                updateTotalNoOfProducts(total)
                updateProducts([...products, ...updatedListOfProducts])
            } catch (error) {
                console.error(`Error occurred while trying to get data from the server!!! ${error}`)
            }
        }
        
        getProducts()
    }, [skipProductsBy])
    
    //Intersection Observer API observes the HTML element
    useEffect(() => {
        const currentElement = element
        
        if (currentElement) observer.observe(currentElement)
        
        return () => {
            if (currentElement) observer.unobserve(currentElement)
        }
    }, [element])
    
    return <>
        <h1 className={"product-heading"}>Products</h1>
        
        <main className={"parent-container"}>
            <section className={"grid-container"}>
                {
                    products.map(({ id, title, thumbnail }, index) => {
                        return <div key={id} ref={ (products.length - 1 === index) ? updateElement : null } className={"product"}>
                            <ProductShowcase productName={title} productImage={thumbnail} />
                        </div>
                    })
                }
            </section>
            
            {
                (isProductListEmpty)
                    ? <div className={"text-style"}>You have seen all the products we have to offer right now!</div>
                    : <div className={"text-style"}>Loading...</div>
            }
        </main>
    </>
}

export default App