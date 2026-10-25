import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { expect, test } from 'vitest';
import { render, screen } from '@/tests/client/test-utils';

function Page() {
  const translate = useTranslations('Navbar');

  return (
    <div>
      <h1>Home</h1>
      <Link href='/about'>{translate('aboutMe')}</Link>
    </div>
  );
}

test('Page', () => {
  render(<Page />);
  expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined();
  expect(screen.getByRole('link', { name: 'About Me' })).toBeDefined();
});
