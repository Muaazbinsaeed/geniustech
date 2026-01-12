import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneNumber(phone: string): string {
  return phone.replace(/\s/g, "");
}

export function getWhatsAppLink(phone: string, message?: string): string {
  const cleanPhone = formatPhoneNumber(phone);
  const baseUrl = `https://wa.me/${cleanPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function getPhoneLink(phone: string): string {
  return `tel:${formatPhoneNumber(phone)}`;
}
