import ScrollableNav from "../../../../share/component/scrollableNav/ScrollableNav";
import styles from "../../../../share/css/Food.module.css";

const navItems = [
  { id: 1, title: "Record", iconName: "TbWriting" },
  { id: 2, title: "Recommend", iconName: "BsRobot" },
];

export default function GymDashboard() {
  return (
    <div className={styles.foodDashboard}>
      <p>Gym Dashboard</p>
      <div className={styles.foodFooter}>
        <ScrollableNav items={navItems} />
      </div>
    </div>
  );
}
