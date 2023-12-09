require('dotenv').config()
import db from '../models/index'
import bcrypt from 'bcryptjs'
import { Op } from 'sequelize';
import { getRoleWithGroups } from './JWTService';
import {createJWT} from '../middleware/JWTAction'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) =>{
    let hashPassword = bcrypt.hashSync(userPassword, salt);
    return hashPassword;
}

const checkEmailExist = async(userEmail) =>{
    let a = await db.User.findOne({
        where: {email: userEmail}
    })
    if(a){
        return true;
    }
    return false;
}

const checkPhoneExist = async(userPhone)=>{
    let a= await db.User.findOne({
        where: {
            phone: userPhone
        }
    })
    if(a){
        return true;
    }
    return false;
}

const registerNewUser=async(rawUserData)=>{
    try {
        let isEmailExist = await checkEmailExist(rawUserData.email);
        let isPhoneExist = await checkPhoneExist(rawUserData.phone);
        let hashPassword = hashUserPassword(rawUserData.password);
        if(isEmailExist === true){
            return{
                EM: 'email hop le',
                EC: 1 ,
            }
        }

        if(isPhoneExist===true){
            return{
                EM: 'phone hop le',
                EC:1,
            }
        }
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPassword,
            phone: rawUserData.phone,
            roleid: 2
        })

        return{
            EM:'tao tai khoan thanh cong',
            EC:0
        }

    } catch (e) {
        console.log(e);
        return{
            EM:'tao tai khoan ko thanh cong nhe',
            EC:2
        }
    }
}
const checkPassword = (inputPassword,hashPassword) => {
    return bcrypt.compareSync(inputPassword, hashPassword);
}

const handleUserLogin = async(rawData) => {
    try {
        let user = await db.User.findOne({
            where:{
                [Op.or]:[
                    {email: rawData.valueLogin},
                    {phone: rawData.valueLogin}
                ]
            }
        })

        if(user){
            let isCorrectPass= checkPassword(rawData.password , user.password);
            if(isCorrectPass === true){
                let roleWithGroups = await getRoleWithGroups(user);
                let payload = {
                    email: user.email,
                    roleWithGroups,
                    username: user.username,
                    id: user.id
                }
                let token = createJWT(payload);
                return{
                    EM:'ok!',
                    EC: 0,
                    DT:{
                        access_token: token,
                        roleWithGroups,
                        email: user.email,
                        username: user.username,
                        id: user.id
                    }
                }
            }
        }
        return{
                    EM:'thong tin dn sai',
                    EC: 1,
                    DT:''
        }
    } catch (error) {
        return{
                    EM:'có lỗi ở service',
                    EC: -2,
                
                }        
    }
}





 module.exports= {
    registerNewUser,handleUserLogin, hashUserPassword, checkEmailExist,checkPhoneExist
 }