'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavBarStyles from '@/app/components/navbar/main-navbar.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MrDavisLogo from '@public/MrDavis.png';

export const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={NavBarStyles.NavbarContainer}>
      <div className={NavBarStyles.ImageContainer}>
        <Image alt='logo image' src={MrDavisLogo} width={50} height={50} className={NavBarStyles.ImageLogo} />
        <p>Mr Davis</p>
      </div>
      <NavigationMenu.Root
        orientation='horizontal'
        className={`${NavBarStyles.NavigationMenuRoot} ${isOpen ? NavBarStyles.Open : ''}`}
      >
        <NavigationMenu.List className={NavBarStyles.NavigationMenuList}>
          <NavigationMenu.Item>
            <CustomLink href='/'>Home</CustomLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <CustomLink href='/cv'>CV</CustomLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <CustomLink href='/work-experience'>Work Experience</CustomLink>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <CustomLink href='/blog'>Blog</CustomLink>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
      {/*<button className={NavBarStyles.ToggleButton} onClick={toggleMenu} aria-expanded={isOpen}>*/}
      {/*  {isOpen ? '▲' : '▼'}*/}
      {/*</button>*/}
    </div>
  );
};

const CustomLink: React.FC<React.ComponentProps<typeof Link>> = ({ href, ...props }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link
        href={href}
        className={`${NavBarStyles.NavigationMenuLink} ${isActive ? NavBarStyles.active : ''}`}
        {...props}
      />
    </NavigationMenu.Link>
  );
};
