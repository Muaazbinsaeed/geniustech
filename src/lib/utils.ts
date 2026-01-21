import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Validates if a phone number is in a valid format
 */
export function isValidPhoneNumber(phone: string | undefined | null): boolean {
  if (!phone || typeof phone !== "string") return false;
  // Remove spaces and check if it's a valid phone format (starts with + and has digits)
  const cleaned = phone.replace(/[\s\-()]/g, "");
  return /^\+?[1-9]\d{6,14}$/.test(cleaned);
}

export function formatPhoneNumber(phone: string): string {
  if (!phone || typeof phone !== "string") return "";
  return phone.replace(/[\s\-()]/g, "");
}

export function getWhatsAppLink(phone: string, message?: string): string {
  if (!isValidPhoneNumber(phone)) {
    console.warn("Invalid phone number provided to getWhatsAppLink:", phone);
    return "#"; // Return safe fallback
  }
  const cleanPhone = formatPhoneNumber(phone);
  const baseUrl = `https://wa.me/${cleanPhone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export function getPhoneLink(phone: string): string {
  if (!isValidPhoneNumber(phone)) {
    console.warn("Invalid phone number provided to getPhoneLink:", phone);
    return "#"; // Return safe fallback
  }
  return `tel:${formatPhoneNumber(phone)}`;
}

/**
 * Safely get an array from translation, returns empty array if undefined
 */
export function safeArray<T>(value: T[] | undefined | null): T[] {
  return Array.isArray(value) ? value : [];
}
