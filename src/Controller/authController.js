const { generateToken } = require("../Config/jwtProvider");
const UserService = require("../Services/User.Service")
const bcrypt = require('bcrypt')

//register the user
const register = async (req, res) => {
    try {
         const user = await UserService.createUser(req.body);
        const { email, password } = user;
        if (!email || !password) {
            return res.status(400).send({ message: 'Email and password are required' });
        }
     
        const jwt = generateToken(user._id);
        // await cartService.createcart(user)
        return res.status(200).send({ jwt, message: 'register Succesfully' });
        console.log(user);
    } catch (error) {
        return res.status(400).send({ message: error.message })
    }
}

//Login option
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(401).send({ message: 'Email and password are required' });
    }
    try {
        const user = await UserService.getUserbyEmail(email);
        if (!user) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: 'Invalid email or password' });
        }
        const jwt = generateToken(user._id);
        return res.status(200).send({ jwt, message: 'Login Succesfully' });
    } catch (error) {
        return res.status(401).send({ message: 'Invalid email or password' })
    }
}

module.exports = {
    register,
    login
}