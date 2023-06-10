import Layout from '@/components/Layout';
import Head from 'next/head'
import Image from 'next/image';
import bg from '../public/bg.png';
import Link from 'next/link'
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Layout>
        <main className="">
          <div className='md:flex lg:flex mt-4 '>
            <div>
            <Image className='' width={700} src={bg} alt="space background" quality={100}  />
            </div>
            <div className='m-4 md:pt-28 lg:pt-60 shadow-sm'>
              <h1 className=" text-4xl  sm:text-3xl md:text-2xl lg:text-3xl xl:text-3xl font-bold text-center  p-3">TRACK YOUR TASK DAILY</h1>
              <p className='text-center text-blue-600'>Be Productive daily with Task Traker</p>
              <div className='flex justify-center '>
              <Link href='./signup'><button
              className="  bg-white hover:bg-gray-400 m-2 mb-14 py-1 px-4 rounded-md border-2 hover:text-white">
              Create Free Account
            </button></Link>
              </div>
            </div>
          </div>  
        </main>
        <footer>
          <Footer/>
        </footer>
      </Layout>
    </>
  )
}
