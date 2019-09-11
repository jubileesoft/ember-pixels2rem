import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default Controller.extend({
  // #region Properties

  defaultPx: 16,
  px: 16,

  // #endregion Properties


  // #region Services

  firebase: service(),

  // #endregion Services


  // #region Hooks

  init() {
    this._super(...arguments);
    this.px2rem();

    this.firebase.getLastVisit().then(lastVisitOn => {
      if (lastVisitOn != null) {
        this.set('lastVisitOn', lastVisitOn);
      }

      this.firebase.logVisit();
    }).catch(e => {
      window.console.log(e);
    });


  },

  // #endregion Hooks


  // #region Actions

  px2rem: action(function (originProperty, value) {
    if (originProperty === 'px' || originProperty === 'defaultPx') {
      this.set(originProperty, value);
    }

    let rem = this.px / this.defaultPx;
    if (isNaN(rem)) {
      this.set('rem', '');
    } else {
      rem = Number(rem.toFixed(6));
      this.set('rem', rem + 'rem');
    }
  }),

  // #endregion Actions
});
