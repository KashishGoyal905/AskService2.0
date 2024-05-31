const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    if (req.method === 'OPTIONS') {
        return next();
    }

    try {
        // authorization: 'Bearer Toekn';
        // to check if token exists or not
        const token = req.headers.authorization.split(' ')[1];
        console.log('Token: ', token);
        if (!token) {
            console.log('Authentication failed1');
            throw new Error('Authentication failed');
        }

        //token might be invalid
        // it will have the first argument which we store as a payload when we generated token
        const decodedToken = jwt.verify(token, 'tokenSecret');
        // adding an object to the req of user data
        require.userData = { userId: decodedToken.userId };
        // letting it pass to the next route
        next();
    } catch (err) {
        console.log('Authentication failed2', err);
        const error = new Error('Authentication failed');
        return next();
    }
}