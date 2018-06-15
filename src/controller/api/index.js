const Base = require('../base.js');
const Axios = require('axios');

module.exports = class extends Base {

  async indexAction() {
  	

    return this.success('Callme 接口');
  }

};
