const main = require('./vue-main');

module.exports = function (source : string) {
	return main.rewrite(source);
};