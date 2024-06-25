'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import queryString from "query-string";
function NavItem({ menuCategories }) {
    const router = useRouter();
    // const search = useSearchParams()
    // console.log(search.toString());
    const [active, setActive] = useState('');
    const act = useCallback((category) => {
        const parsed = {
            theme: 'light',
            select: 'title,price,category,recipe',
            category,
            populate: 'category.name,category.images,category.eName',
            'stock>': 1
        };
        const stringified = queryString.stringify(parsed);
        setActive(category);
        router.push(`/menuPage/?${stringified}`);
        // router.push(`/menuPage/?select=title,price,category,recipe&category=${e}&populate=category.name,category.images&stock>1`)
    }, [router]);
    useEffect(() => {
        menuCategories && setActive(menuCategories[0]._id || '');
        menuCategories && act(menuCategories[0]._id || '');
    }, [menuCategories, act]);
    return (<>
            {(menuCategories === null || menuCategories === void 0 ? void 0 : menuCategories.length) > 0 && menuCategories.map((item) => (<li key={item._id} className={`flex min-w-fit mr-3`}>
                        <div onClick={() => act(item._id)} className=' duration-700'>

                            <div className=' cursor-pointer'>
                                <div className={`duration-300 ${active === item._id ? 'opacity-0 -translate-y-10' : 'opacity-1'}`}>
                                    <Image priority src={`/uploads/images/${item.icon}`} height={40} width={40} alt={item.eName}/>
                                </div>

                                <div className={`justify-center items-center duration-700 ${active === item._id ? 'opacity-1 -translate-y-5 flex scale-150' : 'opacity-0 hidden '}`}>
                                    <Image priority src={`/uploads/images/${item.colorIcon}`} height={40} width={40} alt={item.eName}/>
                                </div>
                            </div>
                        </div>
                    </li>))}
        </>);
}
export default NavItem;
//# sourceMappingURL=NavItem.js.map