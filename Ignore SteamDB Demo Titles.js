// ==UserScript==
// @name         One-Click Ignore SteamDB Demo Titles
// @namespace    https://github.com/joex92/SteamDB-Free-Packages-Ignore-Demo-Titles
// @version      2.2
// @description  Adds a button that will automatically ignore all Demo Titles
// @author       JoeX92
// @match        https://steamdb.info/freepackages/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=steamdb.info
// @grant        GM.setValue
// @grant        GM.getValue
// @grant        GM.addValueChangeListener
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    GM.addValueChangeListener("games2remove", function(name, old_value, new_value, remote) {
        if (remote) { // 'remote' means the change happened in another tab/window
            console.log("data:", name, old_value, new_value, remote);
            // Do your interaction here (e.g., click a button)
        }
    });

    function ignoreDemoTitles() {
        const packages = document.querySelectorAll('.package');
        const games = [];

        for ( const [i, p] of packages.entries() ) {
            const removeLink = p.querySelector(".js-remove");
            if (removeLink) {
                const name = p.childNodes[p.childNodes.length-1].textContent;
                const isDemo = (name.search(/\b(free weekend|demo|prologue|trial|episode|chapter|alpha|beta|sample|part|trailer|демо|пролог|эпизод|альфа|бета|тест|пробная)\b|(体験|試用|デモ|ベータ|アルファ|序章|试玩|試玩|体验|體驗|演示|前編|前篇|체험|프롤로그|에피소드|알파|베타)(版|판)?|お試し/i) > -1);
                if (isDemo) {
                    games.push(name);
                    removeLink.click();
                }
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
    window.onload = (ev) => {
        console.log(GM.getValue("games2remove"),ev);
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
    }
})();
