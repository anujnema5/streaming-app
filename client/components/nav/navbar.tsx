'use client'
import Link from "next/link"
import { NavigationMenuLink, NavigationMenuList } from "@/components/ui/navigation-menu"
import { authLinks, navLinks } from "@/data/staticData"
import { useDispatch, useSelector } from "react-redux"
import { useLogout } from "@/actions/useAuth"
import dynamic from 'next/dynamic'
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from 'react'

const Button = dynamic(() => import('@/components/ui/button').then((module) => module.Button), {
    loading: () => <Skeleton className="w-[300px] h-[20px] bg-zinc-600 rounded-full" />,
    ssr: false
});

const NavigationMenu = dynamic(() => import('@/components/ui/navigation-menu').then((module) => module.NavigationMenu), {
    loading: () => <Skeleton className="w-[300px] h-[20px] bg-zinc-600 rounded-full" />,
    ssr: false
})

export default function Navbar() {
    const user = useSelector((state: any) => state.user);
    const { handleLogout } = useLogout();

    return (
        <header suppressHydrationWarning className="flex h-28 w-full justify-between !px-10 shrink-0 items-center md:px-6">
            <Link className="mr-6 hidden lg:flex" href="/">
                <div className="flex gap-5 justify-center items-center rounded-full">
                    <MountainIcon className="h-6 w-6" />
                    <span className="text-lg font-semibold">Company name</span>
                </div>
                <span className="sr-only">Company Logo</span>
            </Link>

            <>
                <NavigationMenu className="hidden lg:flex z-0">
                    <NavigationMenuList className="flex gap-8">
                        {navLinks.map((link, i) => (
                            <NavigationMenuLink key={i} asChild>
                                <Link
                                    className="px-5 py-2 ring-1 ring-white/10 hover:bg-white hover:text-gray-800 rounded-full transition-all duration-300 ease-in"
                                    href={link.href}
                                >
                                    {link.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>

                {user?.user === null && <NavigationMenu className="hidden lg:flex z-0">
                    <NavigationMenuList className="flex gap-3">
                        {authLinks.map((link) => (
                            <NavigationMenuLink key={link.href} asChild className="">
                                <Link
                                    className="px-5 py-2 ring-1 ring-white/10 hover:bg-white hover:text-gray-800 transition-all duration-300 ease-in rounded-full"
                                    href={link.href}
                                >
                                    {link.title}
                                </Link>
                            </NavigationMenuLink>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>}

                {user?.user && <Button variant="destructive" onClick={handleLogout}>Logout</Button>}
            </>
        </header>
    )
}


function MountainIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
        </svg>
    )
}
