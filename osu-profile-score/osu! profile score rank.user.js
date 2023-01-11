// ==UserScript==
// @name         osu! profile score rank
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  places score rank on osu! profile if applicable
// @author       rrailgun
// @match        https://osu.ppy.sh/*
// @require  http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require  https://greasyfork.org/scripts/383527-wait-for-key-elements/code/Wait_for_key_elements.js
// ==/UserScript==

(function() {
    'use strict';

    waitForKeyElements (
        "div.profile-detail",
        getRank
    );


    function getRank() {
        let userId = window.location.href.substring(window.location.href.lastIndexOf('users/')+6);
        if (userId.includes('/')) userId = userId.substring(0,userId.lastIndexOf('/'));

        fetch('https://score.respektive.pw/u/'+userId)
            .then(data => data.json())
            .then(data => {
            let rankPanel = document.getElementsByClassName('profile-detail__values')[0];
            //parent div
            let newDiv = document.createElement('div');
            newDiv.className='value-display value-display--rank';

            //label
            let label = document.createElement('div');
            label.className='value-display__label';
            label.innerText='Score Ranking';
            newDiv.appendChild(label)

            //rank
            let rank = document.createElement('div');
            rank.className='value-display__value';
            if (data[0].rank !== 0) rank.innerText='#'+data[0].rank.toLocaleString("en-US");
            else rank.innerText='No Rank';
            newDiv.appendChild(rank);

            rankPanel.appendChild(newDiv);
        })
    }

})();
