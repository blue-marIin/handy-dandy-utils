// ==UserScript==
// @name         (CopyButtons) Copy buttons generator
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Helper function(s) for local scripts inserting product copy buttons
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

import idButtonStyling from './styling/copyProductIdButton.json' assert { type: 'json' };
import nameButtonStyling from './styling/copyProductNameButton.json' assert { type: 'json' };
import divWrapperStyling from './styling/divWrapper.json' assert { type: 'json' };

(function() {
    'use strict';

    window.CopyButtons = {
        scriptTag: '[CopyButtons]',

        IconType: { // enumerated - in the future can be swapped out with desired g fonts icons :O
            CHECK: 'check_small',
            ID: 'pin',
            NAME: 'content_copy'
        },

        /**
         * Creates copy buttons wrapped in a HTML div with given product ID and name values, at a given font size
         * Requires Google Fonts' Material Symbols
         * 
         * @param {string} idValue - Product ID
         * @param {string} nameValue - Product name
         * @param {object} divStyling - Button styling eg: { fontSize: '12px', gap: '1px', top '30%' }
         * @returns {HTMLElement} wrapper div containing both copy buttons
         */
        createCopyButtonsWrapper(idValue, nameValue, divStyling) {
            console.log(`${this.scriptTag} createCopyButtonsWrapper called`); // Keep basic console.log for remote scripts

            idButton = createCopyButton(IconType.NAME, idValue);
            nameButton = createCopyButton(IconType.ID, nameValue);

            const wrapper = document.createElement('div');

            if (typeof divStyling !== 'undefined') Object.assign(wrapper.style, divStyling);
            if (divWrapperStyling) Object.assign(wrapper.style, divWrapperStyling);

            wrapper.appendChild(idBtn);
            wrapper.appendChild(nameBtn);

            return wrapper;
        },

        createCopyButton(type, buttonCopyData) {
            const button = document.createElement('span');

            if (type === IconType.ID) {
                Object.assign(button.style, idButtonStyling);
            } else {
                Object.assign(button.style, nameButtonStyling);
            }

            button.addEventListener('click', () => {
                navigator.clipboard.writeText(buttonCopyData)
                    .then(() => {
                    button.textContent = IconType.CHECK;
                    setTimeout(() => button.textContent = type, 1500);
                });
            });
            return button
        },

        /**
         * Add Google's Material Symbols content_copy & pin icons request to document head tag
         */
        loadGoogleFontsIcons() {
            console.log(`${this.scriptTag} loadGoogleFontsIcons called`);

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${IconType.CHECK},${IconType.NAME},${IconType.ID}`;
            document.head.appendChild(link); // error checking needed?
        }
    };
})();
