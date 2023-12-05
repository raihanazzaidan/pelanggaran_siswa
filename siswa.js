//inisiasi library
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./koneksi")

//implementasi library
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//endpoint akses data siswa
app.get("/siswa", (req,res) => {
    let sql = "select * from siswa"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

//endpoint akses data siswa berdasarkan id
app.get("/siswa:id", (req,res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "select * from siswa where ?"

    db.query(sql, (error, result) => {
        let response = null
        if (error){
            response = {
                message: error.message
            }
        } else {
            response = {
                count: result.length,
                siswa: result
            }
        }
        res.json(response)
    })
})

//endpoint simpan data siswa
app.post("/siswa", (req,res) => {

    //prepare data
    let data = {
        nis: req.body.nis,
        nama_siswa: req.body.nama_siswa,
        kelas: req.body.kelas,
        poin: req.body.poin
    }

    //sql query insert
    let sql = "insert into siswa set ?"

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

//endpoint mengubah data siswa
app.put("/siswa", (req,res) => {

    //prepare data
    let data = [
        {
            nis: req.body.nis,
            nama_siswa: req.body.nama_siswa,
            kelas: req.body.kelas,
            poin: req.body.poin
        },
        {
            id_siswa: req.body.id_siswa
        }
    ]

    let sql = "update siswa set ? where ?"

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

app.delete("/siswa/:id", (req,res) => {
    let data = {
        id_siswa: req.params.id
    }
    let sql = "delete from siswa where ?"

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