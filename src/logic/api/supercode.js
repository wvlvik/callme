module.exports = class extends think.Logic {
	
  indexAction() {

  }

  createwxaqrcodeAction() {
  	const id = this.get('id');

  	if(think.isEmpty(id)) {
  		return this.fail('id为空');
  	}
  }


};
