const main = require('./vue-alias');

module.exports = function (source : string) {
	return main.rewrite(source);
};