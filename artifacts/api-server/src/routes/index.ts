import { Router, type IRouter } from "express";
import healthRouter from "./health";
import businessPhotosRouter from "./business-photos";

const router: IRouter = Router();

router.use(healthRouter);
router.use(businessPhotosRouter);

export default router;
