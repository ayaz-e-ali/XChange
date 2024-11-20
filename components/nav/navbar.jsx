import Link from 'next/link';
import { getApp } from '@/actions/app';
import PageLabel from './PageLabel';

export default async function Navbar() {
    const app = await getApp()

    return (
        <nav className='md:ml-56 ml-0 p-3 h-16 border-b fixed top-0 w-full md:w-[calc(100%-16rem)] z-10 bg-background'>
            <div className='flex flex-row justify-between container'>
                <Link href={'/dashboard'} className='text-3xl font-semibold '>
                    <h1 className='child:duration-500 child:stroke-primary child:fill-primary child:h-8 child:transition-colors'>
                        XChange<span className="text-[0.6rem] whitespace-nowrap">{app.version}</span>
                    </h1>
                </Link>
                <PageLabel />
                <div className='md:flex hidden justify-center items-center gap-8 '>
                    <p className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
                        <span className='text-lg font-bold'>
                            {app.marketName}
                        </span>
                    </p>
                </div>
            </div>
        </nav>
    );
}