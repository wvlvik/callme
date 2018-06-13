module.exports = class extends think.Logic {
	
  indexAction() {

  }

  async createwxaqrcodeAction() {
  	const id = this.get('id');

  	if(think.isEmpty(id)) {
  		return this.fail('id为空');
  	}

  	// 检查是否有效
  	const model = await this.model('supercode').where({code: id}).find();

  	if(think.isEmpty(model)) {
  		return this.fail('id无效');
  	}
  }


};
