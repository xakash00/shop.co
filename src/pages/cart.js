import AuthLayout from '@/Components/Layouts/AuthLayout'
import { AppButton, GoBackBtn, Heading } from '@/Components/ui-elements'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux'
import { addItemQuantity, removeFromCart, subtractItemQuantity } from '@/redux/reducers/cartSlice'
import Link from 'next/link'

const Cart = () => {
    const { cartItems, totalAmount } = useSelector(store => store.cart);
    const dispatch = useDispatch();

    return (
        <AuthLayout>
            <Head>
                <title>Cart | SHOP.CO</title>
                <meta name='title' content='Cart | SHOP.CO' />
            </Head>
            <div className='w-full px-[16px] lg:px-[125px] mb-[40px]'>
                <GoBackBtn />
                <Heading type='primary'>Your Cart</Heading>
                {cartItems.length > 0 ? <div className='grid lg:grid-cols-9 gap-4 mt-6'>
                    <div className='lg:col-span-5 border border-[#0000001A] rounded-lg px-4 divide-y-2'>
                        {cartItems.map((item, index) => {
                            return (
                                <div key={item.id} className='flex gap-[16px] py-4 relative'>
                                    <div className='overflow-hidden w-[124px] rounded-[8px]'>
                                        <Image className='w-[124px] transition-all hover:scale-110 h-[124px] object-contain rounded-[8px]' src={item.thumbnail} alt='' width='124' height='124' />
                                    </div>
                                    <div className='flex flex-col justify-between w-full'>
                                        <div>
                                            <h4 className='font-bold text-4 lg:text-[20px] leading-[27px]'>{item.title}</h4>
                                            <span className='text-[14px] text-[#000000]'>
                                                Size: <span className='text-[14px] text-[#00000099]'>Large</span>
                                            </span>
                                        </div>
                                        <div className='flex justify-between'>
                                            <p className='font-bold text-[24px] leading-[32px]'></p>
                                            {<div className='flex bg-[#F0F0F0] rounded-[62px] px-[20px] py-[14px] items-center gap-[20px]'>
                                                <button onClick={() => dispatch(addItemQuantity(item))}><FaPlus size='10px' /></button>
                                                <div className='font-bold text-[13px] leading-[21px]'>{item.quantity}</div>
                                                <button onClick={() => dispatch(subtractItemQuantity(item))}><FaMinus size='10px' /></button>
                                            </div>}
                                        </div>
                                    </div>
                                    <button onClick={() => dispatch(removeFromCart(item))} className='absolute right-0 top-4' >
                                        <svg
                                            width='24'
                                            height='24'
                                            viewBox='0 0 24 24'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M20.25 4.50006H16.5V3.75006C16.5 3.15332 16.2629 2.58103 15.841 2.15907C15.419 1.73711 14.8467 1.50006 14.25 1.50006H9.75C9.15326 1.50006 8.58097 1.73711 8.15901 2.15907C7.73705 2.58103 7.5 3.15332 7.5 3.75006V4.50006H3.75C3.55109 4.50006 3.36032 4.57908 3.21967 4.71973C3.07902 4.86038 3 5.05115 3 5.25006C3 5.44897 3.07902 5.63974 3.21967 5.78039C3.36032 5.92104 3.55109 6.00006 3.75 6.00006H4.5V19.5001C4.5 19.8979 4.65804 20.2794 4.93934 20.5607C5.22064 20.842 5.60218 21.0001 6 21.0001H18C18.3978 21.0001 18.7794 20.842 19.0607 20.5607C19.342 20.2794 19.5 19.8979 19.5 19.5001V6.00006H20.25C20.4489 6.00006 20.6397 5.92104 20.7803 5.78039C20.921 5.63974 21 5.44897 21 5.25006C21 5.05115 20.921 4.86038 20.7803 4.71973C20.6397 4.57908 20.4489 4.50006 20.25 4.50006ZM10.5 15.7501C10.5 15.949 10.421 16.1397 10.2803 16.2804C10.1397 16.421 9.94891 16.5001 9.75 16.5001C9.55109 16.5001 9.36032 16.421 9.21967 16.2804C9.07902 16.1397 9 15.949 9 15.7501V9.75006C9 9.55115 9.07902 9.36038 9.21967 9.21973C9.36032 9.07908 9.55109 9.00006 9.75 9.00006C9.94891 9.00006 10.1397 9.07908 10.2803 9.21973C10.421 9.36038 10.5 9.55115 10.5 9.75006V15.7501ZM15 15.7501C15 15.949 14.921 16.1397 14.7803 16.2804C14.6397 16.421 14.4489 16.5001 14.25 16.5001C14.0511 16.5001 13.8603 16.421 13.7197 16.2804C13.579 16.1397 13.5 15.949 13.5 15.7501V9.75006C13.5 9.55115 13.579 9.36038 13.7197 9.21973C13.8603 9.07908 14.0511 9.00006 14.25 9.00006C14.4489 9.00006 14.6397 9.07908 14.7803 9.21973C14.921 9.36038 15 9.55115 15 9.75006V15.7501ZM15 4.50006H9V3.75006C9 3.55115 9.07902 3.36038 9.21967 3.21973C9.36032 3.07908 9.55109 3.00006 9.75 3.00006H14.25C14.4489 3.00006 14.6397 3.07908 14.7803 3.21973C14.921 3.36038 15 3.55115 15 3.75006V4.50006Z'
                                                fill='#FF3333'
                                            />
                                        </svg>
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                    <div className='lg:col-span-4 border border-[#0000001A] rounded-lg px-4 divide-y-2'>
                        <div className='py-4'>
                            <h4 className='font-bold text-2xl leading-8 mb-6'>Order Summary</h4>
                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between'>
                                    <span className='text-[#00000099]'>Subtotal</span>
                                    <span className='font-bold text-[20px] leading-[27px]'>${totalAmount}</span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-[#00000099]'>Discount (-20%)</span>
                                    <span className='font-bold text-[20px] leading-[27px] text-[#FF3333]'>
                                        {totalAmount * 20 / 100}
                                    </span>
                                </div>
                                <div className='flex justify-between'>
                                    <span className='text-[#00000099]'>Delivery Fee</span>
                                    <span className='font-bold text-[20px] leading-[27px]'>$15</span>
                                </div>
                            </div>
                        </div>

                        <div className='py-4'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between'>
                                    <span className='text-[#00000099]'>Total</span>
                                    <span className='font-bold text-[24px] leading-[32px]'>
                                        ${totalAmount - totalAmount * 20 / 100}
                                    </span>
                                </div>
                                <div className='flex justify-between gap-4 max-md:flex-wrap'>
                                    <input
                                        className='flex-1 rounded-full bg-[#F0F0F0] h-12 px-4'
                                        placeholder='Add promo code'
                                    />
                                    <AppButton className='h-12 bg-black rounded-full text-white px-8 max-md:w-full'>
                                        Apply
                                    </AppButton>
                                </div>
                                <AppButton className='h-12 bg-black rounded-full text-white px-8 flex items-center justify-center gap-3'>
                                    Go to Checkout{' '}
                                    <span>
                                        <svg
                                            width='20'
                                            height='20'
                                            viewBox='0 0 20 20'
                                            fill='none'
                                            xmlns='http://www.w3.org/2000/svg'>
                                            <path
                                                d='M11.9133 3.71169L17.5383 9.33669C17.6257 9.42379 17.695 9.52728 17.7423 9.64124C17.7897 9.75519 17.814 9.87737 17.814 10.0008C17.814 10.1241 17.7897 10.2463 17.7423 10.3603C17.695 10.4742 17.6257 10.5777 17.5383 10.6648L11.9133 16.2898C11.7372 16.4659 11.4983 16.5649 11.2492 16.5649C11.0001 16.5649 10.7613 16.4659 10.5852 16.2898C10.409 16.1137 10.3101 15.8748 10.3101 15.6258C10.3101 15.3767 10.409 15.1378 10.5852 14.9617L14.6094 10.9375L3.125 10.9375C2.87636 10.9375 2.6379 10.8387 2.46209 10.6629C2.28627 10.4871 2.1875 10.2486 2.1875 9.99997C2.1875 9.75133 2.28627 9.51288 2.46209 9.33706C2.6379 9.16125 2.87636 9.06247 3.125 9.06247L14.6094 9.06247L10.5844 5.03826C10.4083 4.86214 10.3093 4.62326 10.3093 4.37419C10.3093 4.12512 10.4083 3.88625 10.5844 3.71013C10.7605 3.53401 10.9994 3.43506 11.2484 3.43506C11.4975 3.43506 11.7364 3.53401 11.9125 3.71013L11.9133 3.71169Z'
                                                fill='white'
                                            />
                                        </svg>
                                    </span>
                                </AppButton>
                            </div>
                        </div>
                    </div>
                </div> : <div className='flex flex-col items-center justify-center'>
                    <Heading type="primary" className="text-center">Your cart is empty</Heading>
                    <Link href="/products">
                        <AppButton variant='filled' className='z-10 m-auto  mt-[20px] rounded-full px-16 py-4 '>
                            Shop Now
                        </AppButton>
                    </Link>
                </div>
                }
            </div>
        </AuthLayout>
    )
}

export default Cart