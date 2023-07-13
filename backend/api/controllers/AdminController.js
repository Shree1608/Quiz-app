/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const uuid = require('uuid-random');
const dotenv = require("dotenv").config();
module.exports = {
  
    signupLogin: async  (req, res) =>{
        try {
          const id = uuid()
          const { action } = req.params;
          const { username, email, password } = req.body;
    
          if (action === 'signup') {
            // Handle signup 
            const adminExists = await Admin.findOne({ email });
            if (adminExists) {
              return res.status(409).json({ message: 'Admin already exists' });
            }
            if (!username || !email || !password) {
              return res.status(400).json({ message: 'Please provide all required fields' });
            }
      
            const hashedPassword = await bcrypt.hash(password, 10);
      
            const admin = await Admin.create({ id:id, username, email, password: hashedPassword }).fetch();
      
            return res.status(201).json({ message: 'Admin created successfully', admin });
          } else if (action === 'login') {
            // Handle login 
            const admin = await Admin.findOne({ email });
            if (!admin) {
              return res.status(401).json({ message: 'Invalid credentials' });
            }
      
            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
              return res.status(401).json({ message: 'Invalid credentials' });
            }
      
            let token = jwt.sign({ adminId: admin.id }, process.env.JWT_KEY, { expiresIn: '1h' });
            token = await Admin.updateOne({id:admin.id},{token:token})
            return res.status(200).json({ message: 'Login successful', token:token.token });
          } else {
            return res.status(400).json({ message: 'Invalid action' });
          }
        } catch (error) {
            console.log(error);
          return res.status(500).json({ message: 'Internal server error' });
        }
      },

      logout : async(req,res)=>{
        const findAdminId = req.adminData.adminId;
        // get current date and time
        const expireDate = new Date().toLocaleString(); 
        console.log(req.adminData);
        const findAdmin = await Admin.updateOne(
          {id:findAdminId},{ token :'' , tokenExpires : expireDate}
        )
        return res.status(200).json({
          admin:findAdmin,
          tokenExpires : expireDate,
          message : 'logout successufully'
        })

      }

};

