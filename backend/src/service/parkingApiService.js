import db from '../models/index'

const createNewParking = async(data)=>{
    try {
        await db.Parking.create(data);
        return {
            EM: 'Đợi admin xác thực thông tin ...',
            EC: 0,
            DT: [],
        }
    } catch (error) {
        return{
            EM: 'err from service',
            EC: 1,
            DT: []
        }
    }
}
const getAllParking = async() =>{
    try {
        let parkings =  await db.Parking.findAll({
            where: {status: 1},
            attributes: ["id", "name", "address", "price", "mota", "status","soluong"],
            include: {model: db.User, attributes: ["username","email","phone"]}
        });
        if(parkings){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: parkings
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

const getParkingConfirm = async() =>{
    try {
        let parkings =  await db.Parking.findAll({
            where: {status: 2},
            attributes: ["id", "name", "address", "price", "mota", "status","soluong","tc"],
            include: {model: db.User, attributes: ["username","email","phone"]}
        });
        if(parkings){
            return{
                EM: 'GET DATA SUCCESS',
                EC: 0,
                DT: parkings
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

const updateParkingConfirm = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                status: 2,
                tc: 1
            })
            return{
                EM: 'Đã xác thực bãi xe',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateTC = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                status: 3,
            })
            return{
                EM: 'KQ: Bãi đỗ ko đạt điều kiện',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateOn = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                tc: 1,
            })
            return{
                EM: 'Đã đóng bãi đỗ',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}
const updateOff = async(data) =>{
    try {
        let parking = await db.Parking.findOne({
            where: { id: data.id}
        })

        if(parking){
            await parking.update({
                tc: 2,
            })
            return{
                EM: 'Đã mở bãi đỗ',
                EC: 0,
                DT: '',
            }


        }else{
            return{
                EM: 'ko tìm thấy bãi đỗ',
                EC: 2,
                DT: '',
            }
        }


    } catch (e) {
            return{
                EM: 'lỗi ở parking service',
                EC: 1,
                DT: [],
            }
    }
}

module.exports = {
    createNewParking, getAllParking, getParkingConfirm, updateParkingConfirm,updateTC,updateOn,updateOff
    // getAllUse,deleteUser,updateUser,createUser,
}