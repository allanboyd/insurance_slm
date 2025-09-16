/// <reference types="vite/client" />

// Suppress TypeScript errors
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const content: any;
  export default content;
}

declare module '*.jpg' {
  const content: any;
  export default content;
}

declare module '*.jpeg' {
  const content: any;
  export default content;
}

declare module '*.gif' {
  const content: any;
  export default content;
}

declare module '*.webp' {
  const content: any;
  export default content;
}

declare module '*.ico' {
  const content: any;
  export default content;
}

declare module '*.bmp' {
  const content: any;
  export default content;
}

// Suppress any TypeScript errors
declare const __DEV__: boolean;
declare const __PROD__: boolean;
declare const __TEST__: boolean;

// Global types
declare global {
  interface Window {
    [key: string]: any;
  }
  
  const process: {
    env: {
      [key: string]: any;
    };
  };
}

export {};
