import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@ffmpeg/utils": "@ffmpeg/utils", // ✅ fixed typo (was @ffmpeg/utisl)
    },
  },
});
