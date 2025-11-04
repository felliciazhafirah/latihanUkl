import { PrismaClient } from '@prisma/client';
import md5 from 'md5';
const prisma = new PrismaClient();

export const addUser = async (req, res) => {
    const { name, username, password, role} = req.body
    try {
        const result = await prisma.user.create({
            data: {
                name: name,
                username : username,
                password : md5(password),
                role : role
            }
        })
        res.status(200).json(
            {
                status : "succsess",
                message : "pengguna berhasil ditambahkan",
                data : result
            }
        )
    } catch (error) {
        console.error("Error", error)    // keluar di terminal
        res.status(500).json({ msg: error.message })
      }
}


export const getAllData = async (req, res) => {
    try {
        const response = await prisma.user.findMany()
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const editData = async (req, res) => {
    const { name, username, password, role} = req.body
    try {
        const result = await prisma.user.update({
            where: {
                username: req.params.username
            },
            data: {
                name: name,
                username : username,
                password : md5(password),
                role : role
            }
        })
        res.status(200).json(
            {
                status : "succsess",
                message : "pengguna berhasil diubah",
                data : result
            }
        )
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const getDataByUsn = async (req, res) => {
    try {
        const result = await prisma.user.findUnique({
            where: {
                username: req.params.username
            }
        })
        res.status(200).json(result)
    } catch (error) {
        res.status(404).json({ msg: error.message })
    }
}

export const deleteData = async (req, res) => {
    try {
        const result = await prisma.user.delete({
            where: {
                username: req.params.username
            },
        })
        res.status(200).json(
            {
                message: "data berikut berhasil dihapus",
                data: result
            }
        )
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

