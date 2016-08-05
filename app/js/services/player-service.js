/**
 * Created by kling on 7/8/16.
 */
'use strict';

export default class PlayerService {

  static get $inject() {
    return [
      '$http',
      '$q'
    ];
  }

  constructor($http, $q) {
    this.$http = $http;
    this.$q = $q;
    this.db = firebase.database();
    this.players = [];
    this.activePlayer = null;
    this._initializePlayers();
  }

  _initializePlayers() {
    console.log('Getting all players');
    this.$q.when(this.getAllPlayers())
      .then(players => {
        const _players = [];
        Object.keys(players)
          .forEach(playerKey => {
            _players.push(players[playerKey]);
          });
        this.players = _players;
        console.log(this.players);
      });
  }

  getAllPlayers() {
    return this.db.ref()
      .child('players')
      .once('value')
      .then(snapshot => snapshot.val());
  }

  savePlayer(payload) {
    // Get a key for a new Post.
    const userKey = this.db.ref()
      .child('players')
      .push()
      .key;
    payload._key = userKey;

    // Write the new post's data simultaneously in the posts list and the user's post list.
    const updates = {};
    updates['/players/' + userKey] = payload;

    return this.db.ref()
      .update(updates);
  }

  searchPlayer(battletag) {
    return this.$http({
        method: 'GET',
        url: this._getApiRoute(battletag),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response && response.error != null && response.error === 404) {
          return console.error('No such battle tag');
          // give ui feedback
        }

        const payload = response.data.data;
        payload.battletag = battletag;
        //this.players.push(response.data.data);
        this.activePlayer = payload;
        return payload;
        //return this.savePlayer(payload);
      })
      .catch(err => {
        console.error(err);
      });
  }

  _getApiRoute(battletag) {
    return `https://api.lootbox.eu/pc/eu/${battletag.replace('#', '-')}/profile`;
  }

}
