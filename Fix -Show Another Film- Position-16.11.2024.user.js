// ==UserScript==
// @name         Fix "Show Another Film" Position
// @namespace    http://tampermonkey.net/
// @version      16.11.2024
// @description  Positions the "Show Another Film" link on Criticker.com statically above the cover image of the Top Recommendation.
// @author       Alsweider
// @match        https://www.criticker.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=criticker.com
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    //Funktion, um den Link zu fixieren
    const fixLinkPosition = () => {
        const linkDiv = document.getElementById('rc_toprec_nextdiv'); //"Show Another Film"-Link
        const mainRecDiv = document.getElementById('rc_mainrec'); //Hauptdiv mit der Top Recommendation
        const topRecHeader = mainRecDiv?.querySelector('h2'); //Überschrift der Top Recommendation

        if (linkDiv && mainRecDiv && topRecHeader) {
            //Prüfen, ob der Link bereits verschoben wurde
            if (linkDiv.parentElement !== mainRecDiv) {
                //Link an die richtige Stelle verschieben (direkt unter die Überschrift)
                mainRecDiv.insertBefore(linkDiv, topRecHeader.nextSibling);

                //Link stylisieren, falls nötig
                linkDiv.style.marginTop = '10px'; //Abstandsregelung
                linkDiv.style.marginBottom = '10px';
            }
        }
    };

    //MutationObserver, um Änderungen auf der Seite zu verfolgen
    const observer = new MutationObserver(() => {
        fixLinkPosition();
    });

    //Beobachte Änderungen im Body
    observer.observe(document.body, { childList: true, subtree: true });

    //Initiales Fixieren des Links
    window.addEventListener('load', fixLinkPosition);
})();
