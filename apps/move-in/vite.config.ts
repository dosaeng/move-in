import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const projectRootDir = path.resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@/", replacement: `${path.join(projectRootDir, 'src')}/` },
    ]
  },
})
