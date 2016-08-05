'use strict';

export default class ConfirmPlayerController {
  constructor($scope, $mdDialog, player) {
    this.$scope = $scope;
    this.dialog = $mdDialog;
    this.player = player;
  }

  cancel() {
    this.dialog.cancel();
  }

  answer(answer) {
    this.dialog.hide(answer);
  }
}
