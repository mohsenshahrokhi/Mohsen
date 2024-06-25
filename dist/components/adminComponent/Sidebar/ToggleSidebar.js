'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { AiOutlineMenuFold } from "react-icons/ai";
const ToggleSidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathName = usePathname();
    const sidebarVisible = searchParams.get('sidebarVisible') === 'true' ? true : false;
    const toggleSidebar = () => {
        const params = new URLSearchParams(searchParams);
        sidebarVisible ? params.set('sidebarVisible', 'false') : params.set('sidebarVisible', 'true');
        params.set('sidebarControl', 'true');
        router.push(`${pathName}?${params}`);
    };
    return (<button onClick={() => toggleSidebar()} className={`hover:scale-110 ${sidebarVisible && 'rotate-180'} transition-transform duration-200`}>
        <AiOutlineMenuFold size={30}/>
    </button>);
};
export default ToggleSidebar;
//# sourceMappingURL=ToggleSidebar.js.map