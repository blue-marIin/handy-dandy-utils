// ==UserScript==
// @name         (CopyButtons) Copy buttons generator
// @namespace    https://github.com/blue-marIin/
// @version      2.0
// @description  Helper function(s) for local scripts inserting product copy buttons
// @author       BLUE MARLIN
// @match        -
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const CB_CONSTANTS = {
        buttonCheckTimeout: 1500,

        IconMap: {
            CHECK: 'check_small',
            NAME: 'content_copy',
            HYPER: 'link',
            ID: 'pin'
        },

        buttonOrder: {
            id: 0,
            name: 1,
            hyper: 2
        }
    };

    const googleFontsImportLink = `
        https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=${Object.values(CB_CONSTANTS.IconMap).sort().join()}
    `; // icon_names must be in comma-separated alphabetical order or else import breaks

    const CB_BASE_STYLE = {
        idButton: {
            className: "material-symbols-outlined",
            textContent: CB_CONSTANTS.IconMap.ID,
            title: "Copy product ID",
            style: {
                cursor: "pointer",
                fontSize: "inherit",
                order: CB_CONSTANTS.buttonOrder.id
            }
        },

        nameButton: {
            className: "material-symbols-outlined",
            textContent: CB_CONSTANTS.IconMap.NAME,
            title: "Copy product name",
            style: {
                cursor: "pointer",
                fontSize: "inherit",
                order: CB_CONSTANTS.buttonOrder.name
            }
        },

        hyperButton: {
            className: "material-symbols-outlined",
            textContent: CB_CONSTANTS.IconMap.HYPER,
            title: "Copy hyperlinked product name", // may need to change this
            style: {
                cursor: "pointer",
                fontSize: "inherit",
                order: CB_CONSTANTS.buttonOrder.hyper
            }
        },

        divWrapper: {
            color: "rgba(145, 145, 145, 0.4)",
            display: "inline-flex",
            zIndex: "99"
        }
    };

    // ===== MAIN =====
    window.CopyButtons = {
        scriptTag: '[CopyButtons]',

        /**
         * Create hyperlink ClipboardItem from given URL and text
         * @param {string} url - Hyperlink URL
         * @param {string} text - Display text (generally product name)
         * @returns {ClipboardItem}
         */
        createClipboardItem(url, text) {
            const clipboardItem = new ClipboardItem({
                'text/html': new Blob( // Hypertext
                    [`<a href="${url}">${text}</a>`],
                    { type: 'text/html' }
                ),
                'text/plain': new Blob( // Plaintext fallback - 'Shampoo 500mL: https://shamp-store.com/product/shampoo-500ml'
                    [`${text}: ${url}`],
                    { type: 'text/plain' }
                )
            });

            return clipboardItem;
        },

        /**
         * Create button element and assign value, styling and listener
         * @param {string} type - Type of button to be created. One of: [name, id, hyper]
         * @param {string} data - Value to be copied
         * @param {Partial<CSSStyleDeclaration>} extraStyling - Tweak button styling further
         *      eg: { verticalAlign: 'text-top' }
         * @returns {HTMLButtonElement}
         */
        createCopyButton(type, data, extraStyling) {
            const buttonConfig = CB_BASE_STYLE[`${type}Button`];

            // Create button and assign HTML attributes
            const button = document.createElement('span');
            Object.assign(button, {
                className: buttonConfig.className,
                textContent: buttonConfig.textContent,
                title: buttonConfig.title
            });

            // Assign base CSS style and if it was passed, assign extra styling
            Object.assign(button.style, buttonConfig.style);
            if (extraStyling && typeof extraStyling === 'object') { Object.assign(button.style, extraStyling); }

            // On click: copy data to clipboard, set icon to small check & set timeout to reset icon
            button.addEventListener('click', () => {
                navigator.clipboard.writeText(data)
                    .then(() => {
                        button.textContent = CB_CONSTANTS.IconMap.CHECK;
                        setTimeout(() => button.textContent = buttonConfig.textContent, CB_CONSTANTS.buttonCheckTimeout);
                    });
            });

            return button;
        },

        /**
         * Creates copy buttons wrapped in a HTML div with given product ID and name values, at a given font size
         * Requires Google Fonts' Material Symbols
         *
         * @param {object} productData - { id: '12345', name: 'Product name', hyper: {ClipboardItem} }
         *      Button types to be created, and data to be copied.
         * @param {Partial<CSSStyleDeclaration>} extraDivStyling - Tweak style further for different insertion contexts
         *      eg: { fontSize: '12px', gap: '1px', top '30%' }
         * @returns {HTMLElement} wrapper div containing both copy buttons
         */
        createCopyButtonsWrapper(productData, extraDivStyling) {
            console.log(`${this.scriptTag} createCopyButtonsWrapper called`); // Keep basic console.log for remote scripts

            const wrapper = document.createElement('div');

            // Assign base CSS style and if it was passed, assign extra styling
            Object.assign(wrapper.style, CB_BASE_STYLE.divWrapper);
            if (extraDivStyling && typeof extraDivStyling === 'object') { Object.assign(wrapper.style, extraDivStyling); }

            // Iterate through productData and create buttons for each valid item
            for (const [type, data] of Object.entries(productData)) {
                // Only proceed if productData key is a valid button type ['id', 'name', 'hyper']
                if (Object.keys(CB_CONSTANTS.buttonOrder).includes(type)) {
                    let btn = this.createCopyButton(type, data);
                    wrapper.appendChild(btn);
                } else {
                    console.warn('Unable to create button. Invalid button type:', type, data);
                }
            }

            return wrapper;
        },

        /**
         * Add Google's Material Symbols content_copy, check_small, pin and link icons request to document head tag
         */
        loadGoogleFontsIcons() {
            if (document.querySelector(`link[href="${googleFontsImportLink.trim()}"]`)) return;
            console.log(`${this.scriptTag} loadGoogleFontsIcons called`);

            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = googleFontsImportLink;
            document.head.appendChild(link); // error checking needed? eg: try fetch(link), catch(error)
        }
    };
})();
