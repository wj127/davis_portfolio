'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavBarStyles from '@/app/components/navbar/main-navbar.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MrDavisLogoGIF from '@public/MrDavis2.gif';
import { useObserverApi } from '@/app/hooks/observer-api/use-oberser-api';

// const navBarCallback: IntersectionObserverCallback = (entries) => {
//   if (!entries.at(0)?.isIntersecting) {
//     document.getElementById('root-nav')?.classList.add(NavBarStyles.Shrink);
//   } else document.getElementById('root-nav')?.classList.remove(NavBarStyles.Shrink);
// };

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export const MainNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isShrink, setIsShrink] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navBarRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

  const navBarCallback = useCallback(
    () => (entries: IntersectionObserverEntry[]) => {
      if (!entries.at(0)?.isIntersecting) {
        document.getElementById('root-nav')?.classList.add(NavBarStyles.Shrink);
        setIsShrink(true);
      } else {
        document.getElementById('root-nav')?.classList.remove(NavBarStyles.Shrink);
        setIsShrink(false);
      }
    },
    [],
  );

  useObserverApi({
    observedElements: [sentinelRef],
    callback: navBarCallback(),
    options,
  });

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  useEffect(() => {
    if (!navBarRef.current) return;
    if (navBarRef.current.classList.contains(NavBarStyles.Shrink)) setIsShrink(true);
    else setIsShrink(false);
  }, [navBarRef.current?.classList]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const mustAbbreveate = isShrink && !isHovered;

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />
      <div
        id='root-nav'
        className={NavBarStyles.NavbarContainer}
        ref={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className={NavBarStyles.InnerWrapper}>
          <NavigationMenu.Root
            orientation='horizontal'
            className={`${NavBarStyles.NavigationMenuRoot} ${isOpen ? NavBarStyles.Open : ''}`}
          >
            <NavigationMenu.List className={NavBarStyles.NavigationMenuList}>
              <NavigationMenu.Item>
                <CustomLink href='/' className={NavBarStyles.ImageContainer}>
                  {
                    <>
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
                    </>
                  }
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/cv'>{mustAbbreveate ? 'CV' : 'Curriculum Vitae'}</CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/work-experience'>{mustAbbreveate ? 'WE' : 'Work Experience'}</CustomLink>
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
        {...props}
        className={`${props.className ? props.className : NavBarStyles.NavigationMenuLink} ${isActive ? NavBarStyles.active : ''}`}
      />
    </NavigationMenu.Link>
  );
};
