'use strict';

export default class SearchController {

  static get $inject() {
    return [
      '$scope',
      'PlayerService',
      '$q',
      '$mdDialog'
    ];
  }

  constructor($scope, playerService, $q, $mdDialog) {
    this.$scope = $scope;
    this.playerService = playerService;
    this.$q = $q;
    this.dialog = $mdDialog;
    this.player = '';
    this.playerProfile = null;
    this.searching = false;
  }

  searchPlayer(battletag, $event) {
    if ($event.keyCode === 13) {
      this.searching = true;
      this.$q.when(this.playerService.searchPlayer(battletag))
        .then(player => {
          this.playerProfile = player;
          this.dialog.show({
            controller: 'ConfirmPlayerController as ctrl',
            templateUrl: 'templates/confirm-player.tpl.html',
            locals: { player },
            parent: angular.element(document.body),
            targetEvent: $event,
            clickOutsideToClose: true,
            fullscreen: false
          }).then(
            answer => {
              console.log('You said the information was "' + answer + '".');
            },
            () => {
              console.log('You cancelled the dialog.');
            }
          );
        });
    }
  }

}
