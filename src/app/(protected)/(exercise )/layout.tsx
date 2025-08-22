import React, {ReactNode} from 'react';
import ScrollableNav from '../../../../share/component/scrollableNav/ScrollableNav';
import styles from '../../../../share/css/CategoryLayout.module.css'

interface LayoutProps{
    children: ReactNode;
}

const navItems = [
  { id: 1, title: "Dashboard", iconName: "TbWriting", router:"/exerciseDashboard"},
  { id: 2, title: "Record", iconName: "TbWriting", router:"/exerciseSchedule"},
  { id: 3, title: "Recommend", iconName: "BsRobot", router:"/exerciseRecommend" },
];


const ExerciseLayout:React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <main className={styles.content} >{children}</main>
      <footer className={styles.footer}>
        <ScrollableNav items={navItems} />
      </footer>
    </>
  );
};

export default ExerciseLayout;