/**
 * Created by kling on 7/8/16.
 */
'use strict';

export default class UserController {

    static get $inject() {
        return [
            '$scope',
            'UserService'
        ];
    }

    constructor($scope, userService) {
        this.$scope = $scope;
        this._userService = userService;
        this.player = '';
        this.players = [];
        this._initializeUsers();
    }

    _initializeUsers() {
        this._userService
            .getAllPlayers()
            .then(players => {
                const _players = [];
                Object.keys(players).forEach(playerKey => {
                    _players.push(players[playerKey]);
                });
                this.players = _players;
                this.$scope.$apply();
            });
    }

    searchPlayer(battletag) {
        this._userService
            .searchPlayer(battletag)
            .then(response => {
                if (response && response.error != null && response.error === 404) {
                    return console.error('No such battle tag');
                    // give ui feedback
                }

                const payload = response.data.data;
                payload.battletag = battletag;
                this.players.push(response.data.data);
                return this._userService.savePlayer(payload);
            })
            .catch(err => {
                console.error(err);
                this.players.splice(-1, 1);
            });
    }

    getPlayerProfileUrl(player) {
        return `http://masteroverwatch.com/profile/pc/eu/${player.battletag.replace('#', '-')}`;
    }

}