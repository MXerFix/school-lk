import { Router } from "express";
import router_v1 from "./v1/v1";


const router = Router();

router.use('/v1', router_v1)

export default router