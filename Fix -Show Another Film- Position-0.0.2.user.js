// ==UserScript==
// @name         Fix "Show Another Film" Position
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Positions the "Show Another Film" link on Criticker.com statically above the cover image of the Top Recommendation.
// @author       Alsweider
// @match        https://www.criticker.com/*
// @icon         https://www.criticker.com/favicon.ico
// @grant        none
// @license MIT
// @downloadURL https://update.greasyfork.org/scripts/517626/Fix%20%22Show%20Another%20Film%22%20Position.user.js
// @updateURL https://update.greasyfork.org/scripts/517626/Fix%20%22Show%20Another%20Film%22%20Position.meta.js
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
