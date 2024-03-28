"use client";
import React,{ useState, useRef } from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';  
import { Button } from 'primereact/button';
import { useRouter,usePathname } from 'next/navigation';
import CustomSidebar from '../Sidebar/CustomSidebar';

function CustomMenubar() {
/*   const { isLoggedIn, setIsLoggedIn,loginStaff,setLoginStaff } = useContext(LoginContext); */
const router = useRouter();
const pathName = usePathname();
const [visible, setVisible] = useState(false);

const itemRenderer = (item:any) => (
    <a className="flex align-items-center p-menuitem-link">
        <span className={item.icon} />
        <span className="mx-2">{item.label}</span>
        {item.badge && <Badge className="ml-auto" value={item.badge} />}
        {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
    </a>
);
const hide_sidebar =()=>{
    setVisible(false)
}
const items = [
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () =>{
            router.push('/home')
        }
    },
    {
        label: 'Dashboard',
        icon: 'pi pi-caret-right',
        command: () => {
            router.push('/dashboard');
        }
    },
    {
        label: 'Login',
        icon: 'pi pi-caret-right',
        command: () => {
            router.push('/login');
        }
    },
    {
        label: 'External',
        icon: 'pi pi-link',
        items: [
            {
                label: 'React.js',
                icon: 'pi pi-star',
                url: 'https://react.dev/'
            },
            {
                label: 'Vite.js',
                icon: 'pi pi-bookmark',
                url: 'https://vite.dev/'
            }
        ]
    }
];

const start = <Button icon="pi pi-arrow-right" rounded onClick={() => setVisible(true)} />
const end = (
    <div className="flex align-items-center gap-2">
        <span style={{paddingRight:'10px'}}><strong>Amy</strong></span>
        <Avatar icon="pi pi-user" size="large" shape="circle"/>
    </div>
);
  return(
    <div className="card">
        <CustomSidebar to_visible={visible} onHide={() => setVisible(false)} />
        <Menubar model={items} start={start} end={end} />
    </div>
  )
}

export default CustomMenubar;
