import NavItem from './NavItem';
async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/category`);
    return res.json();
}
const NavigationFoodMenu = async () => {
    const { categorys: categories } = await getData();
    const menuCategories = categories === null || categories === void 0 ? void 0 : categories.filter(((c) => c.type === '1'));
    return <NavItem menuCategories={menuCategories}/>;
};
export default NavigationFoodMenu;
//# sourceMappingURL=NavigationFoodMenu.js.map