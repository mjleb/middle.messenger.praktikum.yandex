import {resolve}  from 'path';
import { defineConfig} from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcss from 'postcss';
import page from './src/layout/main/index.js';
import modal from './src/utils/handlebars_helpers/modal.ts';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
      helpers:{
        page,
        modal
      },
      context:{
        global: 'global'
      } 
    }),
  ],
  build:{
    rollupOptions:{
      input:{
        index: resolve(__dirname,'index.html'),
        login: resolve(__dirname,'src/pages/auth/login.html'),
        signin: resolve(__dirname,'src/pages/auth/signin.html'),
        profile: resolve(__dirname,'src/pages/profile/index.html'),
        profile_edit: resolve(__dirname,'src/pages/profile/edit.html'),
        profile_edit_password: resolve(__dirname,'src/pages/profile/edit_password.html'),

        e404: resolve(__dirname,'src/pages/errors/404.html'),
        e500: resolve(__dirname,'src/pages/errors/500.html'),
      }
    }
  },
  server: {
    port: 3000,
    open: "index.html"
  },
}) 
