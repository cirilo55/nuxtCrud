import { useBase, createRouter, defineEventHandler } from 'h3';

import * as UserCtrl from '~~/server/controller/user';
import * as PacientesCtrl from '~~/server/controller/pacientes'
const router = createRouter();
;


router.get('/users', defineEventHandler(UserCtrl.read));
router.post('/users', defineEventHandler(UserCtrl.create));

router.get('/pacientes', defineEventHandler(PacientesCtrl.read));
router.post('/pacientes', defineEventHandler(PacientesCtrl.create));
router.get('/pacientes/:id', defineEventHandler(PacientesCtrl.detail));
router.put('/pacientes/:id', defineEventHandler(PacientesCtrl.update));
router.delete('/pacientes/:id', defineEventHandler(PacientesCtrl.remove));

export default useBase('/api', router.handler);
