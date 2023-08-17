import { getCookie, setCookie } from 'cookies-next';

export const getCurrentTheme = async () => {
  if (typeof window === 'undefined') {
    return import('next/headers').then(({ cookies }) => {
      return cookies().has('theme') ? cookies().get('theme')?.value : 'light';
    });
  }

  return getCookie('theme', { path: '/' });
};

export const toggleTheme = async (theme: string) => {
  setCookie('theme', theme, {
    path: '/'
  });
};
