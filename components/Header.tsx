'use client'
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { oswald_700 } from '@/lib/font';// replace with your actual style file path
import HeaderSearchBar from './HeaderSearchBar'; // replace with your actual component file path
import {
  Navbar, NavbarBrand, NavbarContent,
  NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Button
} from "@nextui-org/react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const items = [{ name: 'MOVIES', href: '/movies' }, { name: 'TV-SERIES', href: '/tv-series' }]
  return (
    <Navbar className='bg-transparent' isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen} isBordered
      shouldHideOnScroll isBlurred={false}>

      <NavbarContent className='space-x-3'>
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden">
        </NavbarMenuToggle>
        <NavbarBrand >
          <Link href={'/'}>
            <div className='flex items-center space-x-5'>
              <Image src={'/movie-logo.svg'} height={50} width={50} alt='App Logo' />
              <h1 className={`text-2xl font-bold ${oswald_700.className} text-white`}>MOVIE APP</h1>
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link href={items[0].href} >
            <p className='text-custom-three text-lg hover:text-white'>{items[0].name}</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href={items[1].href} aria-current="page">
            <p className='text-custom-three text-lg hover:text-white'>{items[1].name}</p>
          </Link>
        </NavbarItem>
        <NavbarItem>
          <HeaderSearchBar />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className='bg-custom-one space-y-3'>
        {items.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
        <NavbarMenuItem>
          <HeaderSearchBar setIsMenuOpen={setIsMenuOpen} />
        </NavbarMenuItem>
      </NavbarMenu>

    </Navbar>

  );
};

export default Header;
