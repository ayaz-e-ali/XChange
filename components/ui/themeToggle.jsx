'use client';
import { MoonStar, Sun } from 'lucide-react';
import { Button } from './button';
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
            <Button onClick={handleClick}>
                <p className='dark:hidden'>
                    داكن
                    <MoonStar size={'1.5em'} className='dark:hidden inline m-1' />
                </p>
                <p className='hidden dark:block'>
                    مضيئ
                    <Sun size={'1.5em'} className='dark:inline m-1 inline' />
                </p>
            </Button>
        </>
    );
}