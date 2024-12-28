import { defineConfig } from 'vite';
import { exec } from 'child_process';

const noAttr = () => {
  return {
    name: "no-attribute",
    transformIndexHtml(html) {
      return html.replace(`type="module" crossorigin`, "");
    }
  }
}

function buildHtmlPlugin() {
  return {
    name: 'build-html',
    buildStart() {
      return new Promise((resolve, reject) => {
        exec('node build-html.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`build-html.js execution error: ${error}`);
            return reject(error);
          }
          console.log(stdout);
          resolve();
        });
      });
    },
    handleHotUpdate({ file, server }) {
      return new Promise((resolve, reject) => {
        exec('node build-html.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`build-html.js execution error: ${error}`);
            return reject(error);
          }
          console.log(stdout);
          server.ws.send({ type: 'full-reload' });
          resolve();
        });
      });
    },
  };
}

export default defineConfig({
  base: './',
  plugins: [
    buildHtmlPlugin(),
    noAttr()
  ],
  root: '.',
  build: {
    target: 'chrome73',
    outDir: 'dist',
    rollupOptions: {
      output: {
        format: 'iife',
      },
    }
  },
  server: {
    watch: {
      include: ['src/**', 'index.html']
    }
  },
});