'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { GrPowerReset } from "react-icons/gr";
import { useDispatch, useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { ImEqualizer2 } from "react-icons/im";
import { api_url } from '@/redux/apis/fetchHomePage';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import { searchProducts } from '@/redux/reducers/cartSlice'
import Meta from '@/Components/Meta';
import { GoBackBtn, LoadingSpinner, ProductCard } from '@/Components/ui-elements';


const Products = () => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1065px)' });
    const { searchTerm } = useSelector(store => store.cart);
    const [data, setData] = useState([]);
    const [activeIndex, setActiveIndex] = useState("")
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [bottomBar, setBottomBar] = useState(false)
    console.log(searchTerm)
    const handleOpen = () => { setBottomBar(true) }
    const handleClose = () => { setBottomBar(false) }

    let url = () => {
        if (activeIndex.length > 0) {
            return `${api_url}/products/category/${activeIndex}`
        }
        if (searchTerm.length > 0) {
            return `${api_url}/products/search?q=${searchTerm}`
        }
        else {
            return `${api_url}/products/?limit=${100}&skip=${0}`
        }
    }

    const getCategroies = () => {
        axios.get('https://dummyjson.com/products/categories')
            .then(response => {
                setLoading(false)
                setCategories(response.data)
            }, error => {
                setLoading(false)
                console.log(error);
            });
    }

    useEffect(() => {
        setLoading(true)
        axios.get(url())
            .then(response => {
                setLoading(false)
                setData(response.data?.products);
                getCategroies()
            }, error => {
                setLoading(false)
                console.log(error);
            });
    }, [searchTerm, activeIndex]);



    return (
        <AuthLayout>
            <Meta
                image={"/home-banner.png"}
                title={"Products-Shop.co"}
                description={"E-commerce app in Next.js"}
            />
            <div className='px-[16px] w-full lg:px-[125px]'>
                <GoBackBtn />
                <div className='flex w-full gap-[20px]'>
                    <FilterBar {...{ setActiveIndex, categories, bottomBar, activeIndex, handleClose }} />
                    <div className='lg:w-[80%] md:w-[100%]'>
                        <div className="font-bold z-10 flex items-center justify-between text-[24px] lg:text-[32px]">Products{isTabletOrMobile && <button onClick={handleOpen} className='bg-[#F0F0F0] p-[8px] rounded-[100px]'><ImEqualizer2 size={"13px"} color="#000000" /></button>}</div>
                        {loading === true ? <LoadingSpinner /> : <div className='pt-[16px] grid grid-cols-2 m-auto md:grid-cols-2 lg:grid-cols-3 gap-[20px] '>
                            {
                                data?.map((item, index) => {
                                    return (
                                        <ProductCard key={index} data={item} />
                                        // <div key={index}>hello</div>

                                    )
                                })
                            }
                        </div>
                        }
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}

export default Products


const FilterBar = ({ setActiveIndex, categories, activeIndex, bottomBar, handleClose }) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1065px)' });
    const dispatch = useDispatch()

    return isTabletOrMobile ?
        <div className='py-[24px]'>
            <div className={`fixed w-[95%] h-[100rem] z-20 bg-[white] transition-all  ${bottomBar === true ? "top-[10%]" : "top-[100%]"}`}>
                <div className='font-bold w-[95%] text-[20px] mt-[24px] leading-[27px] border-b-2 pb-[20px] flex items-center justify-between'>Filters
                    <button onClick={() => {
                        setActiveIndex(""); handleClose();
                        dispatch(searchProducts(""))
                    }} className='flex items-center text-[14px] gap-[8px] text-[#063AF5]'><GrPowerReset size={"18px"} color='#063AF5' />Reset</button>
                </div>
                <div className='flex items-center flex-wrap gap-[8px] pt-[20px]'>
                    {categories?.map((item, index) => {
                        return (
                            <button onClick={() => { setActiveIndex(item.slug); handleClose() }} key={index} className={`${activeIndex === item.slug ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#F0F0F0] text-[#00000099]"} capitalize text-[14px]  rounded-[62px] py-[10px] flex justify-center px-[20px]`}>
                                {item.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
        : (
            <div className='border-2 border-[#0000001A] p-[24px]  lg:w-[20%] h-[100%] rounded-[20px]'>
                <div className='font-bold text-[20px] leading-[27px] border-b-2 pb-[20px] flex items-center justify-between'>Filters
                    <button onClick={() => {
                        setActiveIndex(""); handleClose();
                        dispatch(searchProducts(""))
                    }} className='flex items-center text-[14px] gap-[8px] text-[#063AF5]'><GrPowerReset size={"18px"} color='#063AF5' />Reset</button>
                </div>
                <div className='flex items-center flex-wrap gap-[8px] pt-[20px]'>
                    {categories?.map((item, index) => {
                        return (
                            <button onClick={() => { setActiveIndex(item.slug); handleClose() }} key={index} className={`${activeIndex === item.slug ? "bg-[#000000] text-[#FFFFFF]" : "bg-[#F0F0F0] text-[#00000099]"} capitalize text-[14px]  rounded-[62px] py-[10px] flex justify-center px-[20px]`}>
                                {item.name}
                            </button>
                        )
                    })}
                </div>
            </div>
        )
}