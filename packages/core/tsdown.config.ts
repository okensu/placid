import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['./source/index.ts'],
  exports: true,
  minify: true,
  publint: true
});
