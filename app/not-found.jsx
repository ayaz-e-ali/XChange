'use client';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function NotFoundPage() {
    const router = useRouter();

    return <div className='flex flex-col gap-6 items-center justify-center h-screen'>
        <p className='text-3xl font-bold'>{"¯\\_(ツ)_/¯"}</p>
        <p className='text-7xl font-bold'>404</p>
        <p className='text-center text-2xl max-w-3xl text-primary/80'>
            Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has been moved to another URL.
        </p>
        <div className="space-x-6">
            <Button size='lg' onClick={() => { router.push('/dashbard'); }}>go to Home</Button>
        </div>
    </div>;
}