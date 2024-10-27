import 'server-only'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { prisma } from '@/prisma/db'
import { cookies } from 'next/headers'
import { COOKIE_NAME } from './constants'

const SECRET = 'use_an_ENV_VAR'

export const createTokenForUser = (userId) => {
    const token = jwt.sign({ id: userId }, SECRET)
    return token
}

export const getUserFromToken = async (token) => {
    const payload = jwt.verify(token.value, SECRET)

    const user = await prisma.user.findFirst({
        where: {
            id: payload.id
        }
    })

    return user
}

export const signin = async ({ userName, password }) => {
    const user = await prisma.user.findFirst({
        where: {
            userName: userName
        }
    })

    if (!user) return { error: 'المستخدم غير موجود' }

    const correctPW = await comparePW(password, user.password)

    if (!correctPW) {
        return { error: 'كلمة السر خاطئة' }
    }

    const token = createTokenForUser(user.id)

    return { user, token }
}

export const hashPW = (password) => {
    return bcrypt.hash(password, 10)
}

export const comparePW = (password, hashedPW) => {
    return bcrypt.compare(password, hashedPW)
}

export const getCurrentUser = async () => {
    const token = cookies().get(COOKIE_NAME)
    if (!token) redirect('/signin')

    const user = await getUserFromToken(token)
    if (!user) redirect('/signin')

    return user
}