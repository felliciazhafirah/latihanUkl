import md5 from 'md5'//metode enskripsi//
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const secretKey = 'moklet'

export const authenticate = async (req, res) => {
    const { username, password } = req.body
    try {
        const userCek = await prisma.user.findUnique({
            where: {
                username: username,
                password: md5(password)
            }
        })
        if (userCek) {
            const payload = JSON.stringify(userCek)
            const token = jwt.sign(payload, secretKey)
            res.status(200).json({
                succes: true,
                logged: true,
                message: 'login succes',
                token: token,
                data: userCek
            })
        } else {
            res.status(404).json({
                succes: false,
                logged: false,
                message: 'username or password invalid'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: error.message
        })
    }
}
