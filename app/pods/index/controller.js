import Controller from '@ember/controller';
import { observer } from '@ember/object';

export default Controller.extend({
  // #region Properties

  defaultPx: 16,
  px: 16,

  // #endregion Properties


  // #region Hooks

  init() {
    this._super(...arguments);
    this.px2rem();
  },

  // #endregion Hooks


  // #region Methods

  somethingChanged: observer('px', 'defaultPx', function () {
    this.px2rem();
  }),

  px2rem() {
    let rem = this.px / this.defaultPx;
    if (isNaN(rem)) {
      this.set('rem', '');
    } else {
      rem = Number(rem.toFixed(6));
      this.set('rem', rem + 'rem');
    }
  },

  // #endregion Methods
});
