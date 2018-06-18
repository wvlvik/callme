const BaseRest = require('../rest.js');

module.exports = class extends BaseRest {

	async getAction() {
		const id = this.get('id');
		let model;

		if(id) {
			model = await this.model('scans').where({id: id}).find();
		}else {
			model = await this.model('scans').select();
		}

		this.success(model);
	}

	async postAction() {
		const post = this.post();

		const data = Object.assign({}, {
			nickname: post.nickName,
			supercode_id: post.supercode,
			create_date: parseInt(new Date().getTime() / 1000),
		});

		const add =  await this.model('scans').add(data);

		return this.success('添加成功');
	}
};
