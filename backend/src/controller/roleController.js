import roleService from '../service/roleService';

const readFunc = async(req,res) =>{
    try {
        let data = await roleService.getRoles();
        return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT,
        })
    } catch (error) {
        return res.status(500).json({
                EM: 'err from server',
                EC: '-1',
                DT: '',
        })
    }
}

module.exports = {
    readFunc
}