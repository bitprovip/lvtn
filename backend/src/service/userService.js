import bcrypt from 'bcryptjs'; 
import mysql from 'mysql2/promise';
import bluebird from 'bluebird'

const salt = bcrypt.genSaltSync(10);

const hashUserPassword =(userPassword) =>{
    let hashPassword = bcrypt.hashSync(userPassword, salt)
    return hashPassword;
}

const createNewUser = async(email,password,username) =>{
    let hashPass = hashUserPassword(password);
    const connection = await mysql.createConnection({ host:'localhost', user: 'root', database:'luanvan', Promise:bluebird});
    try{
        const [rows,fields] = 
        await connection.execute('insert into user(email,password,username) value ( ?, ?, ?)', [email,hashPass,username]);
    }catch(error){
        console.log(">>>>error: ",error );
    }
}

const getUserList = async() =>{
    const connection = await mysql.createConnection({ host:'localhost', user: 'root', database:'luanvan', Promise:bluebird});

    let users=[];
    try{
        const [rows,fields] = await connection.execute('select * from user');
        return rows;

    }catch(error){
        console.log(">>>>error: ",error );
    }


    // let newUser= await d
}



const deleteUser = async (id ) =>{
    const connection = await mysql.createConnection({ host:'localhost', user: 'root', database:'luanvan', Promise:bluebird});
    try{
        const [rows,fields] = await connection.execute('delete from user where id =(?) ',id);
        return rows;

    }catch(error){
        console.log(">>>>error: ",error );
    }

}

module.exports={
    createNewUser,
    getUserList,
    deleteUser,
}

