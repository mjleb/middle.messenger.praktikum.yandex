import { JSDOM } from 'jsdom';

// eslint-disable-next-line import/prefer-default-export
export const jsdom = new JSDOM('<body><div id="app"></div></body>', { url: 'http://example.org' });

global.window = jsdom.window;
global.document = jsdom.window.document;
global.FormData = jsdom.window.FormData;
