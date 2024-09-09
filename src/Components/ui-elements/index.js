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
                <Image priority={true} width={400} height={298} alt={title} className='w-[100%] transition-all max-md:h-[130px] lg:h-[298px] hover:scale-110  object-contain' src={thumbnail} />
            </div>
            <div className='font-bold md:text-[16px] truncate lg:text-[20px] leading-[27px] pt-[16px]'>{title}</div>
            <div className='flex items-center gap-[13px]'>
                <ReactStars
                    count={5}
                    onChange={(e) => console.log(e)}
                    size={"18px"}
                    edit={false}
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
        <div role="status">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span class="sr-only">Loading...</span>
        </div>
    )
}