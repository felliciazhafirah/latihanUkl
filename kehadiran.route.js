import { Router } from 'express';
import { absen, getKehadiran } from '../controller/kehadiran.controller.js';

const router = Router();

router.get('/riwayatKehadiran/:user_Id', getKehadiran);
router.post('/absen', absen);

export default router;