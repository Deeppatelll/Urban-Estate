import express from "express";
import { deleteUser, test, updateUser,getUserListings,getUser, addtofavourites, getFevs} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get('/test', test);
router.post('/update/:id', verifyToken, updateUser); // Ensure it's POST
router.delete('/delete/:id', verifyToken, deleteUser);
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)
router.post('/addtofav/:id',verifyToken,addtofavourites);
router.get('/getfavs/:id',verifyToken,getFevs);
export default router;

