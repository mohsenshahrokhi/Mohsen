import { CAT } from '@/type'
import NavItem from './NavItem'

async function getData() {
    const res = await fetch(`${process.env.BASE_URL}/api/category`)
    return res.json()
}

const NavigationFoodMenu = async () => {
    const { categorys: categories } = await getData()
    const menuCategories = categories?.filter(((c: CAT) => c.type === '1'))
    return <NavItem menuCategories={menuCategories} />
}
export default NavigationFoodMenu