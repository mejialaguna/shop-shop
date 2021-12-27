import React, { useEffect } from "react";
import { idbPromise } from "../utils/helpers";
import { ADD_ORDER } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import Jumbotron from "../components/Jumbotron";

function Success() {
  const [addOrder] = useMutation(ADD_ORDER);

  useEffect(() => {
    async function saveOrder() {
      const cart = await idbPromise("cart", "get");
      const products = cart.map((items) => {
        return items._id;
      });
    //   console.log(products);
      if (products.length) {
        const { data } = await addOrder({ variables: { products } });
        const productData = data.addOrder.products;
        
        productData.forEach((item) => {
          idbPromise("cart", "delete", item);
        });
        }
        setTimeout(() => {
           window.location.assign("/") 
        }, 3000);
    }

    saveOrder();
  }, [addOrder]);
  return (
    <div>
      <Jumbotron>
        <h1> Success!</h1>
        <h2>thank you for your purchase!</h2>
        <h2>You will be redirected to the homepage</h2>
      </Jumbotron>
    </div>
  );
}

export default Success;
