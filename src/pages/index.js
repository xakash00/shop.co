import Image from 'next/image'
import { Inter } from 'next/font/google'
import { api_url } from '@/redux/apis/fetchHomePage'
import AuthLayout from '@/Components/Layouts/AuthLayout'
import Banner from "../../src/assets/banner.png"
import Brand1 from "../../src/assets/brand1.png"
import Brand2 from "../../src/assets/brand2.png"
import Brand3 from "../../src/assets/brand3.png"
import Brand4 from "../../src/assets/brand4.png"
import Brand5 from "../../src/assets/brand5.png"
import { AppButton, AppText, Heading, ProductCard } from '@/Components/ui-elements'
import Link from 'next/link'
import Meta from '@/Components/Meta'
import { useMediaQuery } from 'react-responsive'
const inter = Inter({ subsets: ['latin'] })

export default function Home(props) {
  const { products } = props.data
  // console.log(products)
  const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1065px)' });

  return (
    <main>
      <Meta
        image={"/home-banner.png"}
        title={"Shop.co"}
        description={"E-commerce app in Next.js"}
      />
      <AuthLayout>
        <section className="'w-full h-[660px]  bg-[#F2F0F1] relative bg-primary-light'">
          <div className='container'>
            <Image layout='fill' className={`absolute ${isTabletOrMobile && "hidden"}`} src={"/home-banner.png"} />
            <div className='flex flex-col gap-8 w-full lg:w-1/2 bg-transparent p-4 py-24 lg:p-24'>
              <Heading type='banner' className='font-bold z-10 font-integral'>
                FIND CLOTHES THAT MATCHES YOUR STYLE
              </Heading>
              <AppText className='z-10 text-[#00000099]'>
                Browse through our diverse range of meticulously crafted garments, designed to bring out your
                individuality and cater to your sense of style.
              </AppText>
              <Link href="/products">
                <AppButton variant='filled' className='z-10 rounded-full px-16 py-4 lg:max-w-60'>
                  Shop Now
                </AppButton>
              </Link>
              <div className='grid z-10 grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='border-r-2 px-[32px] m-auto'>
                  <div className='text-[40px] font-bold'>200+</div>
                  <div className='text-[16px] text-[#00000099] whitespace-nowrap'>International Brands</div>
                </div>
                <div className='border-r-2 px-[32px] m-auto'>
                  <div className='text-[40px] font-bold'>2,000+</div>
                  <div className='text-[16px] text-[#00000099] whitespace-nowrap'>High-Quality Products</div>
                </div>
                <div className='border-r-2 px-[32px] m-auto'>
                  <div className='text-[40px] font-bold'>30,000+</div>
                  <div className='text-[16px] text-[#00000099] whitespace-nowrap'>Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <div className='grid grid-cols-3 items-center justify-center m-auto md:grid-cols-3 lg:grid-cols-5 gap-4 px-[16px]  lg:px-[100px] py-[44px] bg-[black]'>
          <Image className='m-auto w-[133px] h-[33px]' src={Brand1} />
          <Image className='m-auto w-[133px] h-[33px]' src={Brand2} />
          <Image className='m-auto w-[133px] h-[33px]' src={Brand3} />
          <Image className='m-auto w-[133px] h-[33px]' src={Brand4} />
          <Image className='m-auto w-[133px] h-[33px]' src={Brand5} />
        </div>
        <div className='pt-[72px] w-[100%] '>
          <div className='px-[100px] font-bold pb-[55px] text-[48px] w-[100%] text-center align-center font-integral'>New Arrivals</div>
          <div className='grid grid-cols-1 m-auto md:grid-cols-2 lg:grid-cols-4 gap-4 px-[100px]'>
            {
              products?.map((item, index) => {
                return (
                  <ProductCard key={index} data={item} />
                )
              })
            }
          </div>
          <div className='w-[100%] pb-[64px] text-center'>
            <Link href="/products" className='py-[16px] px-[54px] rounded-[62px] border-2 border-[#0000001A]'>View All</Link>
          </div>
        </div>
        {/* <div className=' border-t-2 w-[100%] '>
          <div className='px-[100px] font-bold pt-[64px] pb-[55px] text-[48px] w-[100%] text-center align-center font-integral'>Top selling</div>
          <div className='grid grid-cols-1 m-auto md:grid-cols-1 lg:grid-cols-4 gap-4 px-[100px]'>
            {
              products?.map((item, index) => {
                return (
                  <ProductCard key={index} data={item} />
                )
              })
            }
          </div>
          <div className='w-[100%] pb-[64px] text-center'>
            <a href="/products" className='py-[16px] px-[54px] rounded-[62px] border-2 border-[#0000001A]'>View All</a>
          </div>
        </div> */}
        {/* <div className='px-[100px] '>
          <div className='py-[80px] mb-[80px] rounded-[40px] bg-[#F0F0F0] px-[64px]'>
            <div className='px-[100px] font-bold  pb-[64px] text-[48px] leading-[57px] w-[100%] text-center align-center font-integral'>BROWSE BY dress STYLE</div>
            <div className='flex lg:flex-nowrap md:flex-wrap sm:flex-wrap gap-[16px]'>
              <Image className='w-[407px] h-[289px]' src={Ds2} />
              <Image className='w-[684px] h-[289px]' src={Ds1} />
            </div>
          </div>
        </div> */}

      </AuthLayout>
      {/* {JSON.stringify(props, null, 1)} */}
    </main>
  )
}




export async function getServerSideProps(context) {
  const resp = await fetch(`${api_url}/products?limit=4&skip=0`);
  const data = await resp.json()
  return {
    props: {
      data
    }
  }
  // Rest of `getServerSideProps` code
}