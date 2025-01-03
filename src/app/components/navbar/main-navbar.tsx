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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(true);
  const [isShrink, setIsShrink] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navBarRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  // This useEffect is the way to maintain the SSRed HTML equal to the first client render during Hydration, as I'm using resources like window here that is not
  // available in the server side. This way I can avoid the hydration mismatch error.
  useEffect(() => setIsClient(true), []);

  const isMobile = isClient && typeof window !== 'undefined' ? window.innerWidth <= 1024 : false;

  const navBarCallback = useCallback(
    () => (entries: IntersectionObserverEntry[]) => {
      if (isMobile) return;
      if (!entries.at(0)?.isIntersecting) {
        document.getElementById('root-nav')?.classList.add(NavBarStyles.Shrink);
        setIsShrink(true);
      } else {
        document.getElementById('root-nav')?.classList.remove(NavBarStyles.Shrink);
        setIsShrink(false);
      }
    },
    [isMobile],
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

  const mustAbbreviate = (isShrink && !isHovered) || (isMobile && !isExpanded);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isLinkDisabled = isMobile && !isExpanded;

  const onNavbarClickedForMobile = () => {
    if (!isMobile) return;
    if (!isExpanded) setIsExpanded(true);
    else setIsExpanded(false);
  };

  return (
    <>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />
      <nav
        id='root-nav'
        // TODO: Fix by sending nothing on the Server and applying an animation on the client side that will make the navbar appear
        className={`${isMobile ? NavBarStyles.NavbarContainerMobile : NavBarStyles.NavbarContainer} ${isExpanded ? NavBarStyles.Expanded : ''}`}
        ref={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role='navigation'
      >
        <div className={NavBarStyles.InnerWrapper}>
          <NavigationMenu.Root
            orientation={isMobile && isExpanded ? 'vertical' : 'horizontal'}
            className={`${NavBarStyles.NavigationMenuRoot} ${isOpen ? NavBarStyles.Open : ''}`}
            onClick={onNavbarClickedForMobile}
          >
            <NavigationMenu.List className={NavBarStyles.NavigationMenuList}>
              <NavigationMenu.Item>
                <CustomLink href='/' className={NavBarStyles.ImageContainer} isDisabled={isLinkDisabled}>
                  {
                    <>
                      <Image
                        alt='logo image'
                        src={MrDavisLogoGIF}
                        width={50}
                        height={50}
                        unoptimized
                        priority
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
                <CustomLink href='/cv' isDisabled={isLinkDisabled}>
                  {mustAbbreviate ? 'CV' : 'Curriculum Vitae'}
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/work-experience' isDisabled={isLinkDisabled}>
                  {mustAbbreviate ? 'WE' : 'Work Experience'}
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/blog' isDisabled={isLinkDisabled}>
                  Blog
                </CustomLink>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </nav>
    </>
  );
};

const CustomLink: React.FC<React.ComponentProps<typeof Link> & { isDisabled: boolean }> = ({
  href,
  isDisabled,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link
        href={href}
        {...props}
        className={`${props.className ? props.className : NavBarStyles.NavigationMenuLink} ${isActive ? NavBarStyles.active : ''}`}
        {...(isDisabled ? { onClick: (e) => e.preventDefault() } : {})}
      />
    </NavigationMenu.Link>
  );
};
