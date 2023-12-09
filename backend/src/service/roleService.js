import db from '../models/index'

const getRoles = async()=>{
    try {
        let data = await db.Role.findAll({
            order:[['name','ASC']]
        });
        return{
            EM: 'get role success',
            EC: 0,
            DT: data
        }
    } catch (error) {
        return{
            EM: 'err from service',
            EC: 1,
            DT: [data]
        }
    }
}

module.exports = {
    getRoles
}