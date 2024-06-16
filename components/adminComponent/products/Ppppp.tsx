'use client'

import HandleEnqueueSnackbar from "@/utils/HandleEnqueueSnackbar"
import { zodResolver } from "@hookform/resolvers/zod"
import { Box, Button, Fab, FormControl, FormControlLabel, FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from "@mui/material"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import AddIcon from '@mui/icons-material/Add'
import queryString from "query-string"
import { HiXMark } from "react-icons/hi2"
import { useEffect, useState, useTransition } from "react"
import { getPBy, getProducts, updateProduct } from "@/actions/product"
import { DevTool } from "@hookform/devtools"
import { TUserSchema } from "@/ZSchemas/UserSchema"
import { EditProductSchema, TEditProductSchema, TProductSchema } from "@/ZSchemas/ProductSchema"
import { TCategorySchema } from "@/ZSchemas/CategorySchema"

type Props = {
    product?: TProductSchema
    stringCats?: string
    users?: TUserSchema[]
    searchParams?: string
}

async function pp() {
    const params = {
        limit: 1,
        populate: 'category.name,category.images,category.latinName,author.displayName'
    }

    const stringifyParams = queryString.stringify(params)
    return (await getProducts(stringifyParams)).products

}

function EditProductForm({ product, searchParams, stringCats, users }: Props) {

    const router = useRouter()
    const [property, setProperty] = useState<{ name: string, values: string }[]>()
    const [p, setP] = useState<TProductSchema[]>()
    // const product = JSON.parse(productInfo!) as TProductSchema
    // const product = {} as TProductSchema
    // const cats = JSON.parse(stringCats!) as TCategorySchema[]
    // const cats: TCategorySchema[] = []
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login')
        },
    })

    useEffect(() => {
        async function pp() {
            const params = {
                limit: 1000
            }

            const stringifyParams = queryString.stringify(params)
            const q = (await getProducts(stringifyParams))
            setP(q.products)

        }

        pp()
    }, [])

    const PParams = {
        populate: 'category.name,category.images,category.latinName,category.propertys,author.displayName,seller.displayName'
    }
    const stringifyPParams = queryString.stringify(PParams)

    const user = session?.user
    const [isPending, startTransition] = useTransition()
    const accessToken = user?.accessToken || ''

    // useEffect(() => {
    //     const catP = cats?.filter((cat) => cat._id === product.category?._id)[0]
    //     catP && setProperty(catP.propertys)
    // }, [product.category?._id])
    console.log(p)

    const {
        category: editCategory,
        description: editDescription,
        images: editImage,
        price: editPrice,
        discount: editDiscount,
        propertys: editPropertys,
        ratings: editRatings,
        recipe: editRecipe,
        reviews: editReviews,
        seller: editSeller,
        author: editAuthor,
        slug: editSlug,
        title: editTitle,
        stock: editStock,
        colorIcon: editColorIcon,
        icon: editIcon,
        images: editImages,
        type: editType,
        _id,
    } = product as TProductSchema

    const form = useForm<TEditProductSchema>({
        resolver: zodResolver(EditProductSchema),
        defaultValues: {
            category: editCategory?._id || '',
            description: editDescription || '',
            images: editImage || [],
            price: editPrice || '0',
            discount: editDiscount || '',
            ratings: editRatings || '',
            recipe: editRecipe || '',
            seller: editSeller?._id || '',
            author: editAuthor?._id || '',
            slug: editSlug || '',
            title: editTitle || '',
            stock: editStock || '',
            colorIcon: editColorIcon,
            icon: editIcon,
            type: editType,
            // reviews: editReviews || [],
            propertys: editPropertys || [],

        }
    })

    const { register, control } = form

    if (form === undefined) {
        return <h3>loading...</h3>
    }

    const onSubmit = (values: TEditProductSchema) => {

        console.log('values', values);

        // createCategory({ values, accessToken })
        //     .then((data) => {
        //         console.log(data)

        //         if (data.success === true) {

        //             HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })

        //             // parent ?
        //             //     router.push(`/dashboard/siteSettings/`) :
        //             //     router.push(`/dashboard/siteSettings`)
        //         } else {

        // HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
        //         }

        //     })
        // })


        // startTransition(() => {
        //     updateProduct({ _id: product._id, values, accessToken })
        //         .then((data) => {
        //             console.log(data)

        //             if (data.success === true) {

        //                 HandleEnqueueSnackbar({ variant: 'success', msg: data.msg })
        //                 router.push(`/dashboard/product`)
        //             } else {

        //                 HandleEnqueueSnackbar({ variant: 'error', msg: data.msg })
        //             }

        //         })
        // })
    }

    console.log('form', form)

    return (
        <div></div>
    )
}

export default EditProductForm