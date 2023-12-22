//const register = require('@babel/register').default;

//register({ extensions: ['.ts', '.tsx', '.js', '.jsx'] });
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

const { window } = new JSDOM('<div id="app"></div>', { url: 'http://localhost' });
const { document } = window;
global.window = window;
global.document = document;