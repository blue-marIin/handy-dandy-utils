// ==UserScript==
// @name         (01)[EXT]Copy buttons generator
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Helper function(s) for local scripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    console.log('[Remote Script (01)]: Loaded');

    /**
     * Creates copy buttons wrapped in a HTML div with given product ID and name values, at a given font size
     * Requires Google Fonts' Material Symbols
     * 
     * @param {string} idValue - Product ID
     * @param {string} nameValue - Product name
     * @param {string} fontSize - Button font size
     * @returns {HTMLElement} wrapper div containing both copy buttons
     */
    remoteScript01.createCopyButtonsWrapper = function(idValue, nameValue, fontSize) {
        console.log('[Remote Script (01)]: createCopyButtonsWrapper called');

        const nameBtn = document.createElement('span');

        nameBtn.className = 'material-symbols-outlined';
        nameBtn.title = 'Copy product name';
        nameBtn.textContent = 'content_copy';
        //nameBtn.style.background = 'white';
        nameBtn.style.color = 'rgba(145, 145, 145, 0.4)';
        nameBtn.style.cursor = 'pointer';
        if (typeof fontSize !== 'undefined') nameBtn.style.fontSize = fontSize;
        nameBtn.style.zIndex = '99';

        nameBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(nameValue)
                .then(() => {
                nameBtn.textContent = 'check_small';
                setTimeout(() => nameBtn.textContent = 'content_copy', 1500);
            });
        });

        const idBtn = nameBtn.cloneNode(true);

        idBtn.title = 'Copy product ID';
        idBtn.textContent = 'pin';

        idBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(idValue)
                .then(() => {
                idBtn.textContent = 'check_small';
                setTimeout(() => idBtn.textContent = 'pin', 1500);
            });
        });

        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-flex';
        wrapper.appendChild(idBtn);
        wrapper.appendChild(nameBtn);

        return wrapper;
    }

    /**
     * Add Google's Material Symbols content_copy icon request to document head tag
     */
    remoteScript01.loadGoogleFontsIcons = function() {
        console.log('[Remote Script (01)]: loadGoogleFontsIcons called');

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=content_copy'; //:opsz,wght,FILL,GRAD@20..48,400,0,0';
        document.head.appendChild(link); // error checking needed?
    }
})();
