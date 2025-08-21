import ScrollableNav from "../../../../share/component/scrollableNav/ScrollableNav";

const navItems = [
  { id: 1, title: "Record", iconName: "TbWriting" },
  { id: 2, title: "Recommend", iconName: "BsRobot" },
  { id: 3, title: "Search By Barcode", iconName: "LuScanBarcode" },
];

export default function FoodDashboard() {
  return (
    <>
      <p>Food Dashboard</p>
      <ScrollableNav items={navItems} />
    </>
  );
}