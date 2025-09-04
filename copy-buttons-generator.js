// ==UserScript==
// @name         Copy buttons generator
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Helper functions for Umart & MSY scripts
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    function createCopyButtonsWrapper(idValue, nameValue, fontSize) {
        const nameBtn = document.createElement('span');

        nameBtn.className = 'material-symbols-outlined';
        nameBtn.title = 'Copy product name';
        nameBtn.textContent = 'content_copy';
        nameBtn.style.background = 'white';
        nameBtn.style.color = 'rgba(145, 145, 145, 0.4)'
        nameBtn.style.cursor = 'pointer';
        if (typeof fontSize !== 'undefined') nameBtn.style.fontSize = fontSize;
        nameBtn.style.zIndex = '99';

        nameBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(nameValue)
                .then(() => {
                nameBtn.textContent = 'check_small';
                setTimeout(() => nameBtn.textContent = 'content_copy', 1500);
            })
        })

        const idBtn = nameBtn.cloneNode(true);

        idBtn.title = 'Copy product ID';
        idBtn.textContent = 'pin';

        idBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(idValue)
                .then(() => {
                idBtn.textContent = 'check_small';
                setTimeout(() => idBtn.textContent = 'pin', 1500);
            })
        })

        const wrapper = document.createElement('div');
        wrapper.style.display = 'inline-flex';
        wrapper.appendChild(idBtn);
        wrapper.appendChild(nameBtn);

        return wrapper;
    }
})();
