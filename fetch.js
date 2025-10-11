// ==UserScript==
// @name         (Fetch) Script loading
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Load private scripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.Fetch = {
        scriptTag: 'Fetch',

        loadScript(url) {
            return new Promise((resolve, reject) => {
                const el = document.createElement('script');
                //el.src = url + '?_=' + Date.now(); // cache buster
                el.onload = () => resolve(url);
                el.onerror = reject;
                document.head.appendChild(el);
            });
        }
    }
})();