import React, {ReactNode} from 'react';
import CustomMenubar from "../../../share/component/Menubar/CustomMenubar";
import '../../../share/css/menubar.css'

interface LayoutProps{
    children: ReactNode;
}

const ProtectedLayout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header className="fixed-header"><CustomMenubar /></header>
      <main style={{paddingTop:'100px'}}>{children}</main>
    </>
  );
};

export default ProtectedLayout;