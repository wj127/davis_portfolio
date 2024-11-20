'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavBarStyles from '@/app/components/navbar/main-navbar.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MrDavisLogoGIF from '@public/MrDavis2.gif';
import { useObserverApi } from '@/app/hooks/observer-api/use-oberser-api';

const navBarCallback: IntersectionObserverCallback = (entries) => {
  if (!entries.at(0)?.isIntersecting) {
    document.getElementById('root-nav')?.classList.add(NavBarStyles.Shrink);
  } else document.getElementById('root-nav')?.classList.remove(NavBarStyles.Shrink);
};

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  useObserverApi({
    observedElements: [sentinelRef],
    callback: navBarCallback,
    options,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />
      <div id='root-nav' className={NavBarStyles.NavbarContainer}>
        <div className={NavBarStyles.InnerWrapper}>
          <Link href='/' className={NavBarStyles.ImageContainer}>
            <Image
              alt='logo image'
              src={MrDavisLogoGIF}
              width={50}
              height={50}
              unoptimized
              className={NavBarStyles.ImageLogo}
            />
            <p className={NavBarStyles.TextGlitch}>
              <span aria-hidden='true'>
                <i>Mr</i>Davis
              </span>
              <i>Mr</i>Davis
              <span aria-hidden='true'>
                <i>Mr</i>Davis
              </span>
            </p>
          </Link>
          <NavigationMenu.Root
            orientation='horizontal'
            className={`${NavBarStyles.NavigationMenuRoot} ${isOpen ? NavBarStyles.Open : ''}`}
          >
            <NavigationMenu.List className={NavBarStyles.NavigationMenuList}>
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
        </div>
        {/*<button className={NavBarStyles.ToggleButton} onClick={toggleMenu} aria-expanded={isOpen}>*/}
        {/*  {isOpen ? '▲' : '▼'}*/}
        {/*</button>*/}
      </div>
    </>
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
