import loginRegisterService from '../service/loginRegisterService'

const testApi=(req,res)=>{
    return res.status(200).json({
        message: 'ok',
        data:'test'
    })
}

const handleRegister = async(req,res)=>{
    try {
        if(!req.body.email || !req.body.password ){
            return res.status(200).json({
                EM: 'thieu thong tin',
                EC:'1',
                DT:'',
            })
        }
        if(req.body.password && req.body.password.length < 4){
            return res.status(200).json({
                EM: 'pass qua ngan',
                EC:'1',
                DT:'',
            })
        }
        let data = await loginRegisterService.registerNewUser(req.body)
        return res.status(200).json({
                EM: data.EM,
                EC:data.EC,
                DT:'',
        })
    } catch (e) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
                })
    }
}

const handleLogin = async(req,res) =>{
    try {
        let data = await loginRegisterService.handleUserLogin(req.body);
        if(data && data.DT && data.DT.access_token) {
            res.cookie("jwt", data.DT.access_token, {httpOnly: true, maxAge: 60*60*1000});
        }
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT,
        })
    } catch (e) {
        // console.log(e)
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}

const handleLogout = (req,res) =>{
    try {
        res.clearCookie("jwt");
        return res.status(200).json({
            EM: 'clear cookie done',
            EC: 0,
            DT: ''
        })
    } catch (error) {
        return res.status(500).json({
                EM: 'err from server',
                EC:'-1',
                DT:'',
        })
    }
}

module.exports={
    testApi,handleRegister,handleLogin,handleLogout
}