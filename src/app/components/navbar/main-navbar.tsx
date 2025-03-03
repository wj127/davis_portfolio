'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavBarStyles from '@/app/components/navbar/main-navbar.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MrDavisLogoGIF from '@public/MrDavis2.gif';
// import MrDavisTransparentLogo from '@public/MrDavis-transparentbg.png';
import { useObserverApi } from '@/app/hooks/observer-api/use-oberser-api';
import { Bruno_Ace_SC } from 'next/font/google';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export const MainNavbar: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, setIsOpen] = useState(true);
  const [isShrink, setIsShrink] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navBarRef = React.useRef<HTMLDivElement>(null);
  const sentinelRef = React.useRef<HTMLDivElement>(null);

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
    <header className={brunoAce.className}>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />
      <nav
        id='root-nav'
        className={`${NavBarStyles.NavBarMain} ${isMobile ? NavBarStyles.NavbarContainerMobile : NavBarStyles.NavbarContainer} ${isExpanded ? NavBarStyles.Expanded : ''}`}
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
              {isMobile && isExpanded && (
                <button className={NavBarStyles.CloseButton} onClick={() => setIsExpanded(false)}>
                  x
                </button>
              )}
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
                      <GlitchText>
                        <i>Mr</i>Davis
                      </GlitchText>
                    </>
                  }
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/cv' isDisabled={isLinkDisabled}>
                  <GlitchText>{mustAbbreviate ? 'CV' : 'Curriculum Vitae'}</GlitchText>
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/work-experience' isDisabled={isLinkDisabled}>
                  <GlitchText>{mustAbbreviate ? 'WE' : 'Work Experience'}</GlitchText>
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/blog' isDisabled={isLinkDisabled}>
                  <GlitchText>Blog</GlitchText>
                </CustomLink>
              </NavigationMenu.Item>
            </NavigationMenu.List>
          </NavigationMenu.Root>
        </div>
      </nav>
    </header>
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

const GlitchText: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <p>
      <span aria-hidden='true'>{children}</span>
      {children}
      <span aria-hidden='true'>{children}</span>
    </p>
  );
};
