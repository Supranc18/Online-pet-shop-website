import React, { useEffect, useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeQuantity } from '../../redux/slice/cartSlice';

export default function Cart() {


  const dispatch = useDispatch();
  const baseURL = 'http://localhost:8000';

    const reduxCart = useSelector((store) => store.cart.value);
    const [quantity, setQuantity] = useState([]);

    useEffect(() => {
        setQuantity(reduxCart.map((item) => item.quantity));
    }, [reduxCart]);

    function clearCart() {
        localStorage.removeItem('cart');
        dispatch(setLocalCart([]));
    }

    function orderCheckout() {
        
    }

   
    const subtotal = reduxCart.reduce((acc, item, index) => acc + item.price * quantity[index], 0);
    const deliveryCharge = 100; 
    const total = subtotal + deliveryCharge;
  return (
    <>
    <div className='bg-[#F6F5FF] py-[70px]'>
        <div className='container'>
            <h1 className='text-primary-dark text-[2rem] font-[700]'>Shopping Cart</h1>
            <div className='flex gap-1'>
                <p>Home .</p>
                <p>Pages .</p>
                <p className='text-secondary'>Shopping Cart</p>
            </div>
        </div>
    </div>
    <div className='container flex justify-between'>
        <div className='w-[100%]'>
            {reduxCart.length === 0 ? (
                <div className='container px-[auto] my-5 flex justify-center'>
                    <p className='p-5 text-[2.5rem]'>Your cart is empty</p>
                </div>
            ) : (
                <>
                    <table className='container my-8'>
                        <thead className='text-[#1D3178]'>
                            <tr>
                                <th className='text-start'>Products</th>
                                <th className='text-start'>Products name</th>
                                <th className='text-start'>Price</th>
                                <th className='text-start'>Quantity</th>
                                <th className='text-start'>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reduxCart.map((el, index) => (
                                <tr className='border-b-2' key={el._id}>
                                    <td className='py-4'>
                                        <img src={`${baseURL}${el.image}`} alt={el.name} className='w-24 h-24' />
                                    </td>
                                    <td>{el.name}</td>
                                    <td>Rs.{el.price}</td>
                                    <td>
                                        <button
                                            type='button'
                                            className='border border-black px-2 mx-1'
                                            onClick={() => {
                                                dispatch(
                                                    changeQuantity({
                                                        _id: el._id,
                                                        type: "decrement"
                                                    })
                                                );
                                            }}
                                        >
                                            -
                                        </button>
                                        {quantity[index]}
                                        <button
                                            type='button'
                                            className='border border-black px-2 mx-1'
                                            onClick={() => {
                                                dispatch(
                                                    changeQuantity({
                                                        _id: el._id,
                                                        type: "increment"
                                                    })
                                                );
                                            }}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td>Rs.{el.price * quantity[index]}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className='container flex flex-col items-start justify-start'>
                        <hr className='border text-black' />
                        <div className='flex justify-between w-[100%] my-5'>
                            <button className='bg-[#FB2E86] text-[white] px-[16px]'>
                                <Link to={'/products'}>Update cart</Link>
                            </button>
                            <button onClick={clearCart} className='bg-[#FB2E86] text-[white] px-[16px] py-1'>
                                Clear Cart
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
        {reduxCart && reduxCart.length > 0 ? (<div className='w-[40%] flex items-center flex-col gap-6 my-10'>
            <p className='text-[#1D3178] text-[17px] font-[700]'>Cart Totals</p>
            <div className='p-4 bg-[#F4F4FC] w-[90%] text-[#1D3178] font-[600] flex flex-col'>
                <div className='flex justify-between border-b-[1.5px] py-2'>
                    <p>Subtotals:</p>
                    <p>Rs.{subtotal}</p>
                </div>
                <div className='flex justify-between border-b-[1.5px] py-2'>
                    <p>Delivery charge:</p>
                    <p>Rs.{deliveryCharge}</p>
                </div>
                <div className='flex justify-between border-b-[1.5px] py-2'>
                    <p>Totals:</p>
                    <p>Rs.{total}</p>
                </div>
                <div className='gap-1 flex items-center py-2'>
                    <FaCheck className='w-[10px] h-[10px] p-[2.8px] bg-[#19D16F] rounded-[4px] text-white'/>
                    <p className='text-[7px]'>Shipping & taxes calculated at checkout</p>
                </div>
                <button onClick={orderCheckout} className='bg-[#19D16F] text-white my-2 py-2 text-[10px]'>Proceed To Checkout</button>
            </div>
        </div>): null}
        
    </div>
</>
  )
}
