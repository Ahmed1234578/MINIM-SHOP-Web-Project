const User=require("../models/mydataSchema")
const Device=require("../models/devicesSchema")
const Order = require('../models/order')
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



const getAdminP=(req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm.ejs');
  }
  if(req.session.type==='admin'){
   res.render("AdminPage")
  }else{
    return res.redirect('/user/LoginForm.ejs');
  }
  }

   const getAddDevice=(req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
  if(req.session.type==='admin'){
   res.render("AddDevice")
  }else{
    return res.redirect('/user/LoginForm');
  }
  }
  const postAdminPage= async (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.');
    }

    try {
        const existingDevice = await Device.findOne({ Name: req.body.Name });
        if (existingDevice) {
            return res.status(400).json({ message: 'A device with this name already exists.' });
        }

        const newDevice = new Device({
            Name: req.body.Name,
            Price: req.body.Price,
            Description: req.body.Description,
            RAM: req.body.RAM,
            ScreenSpace: req.body.ScreenSpace,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            },
        });

        await newDevice.save();
        res.json({ message: 'Device added successfully.' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error saving device.' });
    }
}

const GetAllUsers=(req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  } 
  
    
    User.find().then((result) => {
      if(req.session.type==='admin'){
      res.render("Users", {arr: result})
      res.end();
      }else {
        return res.redirect('/user/LoginForm');
      }
    }).catch((err) => {
      console.log(err);
    })
  
   }
   const getManageDevicePage = async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
    }
  
    const perPage = 4;
    const page = req.query.page || 1;
  
    try {
      const devices = await Device.find({})
        .skip((perPage * page) - perPage)
        .limit(perPage);
  
      const count = await Device.countDocuments();
  
      if (req.session.type === 'admin') {
        res.render('ManageDevices', {
          arr: devices,
          current: page,
          pages: Math.ceil(count / perPage)
        });
      } else {
        return res.redirect('/views/LoginForm');
      }
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  };
  
  const getViewUserPage=(req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
    User.findById(req.params.id).then((result) => {
      if(req.session.type==='admin'){
      res.render('ViewUser', {arr: result})
      }else {
        return res.redirect('/user/LoginForm');
      }
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
const viewDevicePage=(req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
    Device.findById(req.params.id).then((result) => {
      if(req.session.type==='admin'){
      res.render('ViewDevice', {arr: result})
      }else {
        return res.redirect('/user/LoginForm');
      }
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
   const getEditDevicePage= (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
    Device.findById(req.params.id).then((result) => {
      if(req.session.type==='admin'){
      res.render('EditDevice', {arr: result})
      }else {
        return res.redirect('/user/LoginForm');
      }
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
const getEditUserPage= (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
    User.findById(req.params.id).then((arr) => {
      if(req.session.type==='admin'){
      res.render('EditUser', { arr });
      }else {
        return res.redirect('/user/LoginForm');
      }
    }).catch((err) => {
      console.log(err);
    });
  }
  const putEditUser=async (req, res) => {
    try {
        // Check if the email is already used by another user
        const existingUser = await User.findOne({ Email: req.body.Email, _id: { $ne: req.params.id } });
        if (existingUser) {
            return res.status(400).json({ message: 'A user with this email already exists.' });
        }
  
        const updatedData = {
            FullName: req.body.FullName,
            Email: req.body.Email,
            Address: req.body.Address,
            Password: req.body.Password,
        };
  
        if (req.file) {
            updatedData.Photo = {
                data: req.file.buffer,
                contentType: req.file.mimetype,
            };
        }
  
        await User.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json({ redirectUrl: "/admin/Users" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Error updating user profile.' });
    }
  }
  const putEditDevice=(req, res) => {
    const updatedData = {
      Name: req.body.Name,
      Price: req.body.Price,
      Description: req.body.Description,
      RAM: req.body.RAM,
      ScreenSpace: req.body.ScreenSpace,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };
  
    if (req.file) {
      updatedData.Photo = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
  
    Device.findByIdAndUpdate(req.params.id, updatedData, { new: true }).then((result) => {
      res.redirect("/admin/ManageDevices");
    }).catch((err) => {
      console.log(err);
      res.status(500).send('Error updating device image.');
    });
  }
  const delUsers=(req, res) => {
    User.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/admin/Users')
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
   const delDevices=(req, res) => {
    Device.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/admin/ManageDevices')
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
   const deleteOrders=(req, res) => {
    Order.findByIdAndDelete(req.params.id).then(() => {
      res.redirect('/admin/Orders')
     
    }).catch((err) => {
      console.log(err);
    })
   
   }
   const getOrdersPage=async (req, res) => {
    if (!req.session.userId) {
      return res.redirect('/user/LoginForm');
  }
    try {
      const orders = await Order.find().populate('user');
      if(req.session.type==='admin'){
      res.render('Orders', { orders });
      }else {
        return res.redirect('/user/LoginForm');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching orders.');
    }
  }
   module.exports = {
    deleteOrders,
    delDevices,
    delUsers,
    putEditDevice,
    putEditUser,
    getEditUserPage,
    getEditDevicePage,
    viewDevicePage,
    getViewUserPage,
    getManageDevicePage,
    GetAllUsers,
    postAdminPage,
    getAddDevice,
    getAdminP,
    getOrdersPage
  };
