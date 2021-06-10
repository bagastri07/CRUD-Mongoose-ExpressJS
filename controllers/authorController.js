const author = require('../models/author')
const Author = require('../models/author')
const response = require('../_helper/response')

const AuthorController = {
    create: (req, res) => {
        const name = (req.body.name).toUpperCase()
        Author.findOne({name: name}, async (err, doc) => {
            if (err) return response(res, 500, err)
            if (doc) return response(res, 400, false, 'Nama Author Sudah ada')
            if (!doc) {
                const authorData = req.body

                const newAuthor = new Author(authorData)

                //validate error
                let error = await newAuthor.validateSync()
                if (error) return response(res, 400, false, error)

                const saveAuthor = await newAuthor.save()
                return response(res, 200, true ,'Data berhasil diinput', saveAuthor)
            }
        })
    },
    read: (req, res) => {
        Author.find((err, doc) =>{
            if (err) return response(res, 500, false, err)
            return response (res, 200, true, 'Request Sukses', doc)
        })
    },
    update: (req, res) => {
        Author.findByIdAndUpdate(req.params.id, req.body,  {new:true, runValidators: true},(err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 500, true, 'Data tidak ditemukan', doc)
            if (doc) return response(res, 200, true, 'Data Berhasil di Update!', doc)
        })
    },
    delete: (req, res) => { 
        Author.findByIdAndRemove(req.params.id,(err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc)return response(res, 400, true, 'Data tidak ditemukan')
            if (doc) return response(res, 200, true, 'Data berhasil dihapus!', doc)
        })
    },
    addBook: (req, res) => {
        Author.findByIdAndUpdate(req.params.id, {$push: {'book': req.body}}, {upsert: true, new: true}, (err, doc) => {
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 500, true, 'Data tidak ditemukan', doc)
            if (doc) return response(res, 200, true, 'Data Berhasil di Update!', doc)
        })
    },
    deleteBook: (req, res) => {
        author.findByIdAndUpdate(req.params.id1, {$pull: {'book': {'_id': req.params.id2}}}, {new: true, upsert: true}, (err, doc)=>{
            if (err) return response(res, 500, false, err)
            if (!doc) return response(res, 500, true, 'Data tidak ditemukan', doc)
            if (doc) return response(res, 200, true, 'Data Berhasil di Update!', doc)
        })
    }
}

module.exports = AuthorController