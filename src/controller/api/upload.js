const Base = require('../base.js');
const fs = require('fs');

module.exports = class extends Base {
 	indexAction() {
		const itemFile = this.file('image');
	    if (think.isEmpty(itemFile)) {
	      return this.fail('保存失败');
	    }
	    // const _this = this;
	    const filename =  think.uuid(32) + '.jpg';
	    const is = fs.createReadStream(itemFile.path);
	    const os = fs.createWriteStream('www/uploads/img/' + filename);
	    is.pipe(os);

	    return this.success({
	      name: 'image',
	      fileUrl: filename
	    });
	}
};
