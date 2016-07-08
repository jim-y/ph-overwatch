/**
 * Created by kling on 7/8/16.
 */
'use strict';

export default class UserController {

    static get $inject() {
        return [
            'UserService'
        ];
    }

    constructor(userService) {
        this._userService = userService;

        this.users = [];
    }

    searchUser(battletag) {
        this._userService.searchUser(battletag).then(response => {
            if (response && response.error != null && response.error === 404) {
                return console.error('No such battle tag');
                // give ui feedback
            }

            this.users.push(response.battletag);
        });
    }

}