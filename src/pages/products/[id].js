import { useState } from 'react';
import AuthLayout from '@/Components/Layouts/AuthLayout';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ReactStars from "react-rating-stars-component";
import { api_url } from '@/redux/apis/fetchHomePage';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { addItemQuantity, subtractItemQuantity, addToCart } from '@/redux/reducers/cartSlice';
import { GoBackBtn } from '@/Components/ui-elements';
import Head from 'next/head';
import Meta from '@/Components/Meta';
import { toTitleCase } from '@/helpers';
import { useMediaQuery } from 'react-responsive';

const ProductDetails = (props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1065px)' });
    const [currIndex, setCurrIndex] = useState(0)
    const dispatch = useDispatch();
    const { brand, category, description, discountPercentage, id, images, price, rating, stock, thumbnail, title } = props.data
    const { cartItems } = useSelector(store => store.cart);
    const ItemQuantity = cartItems.filter((item) => {
        if (item.id === id) {
            return item
        }
        return null
    })
    return (
        <AuthLayout>
            <Meta
                image={thumbnail}
                title={toTitleCase(title)}
                description={description}
            />
            <div className='px-[16px] lg:px-[125px] mb-[40px]'>
                <GoBackBtn />
                <div className={`${isTabletOrMobile ? "block" : "flex"} m-auto gap-4`}>
                    <div className={`gap-[20px] ${isTabletOrMobile ? "order-2" : "flex order-1"}`}>
                        <div className={`flex gap-[20px] ${isTabletOrMobile ? "m-auto mb-[16px]" : "flex-col"}`}>
                            {
                                images?.slice(0, 3)?.map((item, index) => {
                                    return (
                                        <div onClick={() => setCurrIndex(index)} className={`relative  w-[111px] h-[106px] overflow-hidden rounded-[20px] border-2 ${currIndex === index && "border-[#000]"}`}>
                                            <Image key={index} width={111} height={106} alt="product" className='w-[100%] mix-blend-multiply absolute top-0 bottom-0 m-auto object-contain' src={item} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className={`${isTabletOrMobile ? "order-2  mb-[16px]" : "order-2"}`}>
                            <div className={`m-auto h-[500px] flex overflow-hidden rounded-[20px] border-2`}>
                                <img alt="product" className='w-[100%] object-contain  m-auto' src={images[currIndex]} />
                            </div>
                        </div>
                    </div>
                    <div className='order-3'>
                        <div className='font-bold text-[40px] z-10 font-integral'>{title}</div>
                        <div className='flex items-center gap-[13px]'>
                            <ReactStars
                                count={5}
                                onChange={(e) => console.log(e)}
                                size={"24px"}
                                isHalf={true}
                                activeColor="#ffd700"
                                value={rating}
                            />
                            <div className='text-[14px] tracking-[0.75px] '>{rating}/5</div>
                        </div>
                        <div className='font-bold text-[24px] leading-[32px] pt-[8px]'>
                            ${price}
                        </div>
                        <div className='font-normal text-[16px] text-[#00000099] leading-[22px] pt-[20px]'>
                            {description}
                        </div>
                        <div className='border-t flex items-center gap-[20px] mt-[24px] py-[24px] border-[#0000001A]'>
                            {ItemQuantity?.[0]?.quantity && <div className='flex bg-[#F0F0F0] rounded-[62px] px-[20px] py-[14px] items-center gap-[38px]'>
                                <button onClick={() => dispatch(addItemQuantity(props.data))}><FaPlus /></button>
                                <div className='font-bold text-[16px] leading-[21px]'>{ItemQuantity?.[0]?.quantity}</div>
                                <button onClick={() => dispatch(subtractItemQuantity(props.data))}><FaMinus /></button>
                            </div>}
                            <button onClick={() => dispatch(addToCart(props.data))} className='w-[100%] bg-black text-white rounded-[62px] text-center font-bold px-[20px] py-[14px]'>
                                Add to Cart
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </AuthLayout>
    )
}

export default ProductDetails;


export async function getServerSideProps(context) {
    const id = context.params.id // Get ID from slug `/book/1`
    const resp = await fetch(`${api_url}/products/${id}`);
    const data = await resp.json()
    return {
        props: {
            data
        }
    }
    // Rest of `getServerSideProps` code
}