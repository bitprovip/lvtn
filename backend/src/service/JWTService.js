import db from '../models/index'

const getRoleWithGroups = async (user) => {
    let groups = await db.Role.findOne({
        where: { id: user.roleid}, 
        attributes: ["id", "name", "mota"],
        include: {
            model: db.Group,
            attributes: ["id", "url", "mota"],
            through: { attributes: [] }
        }
    })
    return groups ? groups : {};
}

module.exports = {
    getRoleWithGroups
}