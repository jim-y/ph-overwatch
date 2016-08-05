'use strict';

class PlayerController {
  constructor() {
    this.player = this.model;
    console.log(this.model);
  }

  getPlayerProfileUrl(player) {
    if (!player) return;
    return `http://masteroverwatch.com/profile/pc/eu/${player.battletag.replace('#', '-')}`;
  }
}

export default class PlayerDirective {
  constructor() {
    this.restrict = 'EA';
    this.templateUrl = 'templates/player.tpl.html';
    this.controller = PlayerController;
    this.bindToController = true;
    this.controllerAs = 'ctrl';
    this.scope = {
      model: '='
    };
  }
}
