/// <reference types="vite/client" />

interface ImportMeta {
  globEager: (pattern: string) => { [key: string]: { default: string } };
}
