const authService = require('../services/auth.service');

const register = async (req, res) => {
    try {
        const user = await authService.registerUser(req.body);
        res.status(201).json({
            message: 'User registered',
            token: user.token
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const login = async (req, res) => {
    try {
        const user = await authService.loginUser(req.body.email, req.body.password);
        res.json({
            message: 'Login successful',
            token: user.token
        });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

module.exports = {
    register,
    login,
};
