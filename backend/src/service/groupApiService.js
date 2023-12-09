import db from '../models/index'

const createNewGroups = async(roles)=>{
    try {
        let currentRoles = await db.Group.findAll({
            attributes:['url','mota'],
            raw: true
        })
        const persists = roles.filter(({url: url1}) =>
            !currentRoles.some(({url: url2}) => url1===url2)
        );

        if(persists.length === 0 ){
            return{
                EM: 'nothing to create',
                EC: 0,
                DT: []
            }
        }

        await db.Group.bulkCreate(persists);
        return{
            EM: `create success:  ${persists.length} roles...`,
            EC: 0,
            DT: []
        }
        
    } catch (error) {
        return{
            EM: 'something wrongs with service',
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    createNewGroups
}