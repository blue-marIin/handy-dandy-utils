// ==UserScript==
// @name         (Fetcher) Script loading
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Load private scripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.Fetcher = {
        scriptTag: '[Fetcher]',

        async loadScript(url) {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                return data
            } catch (error) {
                log.error('Fetch error:', error);
            }
        }
    }
})();