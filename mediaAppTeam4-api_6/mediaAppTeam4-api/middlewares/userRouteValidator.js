exports.loginValidator = (req, res, next) => {
    const { email, password } = req.body
    let errors = {}

    if (!email || email === '') errors.email = 'email cannot be blank.'
    if (!password || password === '') errors.password = 'Password cannot be blank.'

    if (Object.keys(errors).length === 0) {
        next()
    } else {
        res.status(400).json(errors)
    }
}

exports.registerValidator = (req, res, next) => {
    const { name, email, password } = req.body
    let errors = {}

    if (!name || name === '') errors.name = 'name cannot be blank.'
    if (!email || email === '') errors.email = 'Email cannot be blank.'
    if (!password || password === '') errors.password = 'Password cannot be blank.'

    if (Object.keys(errors).length === 0) {
        next()
    } else {
        res.status(400).json(errors)
    }
}
