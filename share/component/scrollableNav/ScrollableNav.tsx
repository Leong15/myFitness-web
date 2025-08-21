"use client"; // Required for client-side interactivity in Next.js App Router

import React, { useRef, useState } from "react";
import { Button } from "primereact/button";
import { IconType } from "react-icons";
import { TbWriting } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { LuScanBarcode } from "react-icons/lu";
import styles from "../../css/ScrollableNav.module.css"; // CSS module for styling

// Define the type for navigation items
interface NavItem {
  id: number;
  title: string;
  iconName?: string; // Icon name as a string
}

// Component props
interface ScrollableNavProps {
  items: NavItem[];
}

// Map icon names to React icon components
const iconMap: { [key: string]: IconType } = {
  TbWriting,
  BsRobot,
  LuScanBarcode,
};

const ScrollableNav: React.FC<ScrollableNavProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Scroll handler for left and right navigation
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll 80% of container width
      const newScrollPosition =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // Update scroll button states based on scroll position
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className={styles.scrollContainer}
        onScroll={handleScroll}
      >
        <Button
          icon="pi pi-chevron-left"
          className="p-button-rounded p-button-text absolute left-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll Left"
        />
        {items.map((item) => {
          const IconComponent = item.iconName ? iconMap[item.iconName] : null;
          return (
            <div
              key={item.id}
              style={{ display: "inline", textAlign: "center" }}
            >
              <div className={styles.navItem}>
                {IconComponent ? (
                  <IconComponent
                    className={styles.navIcon}
                    aria-label={item.title}
                    style={{ width: "80%", height: "80%" }}
                  />
                ) : (
                  <div className={styles.navIconPlaceholder} />
                )}
              </div>
              <p className={styles.navTitle}>{item.title}</p>
            </div>
          );
        })}
        <Button
          icon="pi pi-chevron-right"
          className="p-button-rounded p-button-text absolute right-0 top-1/2 transform -translate-y-1/2 z-10"
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll Right"
        />
      </div>
    </div>
  );
};

export default ScrollableNav;
