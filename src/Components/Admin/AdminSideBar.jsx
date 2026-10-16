import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ArrowLeftRight, ChevronDown } from "lucide-react";
import Logo from "../../assets/sidelogo.svg";
import icon1 from "../../assets/sideBarIcon/icon1.svg";
import icon2 from "../../assets/sideBarIcon/icon2.svg";
import icon3 from "../../assets/sideBarIcon/icon3.svg";
import icon4 from "../../assets/sideBarIcon/icon4.svg";
import icon5 from "../../assets/sideBarIcon/icon5.svg";
import icon6 from "../../assets/sideBarIcon/icon6.svg";
import icon7 from "../../assets/sideBarIcon/icon7.svg";
import icon8 from "../../assets/sideBarIcon/icon8.svg";
import icon9 from "../../assets/sideBarIcon/icon9.svg";
import icon15 from "../../assets/sideBarIcon/icon15.svg";
import icon21 from "../../assets/sideBarIcon/icon21.svg";
import icon22 from "../../assets/sideBarIcon/icon22.svg";

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const manueItems = [
    {
      path: "/orders",
      name: "Orders",
      icon: (
        <img
          src={icon2}
          alt="Orders"
          className="h-4 w-4 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
        />
      ),
    },
    {
      path: "/subcerption",
      name: "Subcerption",
      icon: (
        <img
          src={icon3}
          alt="Subcerption"
          className="h-4 w-4 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
        />
      ),
    },
    {
      path: "/calinder",
      name: "Calinder",
      icon: (
        <img
          src={icon4}
          alt="Calinder"
          className="h-4 w-4 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
        />
      ),
    },
    {
      path: "/",
      name: "WaitList",
      icon: (
        <img
          src={icon5}
          alt="WaitList"
          className="h-4 w-4 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
        />
      ),
    },
  ];

  return (
    <div
      className={`h-screen bg-[#F5F7FA] pt-4 pb-5 pl-2 pr-4 flex flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Logo + Title + Collapse Button */}
        <div
          className={`flex items-center mb-6 ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          <div className="flex items-center gap-2">
            {/* Logo */}
            <button
              type="button"
              onClick={() => collapsed && setCollapsed(false)}
              className="rounded-lg flex items-center justify-center flex-shrink-0 group p-1 hover:bg-white hover:shadow-sm transition-all"
            >
              <img
                src={Logo}
                alt="Side Logo"
                className="w-6 h-6 transition-all group-hover:scale-105"
              />
            </button>

            {/* Title */}
            {!collapsed && (
              <h1 className="text-xl font-bold whitespace-nowrap">
                Front·Desk
              </h1>
            )}
          </div>

          {/* Collapse Button */}
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="p-1 hover:bg-gray-200/60 rounded transition-all"
            >
              <img src={icon1} alt="Collapse" className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location */}
        <div
          className={`bg-white rounded-lg p-2 mb-2 flex items-center shadow-sm hover:shadow transition-all ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <span className="text-sm font-medium text-gray-700">
              Location Name
            </span>
          )}
          <img src={icon22} alt="ic" className="h-[16px] w-[16px]" />
        </div>

        {/* Date / Time */}
        {!collapsed && (
          <div className="bg-[#EDF2F7] rounded-lg p-3 mb-6">
            <div className="flex gap-2 text-[16px] text-[#334155]">
              <span className="font-bold">08:30 AM</span>
              <span>Tue 20 Jan</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <img src={icon15} alt="ic" className="h-3.5 w-3.5" /> UTC: +5
                hours
              </span>
              <ChevronDown size={16} />
            </div>
          </div>
        )}

        {/* Menu Items */}
        <div className="space-y-1">
          {manueItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.path}
              title={collapsed ? item.name : ""}
              className={({ isActive }) =>
                `group flex items-center rounded-md py-2 text-xs font-medium text-gray-700 transition-all duration-200 ${
                  collapsed ? "justify-center px-0 my-1" : "gap-3 px-3"
                } ${
                  isActive
                    ? "bg-white shadow-sm font-semibold"
                    : "bg-transparent hover:bg-white hover:shadow-md hover:text-black"
                }`
              }
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="space-y-2">
        {/* Dashboard Item */}
        <div
          title={collapsed ? "Dashboard" : ""}
          className={`group flex items-center rounded-md py-2 text-xs font-medium text-gray-700 bg-transparent hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer ${
            collapsed ? "justify-center px-0" : "gap-3 px-3"
          }`}
        >
          <img
            src={icon6}
            alt="Dashboard"
            className="h-4 w-4 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
          />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Dashboard</span>
              <img src={icon7} alt="Arrow" className="h-4 w-4" />
            </div>
          )}
        </div>

        {/* Profile Card */}
        <div
          className={`bg-[#FFFFFF] px-[8px] py-[12px] shadow-sm hover:shadow-md transition-all rounded-md flex items-center ${
            collapsed ? "justify-center" : "justify-between gap-3 px-2"
          }`}
        >
          <div className="flex items-center gap-3">
            <img
              src={icon8}
              alt="Admin"
              className="h-8 w-8 rounded-full flex-shrink-0"
            />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-gray-800 truncate">
                  Admin name
                </span>
                <span className="text-[10px] text-gray-500 truncate">
                  adminname@gmail.com
                </span>
              </div>
            )}
          </div>
          {!collapsed && <img src={icon21} alt="ic" />}
        </div>

        {/* Help Center */}
        <div
          title={collapsed ? "Help Center" : ""}
          className={`group flex items-center rounded-md py-1.5 transition-all cursor-pointer ${
            collapsed ? "justify-center" : "gap-3 px-1"
          }`}
        >
          <img
            src={icon9}
            alt="Help"
            className="h-4 w-4 flex-shrink-0 transition-all duration-200 group-hover:brightness-125 group-hover:scale-110"
          />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-gray-700 truncate group-hover:text-black">
                Help center
              </span>
              <span className="text-[10px] text-gray-400 truncate">
                @2024 Omnify.Inc
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;