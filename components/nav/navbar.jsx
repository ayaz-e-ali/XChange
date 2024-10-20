import Link from 'next/link';
import ThemeToggle from './ThemeToggle';

export default async function Navbar() {

    return (
        <nav className='md:ml-64 ml-0 p-3 h-16 border-b fixed top-0 w-full md:w-[calc(100%-16rem)] z-10 bg-background'>
            <div className='flex flex-row justify-between container'>
                <Link href={'/'} className='text-3xl font-semibold '>
                    <h1 className='flex items-center gap-1 w-28 child:duration-500 child:stroke-primary child:fill-primary child:w-7 child:h-8 child:transition-colors'>
                        XChange
                    </h1>
                </Link>
                <div className='md:flex hidden justify-center items-center gap-8 '>
                    <p className='flex flex-col items-center hover:text-primary text-primary/70 transition-colors gap-1'>
                        <span className='text-lg font-bold'>
                            شركة لاتشين للصرافة
                        </span>
                    </p>
                    <ThemeToggle />
                </div>
            </div>
        </nav>
    );
}