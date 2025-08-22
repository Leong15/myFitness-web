"use client";

import React, { useRef, useState, useEffect } from "react";
import { Button } from "primereact/button";
import { IconType } from "react-icons";
import { TbWriting } from "react-icons/tb";
import { BsRobot } from "react-icons/bs";
import { LuScanBarcode } from "react-icons/lu";
import styles from "../../css/ScrollableNav.module.css";
import { useRouter } from "next/navigation";

interface NavItem {
  id: number;
  title: string;
  iconName?: string;
  router?: string;
}

interface ScrollableNavProps {
  items: NavItem[];
}

const iconMap: { [key: string]: IconType } = {
  TbWriting,
  BsRobot,
  LuScanBarcode,
};

const ScrollableNav: React.FC<ScrollableNavProps> = ({ items }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [needsScroll, setNeedsScroll] = useState(true);
  const router = useRouter();

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
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

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
      setNeedsScroll(scrollWidth > clientWidth);
    }
  };

  const switchPage = (path:string) =>{
    router.push(path);
  }

  useEffect(() => {
    const checkMobileAndScroll = () => {
      setIsMobile(window.innerWidth <= 600);
      handleScroll();
    };

    checkMobileAndScroll();
    window.addEventListener("resize", checkMobileAndScroll);
    return () => window.removeEventListener("resize", checkMobileAndScroll);
  }, []);

  return (
    <div className={styles.navContainer}>
      {!isMobile && needsScroll && (
        <Button
          icon="pi pi-chevron-left"
          className={`${styles.scrollButton} ${styles.leftButton}`}
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          aria-label="Scroll Left"
        />
      )}
      <div
        ref={scrollRef}
        className={`${styles.scrollContainer} ${!needsScroll ? styles.noScroll : ''}`}
        onScroll={handleScroll}
      >
        {items.map((item) => {
          const IconComponent = item.iconName ? iconMap[item.iconName] : null;
          return (
            <div key={item.id} className={styles.navItemWrapper}>
              <div className={styles.navItem} onClick={() => item.router && switchPage(item.router)}>
                {IconComponent ? (
                  <IconComponent
                    className={styles.navIcon}
                    aria-label={item.title}
                  />
                ) : (
                  <div className={styles.navIconPlaceholder} />
                )}
              </div>
              <p className={styles.navTitle}>{item.title}</p>
            </div>
          );
        })}
      </div>
      {!isMobile && needsScroll && (
        <Button
          icon="pi pi-chevron-right"
          className={`${styles.scrollButton} ${styles.rightButton}`}
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          aria-label="Scroll Right"
        />
      )}
    </div>
  );
};

export default ScrollableNav;