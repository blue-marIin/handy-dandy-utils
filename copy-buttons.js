// ==UserScript==
// @name         (CopyButtons) Copy buttons generator
// @namespace    https://github.com/blue-marIin/
// @version      1.0
// @description  Helper function(s) for local scripts inserting product copy buttons
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.CopyButtons = {
        scriptTag: '[CopyButtons]',

        IconType: {
            CHECK: 'check_small',
            ID: 'pin',
            NAME: 'content_copy'
        },

        idButtonStyling: {
            "className": "material-symbols-outlined",
            "textContent": `${IconType.ID}`,
            "title": "Copy product ID"
        },

        nameButtonStyling: {
            "className": "material-symbols-outlined",
            "textContent": `${IconType.NAME}`,
            "title": "Copy product name"
        },

        divWrapperStyling: {
            "style.color": "rgba(145, 145, 145, 0.4)",
            "style.cursor": "pointer",
            "style.display": "inline-flex",
            "style.zIndex": "99"
        },

        googleFontsImportLink: `
            https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=
            ${IconType.CHECK},${IconType.NAME},${IconType.ID}
            `,

        /**
         * Creates copy buttons wrapped in a HTML div with given product ID and name values, at a given font size
         * Requires Google Fonts' Material Symbols
         * 
         * @param {string} idValue - Product ID value to be copied
         * @param {string} nameValue - Product name value to be copied
         * @param {object} additionalDivWrapperStyling - Tweak style further, eg: { fontSize: '12px', gap: '1px', top '30%' }
         * @returns {HTMLElement} wrapper div containing both copy buttons
         */
        createCopyButtonsWrapper(idValue, nameValue, divStyling) {
            console.log(`${this.scriptTag} createCopyButtonsWrapper called`); // Keep basic console.log for remote scripts

            idButton = createCopyButton(IconType.NAME, idValue);
            nameButton = createCopyButton(IconType.ID, nameValue);

            const wrapper = document.createElement('div');

            if (divWrapperStyling) Object.assign(wrapper.style, divWrapperStyling);
            if (typeof divStyling !== 'undefined') Object.assign(wrapper.style, divStyling);

            wrapper.appendChild(idBtn);
            wrapper.appendChild(nameBtn);

            return wrapper;
        },

        /**
         * Create button element and assign value, styling and listener
         * @param {string} buttonType 
         * @param {string} buttonCopyData 
         * @returns {HTMLElement}
         */
        createCopyButton(buttonType, buttonCopyData) {
            const button = document.createElement('span');

            if (buttonType === IconType.ID) {
                Object.assign(button.style, idButtonStyling);
            } else {
                Object.assign(button.style, nameButtonStyling);
            }

            button.addEventListener('click', () => {
                navigator.clipboard.writeText(buttonCopyData)
                    .then(() => {
                    button.textContent = IconType.CHECK;
                    setTimeout(() => button.textContent = buttonType, 1500);
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
            link.href = googleFontsImportLink;
            document.head.appendChild(link); // error checking needed? eg: try fetch(link), catch(error)
        }
    };
})();
