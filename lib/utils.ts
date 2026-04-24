import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function resolveCmsImage(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const cmsPrefixes = ['/images/', '/elite/', '/uploads/'];
  if (cmsPrefixes.some(prefix => url.startsWith(prefix))) {
    const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000';
    return `${cmsUrl}${url}`;
  }
  
  return url;
}
