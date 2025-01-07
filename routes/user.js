const express = require('express');
const router = express.Router();
const userController = require('../controllers/User'); 
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });

router.use(bodyParser.json());

router.post('/LoginForm', userController.Login);
router.get('/LoginForm', userController.getLogin);
router.get('/RegisterationForm', userController.getResPage);
router.get('/UserPage', userController.userPage);
router.post('/RegisterationForm', upload.single('Photo'), userController.postRigster);
router.get('/summary', userController.getSummary);
router.get('/EditProfileUser', userController.getEditProfilePage);
router.post('/EditProfileUser', upload.single('Photo'), userController.postEditProfilePage);
router.get('/Devices', userController.getDevicesPage);
router.get('/Device/:id', userController.getDevicePage);
router.get('/UserProfile', userController.getUserProfilePage);
router.get('/device-images/:id', userController.getDeviceImages);
router.get('/user-images/:id', userController.getUserImages);
router.get('/Buy', userController.getBuyPage);
router.post('/UserPage', userController.postUserPage);
router.get('/History', userController.getHistory);
router.get('/OrderDetails/:id2', userController.getOrderDetailsPage);
router.get('/logout', userController.getLogOut);


module.exports = router;
