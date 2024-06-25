'use client';
import axios from 'axios';
import TEInput from "@/components/ui/components/Input/Input";
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import ButtonWithRipple from '@/components/ui/components/Button/ButtonWithRipple';
import { useSession } from 'next-auth/react';
import TETextarea from '@/components/ui/components/Textarea/TETextarea';
import HSelect from '@/components/ui/components/HSelect/HSelect';
function CategoryForm() {
    var _a, _b, _c;
    const router = useRouter();
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/login');
        },
    });
    const accessToken = (session === null || session === void 0 ? void 0 : session.user) && ((_a = session === null || session === void 0 ? void 0 : session.user) === null || _a === void 0 ? void 0 : _a.accessToken) || '';
    // const {
    //     name: editName,
    //     parent: editParent,
    //     propertys: editPropertys,
    //     _id,
    //     slug: editSlug,
    //     eName: editEName,
    //     colorIcon: editColorIcon,
    //     icon: editIcon,
    //     images: editImages,
    //     type: editType,
    // } = categoryInfo
    const [parentSelectOptions, setParentSelectOptions] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [selectIcon, setSelectIcon] = useState('');
    const [gallerys, setGallerys] = useState([]);
    const [form, setForm] = useState();
    const [selectParent, setSelectParent] = useState({ id: '', name: '' });
    const [selectMeasure, setSelectMeasure] = useState({ id: '', name: '' });
    // const [form, setForm] = useState<AddCat>(
    //     {
    //         name: editName || '',
    //         slug: editSlug || '',
    //         parent: editParent || '',
    //         propertys: editPropertys || [{ name: '', values: '' }],
    //         eName: editEName || '',
    //         colorIcon: editColorIcon || '',
    //         icon: editIcon || '',
    //         images: editImages || [''],
    //         type: editType || ''
    //     }
    // ) 
    const getAllGallery = useCallback(async () => {
        accessToken && await axios.get('/api/gallery', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const gallery = response.data.gallerys;
            setGallerys(gallery);
        });
    }, [accessToken]);
    useEffect(() => {
        getAllGallery();
    }, [getAllGallery]);
    useEffect(() => {
        accessToken && axios.get('/api/category', {
            headers: {
                Authorization: `${accessToken}`
            }
        }).then(response => {
            const options = [];
            let defultOption = { id: '', name: '' };
            const allCategories = response.data.categorys;
            allCategories.forEach((element) => {
                options.push({ id: element._id, name: element.name });
                // if (form.parent === element._id) {
                //     defultOption = { id: element._id!, name: element.name! }
                // }
            });
            setParentSelectOptions(options);
            setSelectParent(defultOption);
        });
    }, [accessToken]);
    function handleStateChange(fieldName, value) {
        // if (fieldName === 'parent' && value !== undefined) {
        //     setForm((prevState) => ({ ...prevState, parent: value?.id }))
        //     setSelectParent(value)
        // } else {
        //     setForm((prevState) => ({ ...prevState, [fieldName]: value }))
        //     if (fieldName === 'name' && value !== undefined) {
        //         const label = value.split(' ').join('_')
        //         setForm((prevState) => ({ ...prevState, slug: label }))
        //     }
        // }
    }
    function handleProperty() {
        // const oldForm = { ...form }
        // oldForm?.propertys?.push({ name: '', values: '' })
        // setForm(oldForm)
    }
    function handleNameProperty(index, value) {
        //     const oldForm = { ...form }
        //     oldForm.propertys![index].name = value
        //     setForm(oldForm)
    }
    function handleValueProperty(index, value) {
        //     const oldForm = { ...form }
        //     oldForm.propertys![index].values = value
        //     setForm(oldForm)
    }
    function handleDeleteProperty(index) {
        //     const oldForm = { ...form }
        //     oldForm.propertys!.splice(index, 1)
        //     setForm(oldForm)
    }
    function setCheckAdd(e) {
        //     const type = e ? '1' : ''
        //     setForm((prevState) => ({ ...prevState, type }))
    }
    function selected(e) {
        setIsOpen(true);
        setSelectIcon(e);
    }
    function setIcon(e) {
        //     if (selectIcon === 'images') {
        //         const oldForm = { ...form }
        //         if (oldForm.images?.includes(e)) {
        //             const has = oldForm.images?.filter(i => i !== e)
        //             oldForm.images = ['']
        //             has.length > 0 && has.map((i) => {
        //                 oldForm.images?.push(i)
        //             })
        //         } else oldForm.images?.push(e)
        //         setForm(oldForm)
        //     } else {
        //         setForm((prev) => ({ ...prev, [selectIcon]: e }))
        //         setIsOpen(false)
        // }
    }
    const items = <div className=' flex flex-col gap-2 w-full border rounded-md p-2'>

        <TEInput name='eName' size='lg' label="نام لاتین"/>

    </div>;
    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        // if (_id) {
        //     await axios.patch('/api/category/' + _id, { data: form }, {
        //         headers: {
        //             Authorization: `${accessToken}`
        //         }
        //     })
        // } else {
        //     await axios.post('/api/category', { data: form }, {
        //         headers: {
        //             Authorization: `${accessToken}`
        //         }
        //     })
        // }
        router.push('/dashboard/invoice');
        setIsLoading(false);
    }
    console.log('form', form);
    return (<div className=" flex flex-col w-full">

            <form onSubmit={handleSubmit} className=" flex space-y-6 w-full gap-y-2 flex-col">
                <h1 className=' flex w-full justify-center items-center'>اضافه کردن فاکتور جدید</h1>
                <div className="flex flex-col w-full gap-2">

                    <TEInput onChange={e => handleStateChange('title', e.target.value)} value={form === null || form === void 0 ? void 0 : form.title} type="text" size='lg' name="title" label="عنوان" required/>

                    <TEInput onChange={e => handleStateChange('freight', e.target.value)} value={form === null || form === void 0 ? void 0 : form.freight} type="number" size='lg' name="freight" label="کرایه حمل" required/>

                    <TEInput onChange={e => handleStateChange('price', e.target.value)} value={form === null || form === void 0 ? void 0 : form.price} type="number" size='lg' name="price" label="قیمت محصول" required/>

                    <TEInput onChange={e => handleStateChange('stock', e.target.value)} value={form === null || form === void 0 ? void 0 : form.stock} type="number" size='lg' name="stock" label="تعداد" required/>

                    <TETextarea onChange={e => handleStateChange('description', e.target.value)} value={form === null || form === void 0 ? void 0 : form.description} type="text" size='lg' name="description" label="توضیحات" required/>

                    <HSelect value={selectMeasure} options={parentSelectOptions} handleStateChange={e => handleStateChange('measure', e)}/>
                    <HSelect value={selectParent} options={parentSelectOptions} handleStateChange={e => handleStateChange('seller', e)}/>
                    <HSelect value={selectParent} options={parentSelectOptions} handleStateChange={e => handleStateChange('purchaseDate', e)}/>
                    <HSelect value={selectParent} options={parentSelectOptions} handleStateChange={e => handleStateChange('author', e)}/>

                    {/* <div className=' flex flex-col w-full justify-between items-center mt-3'>
            <div className='flex mb-3 w-full justify-between items-center'>
                <p>اضافه کردن جزییات بیشتر</p>
                <Checkbox id='addPhoto' checked={form.type === '1' ? true : false} setCheck={(e) => setCheckAdd(e)} />
            </div>
            {form?.type === '1' && items}
        </div> */}
                </div>
                <div className=' flex flex-col max-h-80 overflow-y-auto gap-2 border-t-2 p-2 w-full '>
                    <h1>ویژگی ها</h1>

                    {(form === null || form === void 0 ? void 0 : form.propertys) && ((_b = form.propertys) === null || _b === void 0 ? void 0 : _b.length) > 0 && ((_c = form.propertys) === null || _c === void 0 ? void 0 : _c.map((p, index) => (<div className=' flex flex-col border rounded-md p-3 gap-3 w-full' key={index}>

                            <TEInput type="text" size='lg' 
        // value={form?.propertys![index]?.name}
        onChange={e => handleNameProperty(index, e.target.value)} id={`nameId_${index}`} label="نام ویژگی" required></TEInput>

                            <TEInput type="text" size='lg' 
        // value={form?.propertys![index]?.values}
        onChange={e => handleValueProperty(index, e.target.value)} id={`valueId_${index}`} label="نام مقدار ویژگی" required></TEInput>

                            <ButtonWithRipple name='remove' size='large' onClick={() => handleDeleteProperty(index)}>
                                حذف
                            </ButtonWithRipple>

                        </div>)))}

                </div>

                <div className=' flex flex-col justify-between w-full gap-3 items-center border-t-2 p-2'>
                    <ButtonWithRipple name='addPropertis' color='green' size='large' onClick={handleProperty}>
                        اضافه کردن ویژگی جدید
                    </ButtonWithRipple>

                    {/* <SubmitButton
            size='large'
            name='submit'
        >
            {
                !_id ? !isLoading ? ' ثبت دسته بندی جدید' : ' در حال اضافه کردن دسته بندی جدید...' : !isLoading ? 'ویرایش' : ' در حال ویرایش...'
            }
        </SubmitButton> */}

                    <ButtonWithRipple name='cancel' color='purple' size='large' onClick={() => router.push('/dashboard/invoice')}>
                        انصراف
                    </ButtonWithRipple>
                </div>
            </form>
        </div>);
}
export default CategoryForm;
//# sourceMappingURL=InvoiceForm.js.map