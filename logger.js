// ==UserScript==
// @name         (Logger) Script logging utility
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Shared logger utility for other userscripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.Logger = {
        scriptTag: '[Logger]', // This script's own script ID
        // Might be an idea to store all script ID tags in external, centralised location?
        // Would have to be on local server which is subpar

        /**
         * Lightweight console logging helper for userscripts.
         * Usage example:
         *   const log = Logger('[MYSCRIPT]');
         *   log.start();
         *   log.info('Remote script:', remoteScript?.scriptTag);
         *   log.end();
         */
        init(inputScriptTag) {
            const prefix = `%c${inputScriptTag}`;
            const style = 'color: rgba(0, 179, 255, 1); font-weight: bold';
            const group = () => console.groupCollapsed(prefix, style);
            const groupEnd = () => console.groupEnd();

            return {
                start(msg = 'Running') {
                    group();
                    console.log(prefix, style, msg);
                },
                info(...args) {
                    console.log(prefix, style, ...args);
                },
                warn(...args) {
                    console.warn(prefix, style, ...args);
                },
                error(...args) {
                    console.error(prefix, style, ...args);
                },
                end() {
                    groupEnd();
                }
            };
        }
    };

    //console.log('%c[Logger] Loaded', 'color:#0a0; font-weight:bold;');
})();
