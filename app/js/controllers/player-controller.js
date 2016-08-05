/**
 * Created by kling on 7/8/16.
 */
'use strict';

export default class PlayerController {

  static get $inject() {
    return [
      '$scope',
      'PlayerService'
    ];
  }

  constructor($scope, playerService) {
    this.$scope = $scope;
    this.playerService = playerService;
  }

}
