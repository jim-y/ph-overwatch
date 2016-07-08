/**
 * Created by kling on 7/8/16.
 */
'use strict';

export default class UserService {

    static get $inject() {
        return [
            '$http'
        ];
    }

    constructor($http) {
        this.$http = $http;
        this.db = firebase.database();
    }

    getAllPlayers() {
        return this.db.ref().child('players').once('value').then(function(snapshot) {
            return snapshot.val();
        });
    }

    savePlayer(payload) {
        // Get a key for a new Post.
        const userKey = this.db.ref().child('players').push().key;
        payload._key = userKey;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        const updates = {};
        updates['/players/' + userKey] = payload;

        return this.db.ref().update(updates);
    }

    searchPlayer(battletag) {
        return this.$http({
            method: 'GET',
            url: this._getApiRoute(battletag),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
    }

    _getApiRoute(battletag) {
        return `https://api.lootbox.eu/pc/eu/${battletag.replace('#', '-')}/profile`;
    }

}