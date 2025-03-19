import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  base: "/react-take-home-exercise/",
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: {
        // Your manifest configuration here
        name: 'Task Manager',
        short_name: 'Tasks',
        description: 'A great task manager',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/react-take-home-exercise/icon192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/react-take-home-exercise/icon.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
});
