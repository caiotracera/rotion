import { resolve } from 'node:path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import tsconfigPathsPlugin from 'vite-tsconfig-paths';
import tailwindcss from 'tailwindcss';

const tsConfigPaths = tsconfigPathsPlugin({
  projects: [resolve('tsconfig.json')],
});

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths],
    publicDir: resolve('./resources'),
  },
  preload: {
    plugins: [externalizeDepsPlugin(), tsConfigPaths],
  },
  renderer: {
    define: {
      'process.platform': JSON.stringify(process.platform),
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss({
            config: './src/renderer/tailwind.config.js',
          }),
        ],
      },
    },
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [react(), tsConfigPaths],
  },
});
