import db from '../models/index'
import {hashUserPassword, checkEmailExist,checkPhoneExist} from './loginRegisterService'


const getAllUser = async() =>{
    try {
        let users =  await db.User.findAll({
            attributes: ["id", "username", "email", "phone", "address", "bsx"],
            include: {model: db.Role, attributes: ["name","mota"]}
        });
        if(users){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: users
            }
        }else{
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}

const getUserWithPagination = async(page,limit) =>{
    try {
        let offset = (page - 1) * limit;
        const {count, rows}= await db.User.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ["id", "username", "email", "phone", "address"],
            include: {model: db.Role, attributes: ["name", "mota","id"]},
            order:[['id','ASC']]
        })


        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }

        return {
            EM: 'FETCH OK',
            EC: 0,
            DT: data,
        }

    } catch (e) {
            return{
                EM: 'loi o service',
                EC: 1,
                DT: []
            }
    }
}


const createUser= async(data) =>{
    try {
        let isEmailExist = await checkEmailExist(data.email);
        let isPhoneExist = await checkPhoneExist(data.phone);
        let hashPass = await hashUserPassword(data.password);
        if(isEmailExist === true){
            return{
                EM: 'đã tồn tại email này',
                EC: 1,
                DT: 'email'
            }
        }
        if(isPhoneExist === true){
            return{
                EM: 'SDT này đã được đăng kí',
                EC: 1,
                DT: 'phone'
            }
        }
        
        await db.User.create({...data, password: hashPass});
        return {
            EM: 'create OK',
            EC: 0,
            DT: [],
        }
    } catch (e) {
         return{
                EM: 'err from service',
                EC: 1,
                DT: []
            }
    }
}

const updateUser = async(data) =>{
    try {
        if(!data.roleid){
            return {
                EM: 'err  empty roleid',
                EC: 1,
                DT: 'role',
            }
        }
        let user = await db.User.findOne({
            where: { id: data.id}
        })

        if(user){
            await user.update({
                username: data.username,
                address: data.address,
                roleid: data.roleid
            })
            return{
                EM: 'update success',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy user',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'err from service',
                EC: 1,
                DT: [],
            }
    }
}

const deleteUser = async(id) =>{
    try {
        let user= await db.User.findOne({
            where: { id: id}
        })
        if(user){
            await user.destroy();
            return{
                EM: 'delete success',
                EC: 0,
                DT: []
            }
        }else {
            return{
                EM: 'ko ton tai user nay ',
                EC: 2,
                DT: []
            }
        }

        
    } catch (e) {
        return {
            EM: 'err from service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser,deleteUser,updateUser,createUser, getUserWithPagination
}
