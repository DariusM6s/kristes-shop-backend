exports.userSignupValidator = (req, res, next) => {
	req.check('name', 'Name is required').notEmpty();
	req
		.check('email', 'Email must be valid and is required')
		.matches(/.+\@.+\..+/)
		.withMessage('Email must contain @');

	req.check('password', 'Password is required').notEmpty();
	req
		.check('password')
		.isLength({ min: 6 })
		.withMessage('Pasword must contain at least 6 charakters')
		.matches(/\d/)
		.withMessage('Password must contain a number');
	const errors = req.validationErrors();
	if (errors) {
		const firstError = errors.map(error => error.msg)[0];
		return res.status(400).json({ error: firstError });
	}
	next();
};
