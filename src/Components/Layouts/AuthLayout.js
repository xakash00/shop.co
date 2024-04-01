'use client'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from 'react-responsive'
import { GiHamburgerMenu } from "react-icons/gi"
import Footer from '../Footer'
import { CartIcon, SearchIcon } from '@/svgs'
import useDeboucedFn from '@/hooks/useDeboucedFn'
import Layout from './animateLayout'
import { searchProducts } from '@/redux/reducers/cartSlice'

const AuthLayout = ({ children }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1065px)' });
    const { quantity } = useSelector(store => store.cart);
    const [search, setSearch] = useState("")
    const [sidebar, setSidebar] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch();

    const searching = useDeboucedFn((value) => {
        dispatch(searchProducts(value))
    })

    return (
        <>
            {!isTabletOrMobile ? <header>
                <div className='bg-black h-38 p-2 text-white text-center w-auto'>
                    <div> Sign up and get 20% off to your first order. Sign Up Now</div>
                </div>
                <nav className="bg-white border-gray-200 py-[24px] px-[100px] ">
                    <div className="flex flex-wrap gap-[40px]  items-center mx-auto max-w-screen-xl">
                        <Link href="/" className="flex items-center">
                            <span className="self-center text-xl whitespace-nowrap text-[#00000] text-[32px] font-integral font-bold">SHOP.CO</span>
                        </Link>
                        <div className="flex gap-[24px] items-center ">
                            <Link href="/products" className='text-[#000] text-[16px] font-[400]'>Shop</Link>
                            <div className='text-[#000] text-[16px] font-[400]'>On Sale</div>
                            <div className='text-[#000] text-[16px] font-[400]'>New Arrivals</div>
                            <div className='text-[#000] text-[16px] font-[400]'>Brands</div>
                        </div>
                        <div className='w-[577px] gap-[12px] px-[16px] py-[12px] rounded-[62px] flex items-center bg-[#F0F0F0]'>
                            <SearchIcon />
                            {router.pathname === "/" ?
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    searching(search)
                                    router.push("/products")
                                }}>
                                    <input
                                        onChange={(e) => {
                                            const { value } = e.target
                                            setSearch(value)
                                        }}
                                        className='w-[100%] bg-transparent focus:outline-none' />
                                </form>
                                : <input onChange={(e) => { searching(e.target.value) }} className='w-[100%] bg-transparent focus:outline-none' />}
                        </div>
                        <Link href="/cart" className='flex gap-[12px] items-center'>
                            <div className='relative'><CartIcon />
                                <div className='bg-black  text-white rounded-[100%] top-[-30px] right-[-12px] relative w-[16px] h-[16px] text-center font-bold text-[10px]'><div className='absolute top-0 bottom-0 text-center w-[100%] m-auto'>{quantity}</div></div>
                            </div>
                        </Link>
                    </div>
                </nav>
            </header> :

                <header>
                    <div className={`fixed w-[50%] h-[100rem] z-20 bg-[white] transition-all  ${sidebar ? "right-[0%]" : "right-[-100%]"}`}>
                        <div className="m-auto w-[100%] p-[16px]">
                            <div className='text-[#000] text-[16px] font-[400]'>Shop</div>
                            <div className='text-[#000] text-[16px] font-[400]'>On Sale</div>
                            <div className='text-[#000] text-[16px] font-[400]'>New Arrivals</div>
                            <div className='text-[#000] text-[16px] font-[400]'>Brands</div>
                        </div>
                    </div>
                    <div className='bg-black h-38 p-2 text-[12px]  text-white text-center w-auto'>
                        <div> Sign up and get 20% off to your first order. Sign Up Now</div>
                    </div>
                    <nav className="bg-white flex items-center justify-between border-gray-200 py-[20px] px-[16px]">
                        <div className='flex items-center gap-[16px]'>
                            <button onClick={() => setSidebar(!sidebar)}><GiHamburgerMenu size={'24px'} /></button>
                            <a href="/" className="flex items-center">
                                <span className="self-center text-xl whitespace-nowrap text-[#00000] text-[32px] font-integral font-bold">SHOP.CO</span>
                            </a>
                        </div>
                        <div className='flex items-center gap-[12px]'>
                            <Link href="/cart" className='flex gap-[12px] items-center'>
                                <div className='relative'><CartIcon />
                                    <div className='bg-black  text-white rounded-[100%] top-[-30px] right-[-12px] relative w-[16px] h-[16px] text-center font-bold text-[10px]'><div className='absolute top-0 bottom-0 text-center w-[100%] m-auto'>{quantity}</div></div>
                                </div>
                            </Link>
                        </div>
                    </nav>

                </header>
            }

            <>{children}</>
            <Footer />
        </>
    )
}

export default AuthLayout