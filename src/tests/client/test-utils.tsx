import type { ComponentProps, PropsWithChildren, ReactElement } from 'react';
import { render as testingLibraryRender, type RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import defaultMessages from '@messages/en.json';

type IntlProviderProps = ComponentProps<typeof NextIntlClientProvider>;

type CustomRenderOptions = Omit<RenderOptions, 'wrapper'> & {
  locale?: IntlProviderProps['locale'];
  messages?: IntlProviderProps['messages'];
};

function render(
  ui: ReactElement,
  { locale = 'en', messages = defaultMessages, ...renderOptions }: CustomRenderOptions = {},
) {
  function Wrapper({ children }: PropsWithChildren) {
    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    );
  }

  return testingLibraryRender(ui, {
    wrapper: Wrapper,
    ...renderOptions,
  });
}

export * from '@testing-library/react';
export { render };
export type { CustomRenderOptions };
