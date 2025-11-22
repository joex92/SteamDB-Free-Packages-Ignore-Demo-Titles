// ==UserScript==
// @name         One-Click Ignore SteamDB Demo Titles
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Adds a button that will automatically ignore all Demo/Prologue Titles
// @author       JoeX92
// @match        https://steamdb.info/freepackages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamdb.info
// @grant        none
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function ignoreDemoTitles() {
        const packages = document.querySelectorAll('.package');
        const games = [];

        packages.forEach(p => {
            const removeLink = p.querySelector(".js-remove");
            if (removeLink) {
                const name = p.childNodes[p.childNodes.length-1].textContent;
                const isDemo = (name.search(/(\s|\()(demo|prologue)(?![a-z])/i) > -1);
                if (isDemo) {
                    games.push(p);
                    removeLink.click();
                    console.log(`Ignored title ${name}`);
                }
            }
        });

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
        if ( chk.checked ) ignoreDemoTitles();
    }, { capture: true });
})();
