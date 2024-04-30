// // import { PrismaClient } from '@prisma/client'

// // const prisma = new PrismaClient()

// import client from '@/lib/prismadb'

// async function getAllProduct() {
//     // await client.user.create({
//     //     data: {
//     //         name: 'Rich',
//     //         email: 'hello@prisma.com',
//     //         posts: {
//     //             create: {
//     //                 title: 'My first post',
//     //                 body: 'Lots of really interesting stuff',
//     //                 slug: 'my-first-post',
//     //             },
//     //         },
//     //     },
//     // })

//     const allUsers = await client.user.findMany({
//         include: {
//             posts: true,
//         },
//     })

//     return allUsers
// }

// getAllProduct()
//     .catch(async (e) => {
//         console.error(e)
//         process.exit(1)
//     })
//     .finally(async () => {
//         await client.$disconnect()
//     })