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
    }

    searchUser(battletag) {
        return this.$http.get(this._getApiRoute(battletag));
    }

    _getApiRoute(battletag) {
        return `https://owapi.net/api/v2/u/${battletag.replace('#', '-')}/stats/general`;
    }

}