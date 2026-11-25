import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true,
    watch: {
      // Bật usePolling để khắc phục triệt để lỗi EBUSY (file lock) trên Windows
      usePolling: true,
      interval: 100,
    },
  },
});
