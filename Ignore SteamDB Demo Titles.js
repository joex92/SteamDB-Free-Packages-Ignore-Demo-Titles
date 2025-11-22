// ==UserScript==
// @name         One-Click Ignore SteamDB Demo Titles
// @namespace    https://github.com/joex92/SteamDB-Free-Packages-Ignore-Demo-Titles
// @version      1.5
// @description  Adds a button that will automatically ignore all Demo/Prologue Titles
// @author       JoeX92
// @match        https://steamdb.info/freepackages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamdb.info
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    
    const sleep = (ms) => new Promise(r => setTimeout(r, ms));
    
    async function ignoreDemoTitles() {
        const packages = document.querySelectorAll('.package');
        const games = [];

        for ( const [i, p] of packages.entries() ) {
            const removeLink = p.querySelector(".js-remove");
            if (removeLink) {
                const name = p.childNodes[p.childNodes.length-1].textContent;
                const isDemo = (name.search(/(\s|\()(demo|prologue)(?![a-z])/i) > -1);
                if (isDemo) {
                    games.push(name);
                    removeLink.click();
                }
            }
            if (i % 100 === 0) {
                await sleep(0);
            }
        }
        
        return games;
    }
    const chk = document.createElement('input');
    chk.type = 'checkbox';
    chk.name = 'option';
    chk.value = 'selected';
    chk.checked = true;
    chk.style.pointerEvents = 'none';
    const activateButton = document.querySelector("#js-activate-now");
    const noDemoButton = document.createElement("button");
    noDemoButton.className = 'btn btn-primary';
    noDemoButton.appendChild(document.createTextNode('Ignore all Demo titles'));
    noDemoButton.appendChild(chk);
    noDemoButton.addEventListener('click', () => {
        chk.checked = !chk.checked;
    }, { capture: true });
    activateButton.parentElement.appendChild(noDemoButton);
    activateButton.addEventListener('click', () => {
        const originalText = activateButton.textContent;
        if ( chk.checked ) {
            noDemoButton.disabled = true;
            activateButton.textContent = `⌛ Ignoring Demo/Prologue Titles`;
            const titles = ignoreDemoTitles();
            console.log("Ignored Titles:", titles);
            noDemoButton.disabled = false;
            activateButton.textContent = originalText;
        }
    }, { capture: true });
})();
