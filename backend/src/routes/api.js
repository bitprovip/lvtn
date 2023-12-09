import express from "express"
import apiController  from "../controller/apiController"
import userController from "../controller/userController"
import roleController from "../controller/roleController"
import { checkUserJWT, checkUserPermission} from '../middleware/JWTAction'
import groupController from "../controller/groupController"
import parkingController from "../controller/parkingController"

const router=express.Router();

/**
 * 
 * @param {*} app: express app
 */



const initApiRoutes=(app)=>{
    router.all("*", checkUserJWT, checkUserPermission);
    router.post("/register", apiController.handleRegister);
    router.post("/login", apiController.handleLogin);
    router.post("/logout", apiController.handleLogout);
    
    router.get("/account",userController.getUserAccount);

    router.get("/user/read", userController.readFunc);
    router.post("/user/create", userController.createFunc);
    router.put("/user/update", userController.updateFunc);
    router.delete("/user/delete", userController.deleteFunc);

    router.get("/role/read", roleController.readFunc);

    //group routes
    router.get("/group/read", groupController.readFunc);
    router.post("/group/create", groupController.createFunc);
    router.put("/group/update", groupController.updateFunc);
    router.delete("/group/delete", groupController.deleteFunc);

    //bai do routes

    router.get("/parking/read", parkingController.readFunc);
    router.get("/parking/readConfirm", parkingController.readConfirm);
    router.post("/parking/create", parkingController.createFunc);
    router.put("/parking/updateConfirm", parkingController.updateConfirmFunc);
    router.put("/parking/updateUnConfirm", parkingController.updateTC);
    router.put("/parking/updateOn", parkingController.updateOn);
    router.put("/parking/updateOff", parkingController.updateOff);
    // router.delete("/parking/delete", parkingController.deleteFunc);

    return app.use("/api/v1/",router);
}

export default initApiRoutes