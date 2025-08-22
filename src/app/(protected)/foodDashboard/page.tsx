import ScrollableNav from "../../../../share/component/scrollableNav/ScrollableNav";
import styles from "../../../../share/css/Food.module.css";

const navItems = [
  { id: 1, title: "Record", iconName: "TbWriting" },
  { id: 2, title: "Recommend", iconName: "BsRobot" },
  { id: 3, title: "Search By Barcode", iconName: "LuScanBarcode" },
];

export default function FoodDashboard() {
  return (
    <div className={styles.foodDashboard}>
      <p>Food Dashboard</p>
      <div className={styles.foodFooter}>
        <ScrollableNav items={navItems} />
      </div>
    </div>
  );
}