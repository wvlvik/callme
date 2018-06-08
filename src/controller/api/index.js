const Base = require('../base.js');
const Axios = require('axios');

const fs = require('fs');

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
  	// const response = await Axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wx5ba56b1ca0d4af23&secret=07df5ad8499980b95020252ced909f65');
  	const response = await Axios.get('https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=wxf6a57be7d6affef1&secret=f77c52291ee5a654fe7a7db167765cc9');

  	return {
  		access_token: response.data.access_token
  	};

  }

  async createwxaqrcodeAction() {
  	const token = await this.tokenAction();

  	const image = await Axios({
	  method:'post',
	  url: 'https://api.weixin.qq.com/wxa/getwxacode?access_token=' + token.access_token,
	  responseType: 'stream',
	  data: { "path": "pages/index/index?id=1", "width": 430 }
	})
	.then(function(response) {
		return response.data.pipe(fs.createWriteStream('www/uploads/ada_lovelace.jpg'));
	});

  	return this.success(image);

  }

};
