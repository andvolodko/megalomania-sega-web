import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Relative base ensures seamless operation on GitHub Pages (https://<user>.github.io/<repo>/) and locally
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
});
