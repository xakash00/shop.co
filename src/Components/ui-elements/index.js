import { cnMerge } from '@/lib/cn-merge';
import Link from 'next/link';
import ReactStars from "react-rating-stars-component";
import Image from 'next/image';
import { FaArrowLeft } from "react-icons/fa";
import { useRouter } from 'next/router';


export function Heading(props) {


    const { as = 'p', type = 'default', className, children, elementRef, ...rest } = props
    const Tag = as

    if (type == 'banner') {
        return (
            <Tag
                className={cnMerge(
                    'font-bold text-[38px] font-integral leading-[34px] lg:text-[64px] lg:leading-[64px] text-[#000000]',
                    className
                )}
                ref={elementRef}
                {...rest}>
                {children}
            </Tag>
        )
    }

    if (type == 'primary') {
        return (
            <Tag
                className={cnMerge(
                    'font-bold text-[32px] leading-[32px] lg:text-[48px] lg:leading-[57.6px] text-[#000000]',
                    className
                )}
                ref={elementRef}
                {...rest}>
                {children}
            </Tag>
        )
    }

    if (type == 'secondary') {
        return (
            <Tag className={cnMerge(className)} ref={elementRef} {...rest}>
                {children}
            </Tag>
        )
    }

    return (
        <Tag
            className={cnMerge(className, 'text-[14px] lg:text-base leading-[22px] font-body')}
            ref={elementRef}
            {...rest}>
            {props.children}
        </Tag>
    )
}


export function AppText(props) {
    const { as = 'p', className, children, ...rest } = props
    const Tag = as

    return (
        <Tag className={cnMerge('font-normal text-base leading-[22px] font-body text-[#00000099]', className)} {...rest}>
            {children}
        </Tag>
    )
}

export function AppButton(props) {
    const { children, className, variant = 'outlined', color = 'black', ...rest } = props

    return (
        <button
            className={cnMerge(
                variant == 'filled' &&
                ((color == 'black' && 'bg-black text-white') || (color == 'success' && 'bg-green-700 text-white')),
                variant == 'outlined' &&
                ((color == 'black' && 'text-black bg-white border border-[#0000001A]') ||
                    (color == 'success' && 'text-green-700 bg-white')),
                'font-body',
                className
            )}
            {...rest}>
            {children}
        </button>
    )
}

export const ProductCard = (props) => {
    const { thumbnail, title, price, rating, id } = props.data;
    return (
        <Link href={`/products/${id}`} className='w-[100%] md:h-200px lg:h-[444px] m-auto overflow-hidden'>
            <div className='overflow-hidden w-[100%] max-md:h-[130px] max-lg:h-[298px] relative rounded-[20px]'>
                <img layout="fill" alt="products" className='w-[100%] transition-all max-md:h-[130px] lg:h-[298px] hover:scale-110  object-contain' src={thumbnail} />
            </div>
            <div className='font-bold md:text-[16px] truncate lg:text-[20px] leading-[27px] pt-[16px]'>{title}</div>
            <div className='flex items-center gap-[13px]'>
                <ReactStars
                    count={5}
                    onChange={(e) => console.log(e)}
                    size={"18px"}
                    isHalf={true}
                    activeColor="#ffd700"
                    value={rating}
                />
                <div className='text-[14px] tracking-[0.75px] '>{rating}/5</div>
            </div>
            <div className='font-bold max-md:text-[16px] lg:text-[24px] leading-[32px] pt-[8px]'>
                ${price}
            </div>
        </Link>
    )
}

export const GoBackBtn = () => {
    const router = useRouter()
    return (
        <button className='flex items-center gap-[8px] py-[16px]' type="button" onClick={() => router.back()}><FaArrowLeft /> Go Back</button>
    )
}

export const LoadingSpinner = () => {
    return (
        <div aria-label="Loading..." role="status" class="flex m-auto w-[250px] my-[20px] text-center items-center space-x-2">
            <svg class="h-20 w-20 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                <line x1="128" y1="32" x2="128" y2="64" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="195.9" y1="60.1" x2="173.3" y2="82.7" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="224" y1="128" x2="192" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="195.9" y1="195.9" x2="173.3" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="128" y1="224" x2="128" y2="192" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
                <line x1="60.1" y1="195.9" x2="82.7" y2="173.3" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="24"></line>
                <line x1="32" y1="128" x2="64" y2="128" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>
                <line x1="60.1" y1="60.1" x2="82.7" y2="82.7" stroke-linecap="round" stroke-linejoin="round" stroke-width="24">
                </line>
            </svg>
            <span class="md:text-[13px] lg:text-[20px] font-medium font-integral text-gray-500">Loading...</span>
        </div>
    )
}