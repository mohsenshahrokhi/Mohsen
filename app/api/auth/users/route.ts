// import { getUserByEmail, registerUser } from "@/lib/controllers/userController"
// import { NewResponse, NewUserRequest } from "@/type"
// import { NextResponse } from "next/server"

// export const POST = async (req: Request): Promise<NewResponse> => {
//     /* const session = await unstable_getServerSession(req, res, authOptions)
// if (session) {
//   // Signed in
//   console.log("Session", JSON.stringify(session, null, 2))
// } else {
//   // Not Signed in
//   res.status(401)
// }  */
//     const { form } = (await req.json()) as NewUserRequest
//     const oldUser = await getUserByEmail(form.email)
//     if (oldUser) {
//         return NextResponse.json({ message: 'failed to create a new product', error: 'failed to create a new product' }, { status: 422 })
//     }
//     const user = await registerUser({ ...form })
//     return NextResponse.json({
//         message: "Success",
//         user: {
//             id: user._id,
//             name: user.name,
//             email: user.email,
//             role: user.role
//         }
//     },
//         { status: 201 }
//     )

// }