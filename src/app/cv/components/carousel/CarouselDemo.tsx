'use client';

import { Carousel, CarouselSlide } from '@/app/cv/components';
import styles from '@/app/cv/cv.module.scss';

// Example usage of the Carousel component
export const CarouselDemo = () => {
  const demoSlides: CarouselSlide[] = [
    {
      id: 'slide-1',
      content: (
        <div className={styles.yScroll} style={{ color: '#333' }}>
          <h2>First Slide</h2>
          <p>
            This is the first slide content. You can scroll within this content area using the Y-axis scroll
            functionality.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <p>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem
            aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
          </p>
          <p>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
            dolores eos qui ratione voluptatem sequi nesciunt.
          </p>
        </div>
      ),
    },
    {
      id: 'slide-2',
      content: (
        <div className={styles.yScroll} style={{ color: '#555' }}>
          <h2>Second Slide</h2>
          <p>
            This is the second slide with different content. Notice how the up button is now visible and the breadcrumb
            has moved to the second position.
          </p>
          <ul>
            <li>Feature 1: Y-axis sliding animation</li>
            <li>Feature 2: Conditional navigation buttons</li>
            <li>Feature 3: Right-side breadcrumb indicators</li>
            <li>Feature 4: Scrollable content within slides</li>
            <li>Feature 5: Responsive design</li>
          </ul>
          <p>More content here to demonstrate scrolling...</p>
          <p>Additional paragraph to show scroll behavior within the slide content area.</p>
        </div>
      ),
    },
    {
      id: 'slide-3',
      content: (
        <div className={styles.yScroll} style={{ color: '#777' }}>
          <h2>Third Slide</h2>
          <p>This is the final slide. Notice how the down button is now hidden since we&apos;re at the last slide.</p>
          <div style={{ marginTop: '2rem' }}>
            <h3>Key Features Implemented:</h3>
            <ol>
              <li>
                <strong>Y-axis sliding:</strong> Smooth vertical transitions between slides
              </li>
              <li>
                <strong>Conditional buttons:</strong> Up button hidden on first slide, down button hidden on last slide
              </li>
              <li>
                <strong>Right-side breadcrumbs:</strong> Column of indicator dots for navigation
              </li>
              <li>
                <strong>Single slide display:</strong> Only one slide visible at a time
              </li>
              <li>
                <strong>Scrollable content:</strong> Uses the existing styles.yScroll for internal scrolling
              </li>
            </ol>
          </div>
          <p>
            You can click on the breadcrumb dots on the right to jump directly to any slide, or use the navigation
            buttons to go up and down.
          </p>
        </div>
      ),
    },
  ];

  const handleSlideChange = (currentIndex: number) => {
    console.log('Current slide index:', currentIndex);
  };

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <Carousel slides={demoSlides} onSlideChange={handleSlideChange} className='demo-carousel' />
    </div>
  );
};
