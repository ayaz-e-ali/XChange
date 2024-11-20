'use client'

import { useEffect, useState } from "react";

export default function ApplyTheme() {
    const [theme, setTheme] = useState('');

    useEffect(() => {
        const theme = window.localStorage.getItem('theme') || '';
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            setTheme('dark');
        }
        else document.documentElement.classList.remove('dark')
    }, []);

    return null
}
