const Base = require('../base.js');
const Axios = require('axios');

module.exports = class extends Base {

  async indexAction() {
  	const model = await this.model('supercode').select();

    return this.success(model);
  }

  async addAction() {
  	const model = await this.model('supercode');
  	const codes = [];

  	let i = 10;
  	let dateValues = new Date().getTime();
  	console.log(dateValues);
  	while(i) {
  		i--;
  		codes.push({
  			code: think.md5(`callme_${i}_salex_${dateValues}`),
  			create_date: dateValues
  		});
  	}
  	model.addMany(codes);

    return this.success('添加成功!');
  }

  async deleteAction() {
  	const model = await this.model('supercode').delete();

    return this.success('删除成功!');
  }

  async tokenAction() {
  	const response = await Axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5ba56b1ca0d4af23&secret=07df5ad8499980b95020252ced909f65');


  	return this.success({
  		access_token: response.data.access_token
  	});
  	
  }

};
