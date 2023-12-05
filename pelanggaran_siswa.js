const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const db = require("./koneksi")

//implementasi library
const app = express.Router()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.post("/pelanggaran_siswa", (req,res) => {
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
    }

    let pelanggaran = JSON.parse(req.body.pelanggaran)

    let sql = "insert into pelanggaran_siswa set ?"

    db.query(sql, data, (error, result) => {
        let response = null

        if (error) {
            res.json({message: error.message})
        } else {
            let lastID = result.insertID

            let data = []
            for (let index = 0; index < pelanggaran.length; index++) {
                data.push([
                    lastID, pelanggaran[index].id_pelanggaran
                ])
            }

            let sql = "insert into detail_pelanggaran_siswa values ?"
            db.query(sql, [data], (error, result) => {
                if (error) {
                    res.json({message: error.message})
                } else {
                    res.json({message: "Data has been inserted"})
                }
            })
        }
    })
})
app.get("/pelanggaran_siswa:id", (req,res) => {
    let data = {
        id_pelanggaran_siswa: req.params.id
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
app.post("/pelanggaran_siswa", (req,res) => {

    //prepare data
    let data = {
        id_siswa: req.body.id_siswa,
        id_user: req.body.id_user,
        waktu: moment().format('YYYY-MM-DD HH:mm:ss')
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
app.put("/pelanggaran_siswa", (req,res) => {

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

app.delete("/pelanggaran_siswa/:id", (req,res) => {
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

app.get("/pelanggaran_siswa", (req,res) => {
    let sql = "select p.id_pelanggaran_siswa, p.id_siswa, p.waktu, s.nis, s.nama_siswa, p.id_user, u.nama_user " + "from pelanggaran_siswa p join siswa s on p.id_siswa = s.id_siswa " + "join user u on p.id_user = u.id_user"

db.query(sql, (error, result) => {
    if(error){
        res.json({message: error.message})
    }else{
        res.json({
            count: result.length,
            id_pelanggaran_siswa: result
        })
    }
})
})

app.listen(8001, () => {
    console.log("port 8001")
})