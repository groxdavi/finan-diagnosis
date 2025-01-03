import { Router } from "express";
import { login } from "../controllers/auth/authLogin.js";
import { logout } from "../controllers/auth/authLogout.js";
import { register } from "../controllers/auth/authRegister.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import { validateRegister } from "../middleware/validator.js";
import { getProfile } from "../controllers/profile/getProfile.js";
import { updateProfile } from "../controllers/profile/updateProfile.js";
import { createDiagnosis, deleteDiagnosis, getDiagnosticHistory } from "../controllers/diagnosis/diagnosis.js";


const router = Router();

router.get("/", (req,res)=>{
    res.send("Backend")
})

//autenticar
router.post("/api/register", validateRegister, register)
router.post("/api/login", login)
router.post("/api/logout", logout);
router.get('/authenticate', protectRoute, (req, res) => {
  return res.json({
    user: req.user,
  });
});
//Perfil del usuario
router.get("/api/user/profile", protectRoute, getProfile);
// Ruta para actualizar el perfil del usuario actual
router.put('/api/user/update-profile', protectRoute,updateProfile);


// POST route for creating a diagnosis
router.post('/api/diagnosis/createDiagnostic',protectRoute, createDiagnosis);

// GET route for fetching diagnostic history
router.get('/api/diagnosis',protectRoute, getDiagnosticHistory);
router.delete('/api/diagnosis/:id',protectRoute, deleteDiagnosis);


export default router;
