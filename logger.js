// ==UserScript==
// @name         (Logger)Script logging utility
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Shared logger utility for other userscripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    /**
     * Lightweight console logging helper for userscripts.
     * Usage example:
     *   const log = Logger('[MYSCRIPT]');
     *   log.start();
     *   log.info('Remote script:', remoteScript?.scriptTag);
     *   log.end();
     */
    window.Logger = function(scriptTag) {
        const prefix = `%c${scriptTag}`;
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
            },
            checkGM(...names) {
                // Utility to log GM_* grants
                names.forEach(n => {
                    const available = typeof window[n] !== 'undefined';
                    console.log(prefix, style, `${n}: ${available ? '✅ available' : '❌ missing'}`);
                });
            }
        };
    };

    //console.log('%c[Logger] Loaded', 'color:#0a0; font-weight:bold;');
})();
