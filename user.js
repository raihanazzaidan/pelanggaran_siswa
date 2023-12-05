//inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./koneksi")

//implementasi library
const app = express.Router()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//endpoint akses data user
app.get("/user", (req,res) => {
    let sql = "select * from user"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                user: result
            }
        }
        res.json(response)
    })
})

//endpoint akses data user berdasarkan id
app.get("/user:id", (req,res) => {
    let data = {
        id_user: req.params.id
    }
    let sql = "select * from user where ?"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                user: result
            }
        }
        res.json(response)
    })
})

//endpoint simpan data user
app.post("/user", (req,res) => {

    //prepare data
    let data = {
        nama_user: req.body.nama_user,
        username: req.body.username,
        password: req.body.password
    }

    //sql query insert
    let sql = "insert into user set ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data inserted"
            }
        }
        res.json(response) //mengirim respon
    })
})

//endpoint mengubah data user
app.put("/user", (req,res) => {

    //prepare data
    let data = [
        {
            nama_user: req.body.nama_user,
            username: req.body.username,
            password: req.body.password
        },
        {
            id_user: req.body.id_user
        }
    ]

    let sql = "update user set ? where ?"

    //run query
    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                message: result.affectedRows + " data updated"
            }
        }
        res.json(response)
    })
})

app.delete("/user/:id", (req,res) => {
    let data = {
        id_user: req.params.id
    }
    let sql = "delete from user where ?"

    db.query(sql, data, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
             response = {
                message: result.affectedRows + " data deleted"
            }
        }
        res.json(response)
    })
})

app.listen(8001, () => {
    console.log("port 8001")
})