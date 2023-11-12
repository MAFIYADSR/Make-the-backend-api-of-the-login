const User = require('../models/user');

function isstringvalid(string) {
    if (string == undefined || string.length === 0) {
        return true;
    }
    else {
        return false;
    }
}

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(email, name, password);
        if (isstringvalid(name) || isstringvalid(email) || isstringvalid(password)) {
            return res.status(400).json({ err: "Bad parameters - Something is missing" })
        }

        await User.create({ name, email, password })
        res.status(201).json({ message: 'Successfuly create new user' })
    } catch (err) {
        res.status(500).json(err);
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (isstringvalid(email) || isstringvalid(password)) {
            return res.status(400).json({ message: "Email id or password is missing", success: false })
        }
        console.log(password);
        const user = await User.findAll({ where: { email } })
        if (user.length > 0) {
            if (user[0].password === password) {
                res.status(200).json({ success: true, message: "User logged in sucessfully" })
            }
            else {
                return res.status(400).json({ success: false, message: "Password is incorrect" })
            }
        }
        else {
            return res.status(404).json({ success: false, message: "User doesnot exist" })
        }
    }
    catch (err) {
        res.status(500).json({ message: err, success: false })
    }
}

module.exports = {
    signup,
    login
}