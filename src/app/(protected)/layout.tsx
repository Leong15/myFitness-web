import React, {ReactNode} from 'react';
import CustomMenubar from "../../../share/component/Menubar/CustomMenubar";
import styles from '../../../share/css/Header.module.css'

interface LayoutProps{
    children: ReactNode;
}

const ProtectedLayout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className={`${styles.fixedheader}`}><CustomMenubar /></header>
      <main style={{paddingTop:'100px'}}>{children}</main>
    </>
  );
};

export default ProtectedLayout;