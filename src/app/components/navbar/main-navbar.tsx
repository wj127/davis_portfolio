'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import NavBarStyles from '@/app/components/navbar/main-navbar.module.scss';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import MrDavisLogoGIF from '@public/MrDavis2.gif';
import MrDavisTransparentLogo from '@public/MrDavis-transparentbg.png';
import { useObserverApi } from '@/app/hooks/observer-api/use-oberser-api';
import { Bruno_Ace_SC } from 'next/font/google';
import { X, Home, Briefcase, User, BookOpen } from 'lucide-react';

const brunoAce = Bruno_Ace_SC({ weight: '400', subsets: ['latin'] });

const options: IntersectionObserverInit = {
  root: null,
  rootMargin: '0px',
  threshold: 0,
};

export const MainNavbar: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const pathname = usePathname();
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

  const handleMobileToggle = () => {
    if (!isMobile) return;
    setIsExpanded((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsExpanded(false);
  };

  const getActiveLabel = () => {
    switch (pathname) {
      case '/':
        return 'MrD';
      case '/work-experience':
        return 'WE';
      case '/about-me':
        return 'AM';
      case '/blog':
        return 'Blog';
      default:
        return 'Menu';
    }
  };

  // Mobile navbar component
  if (isMobile) {
    return (
      <header className={brunoAce.className}>
        <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />

        {/* Collapsed Mobile Trigger */}
        <button
          className={`${NavBarStyles.MobileTrigger} ${isExpanded ? NavBarStyles.Hidden : ''}`}
          onClick={handleMobileToggle}
          aria-label='Open navigation menu'
        >
          <GlitchText>{getActiveLabel()}</GlitchText>
        </button>

        {/* Expanded Mobile Menu */}
        <nav
          id='root-nav'
          className={`${NavBarStyles.MobileMenuOverlay} ${isExpanded ? NavBarStyles.Visible : ''}`}
          ref={navBarRef}
          role='navigation'
        >
          <div className={NavBarStyles.MobileMenuContent}>
            {/* Close Button */}
            <button className={NavBarStyles.MobileCloseButton} onClick={closeMobileMenu} aria-label='Close navigation menu'>
              <X size={24} strokeWidth={2} />
            </button>

            {/* Logo Section */}
            <div className={NavBarStyles.MobileLogoSection}>
              <LogoImage />
              <GlitchText>
                <i>Mr</i>Davis
              </GlitchText>
            </div>

            {/* Navigation Links */}
            <NavigationMenu.Root orientation='vertical' className={NavBarStyles.MobileNavigationRoot}>
              <NavigationMenu.List className={NavBarStyles.MobileNavigationList}>
                <NavigationMenu.Item>
                  <MobileNavLink href='/' icon={<Home size={20} />} onClick={closeMobileMenu}>
                    <i>Mr</i>Davis
                  </MobileNavLink>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <MobileNavLink href='/work-experience' icon={<Briefcase size={20} />} onClick={closeMobileMenu}>
                    Work Experience
                  </MobileNavLink>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <MobileNavLink href='/about-me' icon={<User size={20} />} onClick={closeMobileMenu}>
                    About Me
                  </MobileNavLink>
                </NavigationMenu.Item>

                <NavigationMenu.Item>
                  <MobileNavLink href='/blog' icon={<BookOpen size={20} />} onClick={closeMobileMenu}>
                    Blog
                  </MobileNavLink>
                </NavigationMenu.Item>
              </NavigationMenu.List>
            </NavigationMenu.Root>
          </div>
        </nav>
      </header>
    );
  }

  // Desktop navbar
  return (
    <header className={brunoAce.className}>
      <div ref={sentinelRef} style={{ position: 'absolute', top: '100px' }} />
      <nav
        id='root-nav'
        className={`${NavBarStyles.NavBarMain} ${NavBarStyles.NavbarContainer}`}
        ref={navBarRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        role='navigation'
      >
        <div className={NavBarStyles.InnerWrapper}>
          <NavigationMenu.Root orientation='horizontal' className={`${NavBarStyles.NavigationMenuRoot} ${isOpen ? NavBarStyles.Open : ''}`}>
            <NavigationMenu.List className={NavBarStyles.NavigationMenuList}>
              <NavigationMenu.Item>
                <CustomLink href='/' className={NavBarStyles.ImageContainer} isDisabled={false}>
                  <LogoImage />
                  <GlitchText>
                    <i>Mr</i>Davis
                  </GlitchText>
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/work-experience' isDisabled={false}>
                  <GlitchText>{mustAbbreviate ? 'WE' : 'Work Experience'}</GlitchText>
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/about-me' isDisabled={false}>
                  <GlitchText>{mustAbbreviate ? 'AM' : 'About Me'}</GlitchText>
                </CustomLink>
              </NavigationMenu.Item>

              <NavigationMenu.Item>
                <CustomLink href='/blog' isDisabled={false}>
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

type MobileNavLinkProps = {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
};

const MobileNavLink: React.FC<MobileNavLinkProps> = ({ href, icon, children, onClick }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <NavigationMenu.Link asChild active={isActive}>
      <Link
        href={href}
        className={`${NavBarStyles.MobileNavLink} ${isActive ? NavBarStyles.active : ''}`}
        onClick={onClick}
      >
        <span className={NavBarStyles.MobileNavIcon}>{icon}</span>
        <GlitchText>{children}</GlitchText>
      </Link>
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

const LogoImage: React.FC = () => {
  const pathname = usePathname();
  const isActive = pathname === '/';

  return (
    <Image
      alt='logo image'
      src={isActive ? MrDavisLogoGIF : MrDavisTransparentLogo}
      width={50}
      height={50}
      unoptimized
      priority
      className={NavBarStyles.ImageLogo}
    />
  );
};
