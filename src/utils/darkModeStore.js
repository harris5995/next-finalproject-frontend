import { writable } from 'svelte/store';

export const isDarkMode = writable(false);

export function toggleDarkMode() {
    isDarkMode.update(value => !value);
  }