import express from 'express';
/* import menuRestControllers from '../menu/routes/menuRestControllers.js'; */
/* import usersRouterController from '../users/routes/userRestControllers.js'; */
import { handleError } from '../utils/errorHandler.js';
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Bootke API is Running");
});
/* router.use("/menu", menuRouterControllers); */
/* router.use("/users", usersRouterController); */
router.use((req, res) => {
    handleError(res, 404, "Path not found");
});

export default router; 