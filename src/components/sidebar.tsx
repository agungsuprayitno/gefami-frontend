"use client";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

const Sidebar = () => {
  const router = useRouter();
  const [modeText, setModeText] = useState({ text: "Dark Mode" });
  const [isShowSidebar, setIsShowSidebar] = useState(true);

  const toggleSidebar = (event: any, isToggle: boolean) => {
    if (!isToggle) {
      setIsShowSidebar(true);
    } else {
      setIsShowSidebar(!isShowSidebar);
    }
  };

  const toggleDarkMode = () => {
    const body = document.querySelector("body");
    body?.classList.toggle("dark");
    if (modeText.text === "Dark Mode") {
      setModeText({ text: "Light Mode" });
    } else {
      setModeText({ text: "Dark Mode" });
    }
  };

  const changeRoute = (path: string) => {
    router.push(`/${path}`);
  };
  return (
    <nav className={"sidebar shadow-lg " + (isShowSidebar ? "" : "close")}>
      <header>
        <div className="image-text">
          <span className="image">
            <Image src="/logo.png" width={60} height={60} alt="logo" />
          </span>
          <span className="text header-text">
            <span className="name">Halo</span>
            <span className="profession">Admin</span>
          </span>
        </div>

        <i
          className={
            "bx toggle " +
            (isShowSidebar ? "bx-chevron-right" : "bx-chevron-left")
          }
          onClick={(event) => toggleSidebar(event, true)}
        ></i>
      </header>

      <div className="menu-bar">
        <div className="menu">
          <ul className="menu-links">
            <li
              className="search-box"
              onClick={(event) => toggleSidebar(event, false)}
            >
              <i className="bx bx-search icon"></i>
              <input type="text" placeholder="Search..." />
            </li>
            <li className="nav-link">
              <a href="#" onClick={(event) => changeRoute('book-loan')}>
                <i className="bx bx-wallet icon"></i>
                <span className="text nav-text">Book Loan</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="bottom-content">
          <li className="">
            <a href="#">
              <i className="bx bx-log-out icon"></i>
              <span className="text nav-text">Logout</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
