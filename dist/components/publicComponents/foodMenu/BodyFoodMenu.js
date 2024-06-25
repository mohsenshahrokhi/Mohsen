import Banner from './Banner';
import AnimateCharacter from './AnimateCharacter';
import AnimateWord from './AnimateWord';
const BodyFoodMenu = ({ products }) => {
    var _a, _b, _c, _d, _e, _f, _g;
    if ((products === null || products === void 0 ? void 0 : products.length) === 0) {
        return (<h3>loading...</h3>);
    }
    // console.log(products);
    return (<div className="md:flex-shrink-0">
            <div className="relative overflow-hidden bg-cover bg-no-repeat">
                {(products === null || products === void 0 ? void 0 : products.length) > 0 && ((_a = products[0]) === null || _a === void 0 ? void 0 : _a.category) && ((_b = products[0]) === null || _b === void 0 ? void 0 : _b.category.images) && ((_c = products[0]) === null || _c === void 0 ? void 0 : _c.category.images.length) > 0 &&
            <Banner banner={(_e = (_d = products[0]) === null || _d === void 0 ? void 0 : _d.category) === null || _e === void 0 ? void 0 : _e.images[0]} item={(_g = (_f = products[0]) === null || _f === void 0 ? void 0 : _f.category) === null || _g === void 0 ? void 0 : _g.eName}/>}
                {/* <div className=' flex w-full h-screen'>
            slide down
        </div> */}

                <div className=' grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2 p-2'>{(products === null || products === void 0 ? void 0 : products.length) > 0 && products.map((product) => (<div className='' key={product._id}>
                        <div className=' flex justify-between items-center px-3'>
                            <AnimateWord text={product.title} textClassName=' inline-flex text-zinc-200 ' className=' text-zinc-700' el='span'/>
                            <span className=" flex flex-col whitespace-nowrap rounded-full bg-success-100 px-[1em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[1.2em] font-bold leading-none text-success-700">
                                <AnimateCharacter text={new Intl.NumberFormat('en').format(product.price).toString()} el='span' textClassName=' inline-flex float-left' className=' text-lg flex flex-col'/>
                            </span>
                        </div>

                        <hr className="my-1 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-20 dark:opacity-100"/>
                        <div className=' flex w-full'>
                            <AnimateWord text={product.recipe || ''} textClassName=' text-sm text-zinc-400 font-Yekan' className=' text-zinc-700' el='p'/>
                        </div>
                        <hr className="my-5 h-px border-t-0 bg-transparent bg-gradient-to-r from-transparent via-neutral-500 to-transparent opacity-90 dark:opacity-100"/>
                    </div>))}</div>

            </div>
        </div>);
};
export default BodyFoodMenu;
//# sourceMappingURL=BodyFoodMenu.js.map