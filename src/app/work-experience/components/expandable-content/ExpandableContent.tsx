'use client';

import React, { useState, useRef, useEffect } from 'react';
import styles from '@/app/work-experience/components/expandable-content/ExpandableContent.module.scss';
import { ChevronDown, ChevronUp } from 'lucide-react';

type ExpandableContentProps = {
  children: React.ReactNode;
  colour: string;
  maxCollapsedHeight?: number;
  maxExpandedHeight?: number;
  scrollClassName?: string;
  isMobile?: boolean;
};

export const ExpandableContent: React.FC<ExpandableContentProps> = ({
  children,
  colour,
  maxCollapsedHeight = 200,
  maxExpandedHeight = 400,
  scrollClassName = '',
  isMobile = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    const contentHeight = contentRef.current.scrollHeight;
    setNeedsExpansion(contentHeight > maxCollapsedHeight);
  }, [children, maxCollapsedHeight]);

  // Set data-activate-at when expanded changes (for desktop wheel handler)
  useEffect(() => {
    if (!scrollContainerRef.current || isMobile) return;
    if (isExpanded) {
      scrollContainerRef.current.setAttribute('data-visible', 'true');
      scrollContainerRef.current.setAttribute('data-activate-at', String(Date.now() + 250));
    } else {
      scrollContainerRef.current.removeAttribute('data-visible');
      scrollContainerRef.current.removeAttribute('data-activate-at');
    }
  }, [isExpanded, isMobile]);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className={styles.expandableContainer} style={{ color: colour }}>
      {/* Scrollable container for desktop when expanded */}
      <div
        ref={scrollContainerRef}
        className={`${styles.expandableContentWrapper} ${isExpanded ? styles.expanded : ''} ${isExpanded && !isMobile ? scrollClassName : ''}`}
        style={{
          maxHeight: isExpanded ? (isMobile ? 'none' : `${maxExpandedHeight}px`) : `${maxCollapsedHeight}px`,
          overflowY: isExpanded && !isMobile ? 'auto' : 'hidden',
        }}
      >
        <div ref={contentRef}>{children}</div>
      </div>

      {needsExpansion && !isExpanded && (
        <div
          className={styles.fadeOverlay}
          style={{ background: `linear-gradient(to bottom, transparent, currentColor)` }}
        />
      )}

      {needsExpansion && (
        <button className={styles.toggleButton} onClick={toggleExpanded} style={{ color: colour }}>
          {isExpanded ? (
            <>
              <span>Read Less</span>
              <ChevronUp size={18} />
            </>
          ) : (
            <>
              <span>Read More</span>
              <ChevronDown size={18} />
            </>
          )}
        </button>
      )}
    </div>
  );
};
