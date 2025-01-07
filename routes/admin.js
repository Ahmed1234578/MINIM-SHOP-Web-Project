const express = require('express');
const router = express.Router();
const Admin = require('../controllers/Admin');
const multer = require('multer');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
const upload = multer({ storage: multer.memoryStorage() });

router.get('/AdminPage', Admin.getAdminP);
router.get('/AddDevice', Admin.getAddDevice);
router.post('/AdminPage', upload.single('image'), Admin.postAdminPage);
router.get('/Users', Admin.GetAllUsers);
router.get('/ManageDevices', Admin.getManageDevicePage);
router.get('/ViewUser/:id', Admin.getViewUserPage);
router.get('/ViewDevice/:id', Admin.viewDevicePage);
router.get('/EditDevice/:id', Admin.getEditDevicePage);
router.get('/EditUser/:id', Admin.getEditUserPage);
router.put('/EditUser/:id', upload.single('Photo'), Admin.putEditUser);
router.put('/EditDevice/:id', upload.single('image'), Admin.putEditDevice);
router.delete('/Users/:id', Admin.delUsers);
router.delete('/ManageDevices/:id', Admin.delDevices);
router.delete('/Orders/:id', Admin.deleteOrders);
router.get('/Orders', Admin.getOrdersPage);

module.exports = router;
