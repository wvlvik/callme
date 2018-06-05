const Base = require('../base.js');

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

};
