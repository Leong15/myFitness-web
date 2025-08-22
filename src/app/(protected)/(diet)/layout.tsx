import React, {ReactNode} from 'react';
import ScrollableNav from '../../../../share/component/scrollableNav/ScrollableNav';
import styles from '../../../../share/css/CategoryLayout.module.css'

interface LayoutProps{
    children: ReactNode;
}

const navItems = [
  { id: 1, title: "Dashboard", iconName: "TbWriting", router:"/dietDashboard" },
  { id: 2, title: "Record", iconName: "TbWriting", router:"/dietRecord" },
  { id: 3, title: "Recommend", iconName: "BsRobot", router:"/dietRecommend" },
  { id: 4, title: "Search By Barcode", iconName: "LuScanBarcode", router:"/searchByBarcode" },
];

const DietLayout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className={styles.content} >{children}</main>
      <footer className={styles.footer}>
        <ScrollableNav items={navItems} />
      </footer>
    </>
  );
};

export default DietLayout;