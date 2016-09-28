// ==UserScript==
// @name          TagPro Scoreboard Position Labels
// @description   Labels balls with numbers in-game indicating their position on scoreboard
// @include       http://tagpro-*.koalabeast.com:*
// @include       http://tangent.jukejuice.com:*
// @include       http://maptest.newcompte.fr:*
// @include       http://maptest2.newcompte.fr/
// @include       http://*.newcompte.fr*
// @license       GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @author        Rattpack
// @version       0.0
// ==/UserScript==

console.log('START: ' + GM_info.script.name + ' (v' + GM_info.script.version + ' by ' + GM_info.script.author + ')');

tagpro.ready(function() {
    var showOnBall = true;
    var textColorOnBall = '#17fd1b';
    var textPositionOnBall = {x:20, y:30};

    function getAllPlayers() {
        var players = [];
        for (var playerId in tagpro.players) {
          if (tagpro.players.hasOwnProperty(playerId))
            players.push( {id:playerId, score:tagpro.players[playerId].score} );
        }
        players.sort(function(a, b) {
            return (b.score - a.score ? b.score - a.score : a.id - b.id);
        });
        for (var i = 0;i < players.length;i++){
            addTextToBall(tagpro.players[i],i + 1);
        }
    }
    function addTextToBall(playerId,position) {
        var player = tagpro.players[playerId];
        if (player.sprites.SBL)
            player.sprites.name.removeChild(player.sprites.SBL);
        var SBL_PrettyText = tagpro.renderer.prettyText(position,textColorOnBall);
        SBL_PrettyText.x = textPositionOnBall.x;
        SBL_PrettyText.y = textPositionOnBall.y;
        SBL_PrettyText.alpha = 0.4;
        player.sprites.SBL = SBL_PrettyText;
        player.sprites.name.addChild(player.sprites.SBL);
    }
    var clearableInterval = setInterval(function() {
        getAllPlayers();}, 1000);
      });
