import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'unplugin-dts/vite';

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: './tsconfig-build.json',
      bundleTypes: {
        extractorConfig: {
          newlineKind: 'lf',
        },
      },
    }),
  ],
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: 'index',
    },
    rolldownOptions: {
      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@base-ui/react',
        /^@base-ui\/react\//,
      ],
    },
    cssCodeSplit: false,
  },
});
