import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import generateTokenAndSetCookie from '../middleware/generateTokenAndSetCookie.js';

export const Register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'User already exists' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        generateTokenAndSetCookie(res, user._id);
        res.status(201).json({ message: 'User registered successfully' , user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// LOGIN ENDPOINT
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'Invalid email or password' });
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });
        generateTokenAndSetCookie(res, user._id);
        res.status(200).json({ message: 'Login successful', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Logout endpoint
export const Logout = (req, res) => {
    res.clearCookie('token', { httpOnly: true, sameSite: 'none', secure: true });
    res.status(200).json({ message: 'Logged out successfully' });
}

// Check-Auth ENDPOINT
export const CheckAuth = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // exclude password
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ success: true, message: 'Authenticated', user });
    } catch (err) {
        res.status(200).json({ message: err.message });
    }
}