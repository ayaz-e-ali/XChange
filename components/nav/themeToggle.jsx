'use client';
import { MoonStar, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const theme = window.localStorage.getItem('theme') || '';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
        else document.documentElement.classList.remove('dark')
    }, []);
    
    const handleClick = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', theme === 'dark' ? '' : 'dark');
    };

    return (
        <>
            <Button className='rounded-full aspect-square' size='icon' variant="ghost" onClick={handleClick}>
                <Sun size={'1.5em'} className='hidden dark:block' />
                <MoonStar size={'1.5em'} className='dark:hidden' />
            </Button>
        </>
    );
}