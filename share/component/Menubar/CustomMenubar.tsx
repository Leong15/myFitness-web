"use client";
import React, { useState } from 'react';
import { Menubar } from 'primereact/menubar';
import { Badge } from 'primereact/badge';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { useRouter, usePathname } from 'next/navigation';
import CustomSidebar from '../Sidebar/CustomSidebar';
import { FaUtensils } from 'react-icons/fa';
import { CiDumbbell, CiBarcode } from 'react-icons/ci';
import { GiWeightLiftingUp } from 'react-icons/gi';
import { CgChevronRight } from 'react-icons/cg';
import styles from '../../css/Menubar.module.css';

function CustomMenubar() {
  const router = useRouter();
  const pathName = usePathname();
  const [visible, setVisible] = useState(false);

  const itemRenderer = (item: any) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={`${item.iconClass} ${styles.icon}`} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
      {item.shortcut && (
        <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">
          {item.shortcut}
        </span>
      )}
    </a>
  );

  const hideSidebar = () => {
    setVisible(false);
  };

  const items = [
    {
      label: 'Food',
      icon: <FaUtensils className={`${styles.icon}`} />,
      command: () => {
        router.push('/searchByBarcode');
      },
    },
    {
      label: 'Gym',
      icon: <GiWeightLiftingUp className={`${styles.icon}`} />,
      command: () => {
        router.push('/gymDashboard');
      },
    },
    {
      label: 'Login',
      iconClass: 'pi pi-caret-right',
      template: itemRenderer,
      command: () => {
        router.push('/login');
      },
    },
  ];

  const start = (
    <Button
      icon={<CgChevronRight className={styles.icon} />}
      rounded
      onClick={() => setVisible(true)}
    />
  );

  const end = (
    <div className={styles.avatarWrapper}>
      <span className={styles.name}>Hanni</span>
      <Avatar icon="pi pi-user" size="large" shape="circle" />
    </div>
  );

  return (
    <div className={styles.fixedHeader}>
      <CustomSidebar to_visible={visible} onHide={hideSidebar} />
      <Menubar model={items} start={start} end={end} className={styles.menubar} />
    </div>
  );
}

export default CustomMenubar;