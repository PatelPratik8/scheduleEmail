var _ = require('lodash');
const languageCodeArray = ['en', 'hi'];
/**
 *
 * @param {String} code : Key identifier
 * @param {*} defaultcode : Default error code type
 */
exports.getSuccessResponseMessage = (code, languageCode = 'en', defaultcode = 'DEFAULT') => {
	return getMessage(code, languageCode, defaultcode);
};

/**
*
* @param {String} code : Key identifier
* @param {*} defaultcode : Default error code type
*/
exports.getErrResponseMessage = (code, languageCode = 'en', defaultcode = 'DEFAULTERR') => {
	return getMessage(code, languageCode, defaultcode);
};

/**
*
* @param {String} code : Key identifier
* @param {*} defaultcode : Default error code type
*/
exports.getConstantMessage = (code, languageCode = 'en', defaultcode = 'DEFAULTERR') => {
	return getMessage(code, languageCode, defaultcode);
};

function getMessage(code, languageCode, defaultcode) {
	languageCode = languageCodeArray.find(e => e === languageCode) ? languageCode : 'en';
	let messageFile = _.defaults(require('./' + languageCode + '.json'), {});
	return messageFile[code] ? messageFile[code] : messageFile[defaultcode];
}