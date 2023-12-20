const resParam = require('./responseMSG/index');

exports.success = (res, data, languageCode = 'en', message = '', statusCode = 200) => {
	const resData = {
		success: true,
		message: resParam.getSuccessResponseMessage(message, languageCode, 'DEFAULT'),
		statusCode: statusCode,
		data,
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};

exports.keyAlreadyExist = (res, err, languageCode = 'en', message = '', statusCode = 409) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: resParam.getSuccessResponseMessage(message, languageCode, 'DEFAULT'),
		data: {},
		error: err,
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};

exports.notFound = (res, languageCode = 'en', message, statusCode = 404) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: resParam.getErrResponseMessage(message, languageCode, 'DEFAULTERR') || 'Invalid request data',
		data: {},
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};

exports.unAuthentication = (res, data, languageCode = 'en', message = '', statusCode = 401) => {
	const resData = {
		success: false,
		statusCode: statusCode,
		message: resParam.getErrResponseMessage(message, languageCode, 'DEFAULT_AUTH'),
		data,
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};

exports.sendUnexpected = (res, err, languageCode = 'en', message, statusCode = 500) => {
	console.log(err);
	const resData = {
		success: false,
		statusCode: statusCode,
		message: resParam.getErrResponseMessage(message, languageCode, 'DEFAULT_INTERNAL_SERVER_ERROR'),
		data: err,
		messageCode: message
	};
	return res.status(statusCode).send(resData);
};

exports.send = (res, languageCode = 'en', message = '', statusCode = 203, data = {}) => {
	let response = {
		success: false,
		statusCode: statusCode,
		data,
		message: resParam.getErrResponseMessage(message, languageCode, 'DEFAULTERR'),
		messageCode: message
	};
	return res.status(statusCode).send(response);
};

exports.sendJoiError = (res, code = '', languageCode = 'en', err, statusCode = 400) => {
	if (is_display_log) {
		console.log('JoiError >>>> ', err);
	}
	let JoiError = _.map(err.details, ({ message, context, type, path }) => ({
		message: message.replace(/['"]/g, ''),
		type,
		path
	}));
	let messageDisplay = resParam.getErrResponseMessage(code, languageCode, 'DEFAULTERR');
	if (JoiError && JoiError.length > 0 && JoiError[0].message) {
		messageDisplay = JoiError[0].message;
	}
	let response = {
		success: false,
		statusCode: statusCode,
		message: messageDisplay,
		error: JoiError,
		messageCode: code
	};
	return res.status(statusCode).send(response);
};


exports.internalServerError = (res, err, languageCode = 'en', message = '', statusCode = 500) => {
	let response = {
		success: false,
		statusCode: statusCode,
		data:err,
		message: resParam.getErrResponseMessage(message, languageCode, 'DEFAULTERR'),
		messageCode: message
	};
	console.log(err)
	return res.status(statusCode).send(response);
};

