import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import Logo from "../../assets/sidelogo.svg";
import icon1 from '../../assets/sideBarIcon/icon1.svg';
import icon2 from '../../assets/sideBarIcon/icon2.svg';
import icon3 from '../../assets/sideBarIcon/icon3.svg';
import icon4 from '../../assets/sideBarIcon/icon4.svg';
import icon5 from '../../assets/sideBarIcon/icon5.svg';
import icon6 from '../../assets/sideBarIcon/icon6.svg';
import icon7 from '../../assets/sideBarIcon/icon7.svg';
import icon8 from '../../assets/sideBarIcon/icon8.svg';
import icon9 from '../../assets/sideBarIcon/icon9.svg';
import icon15 from "../../assets/sideBarIcon/icon15.svg";
import icon21 from "../../assets/sideBarIcon/icon21.svg";

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const manueItems = [
    
    {
      path: "/orders",
      name: "Orders",
      icon: <img src={icon2} alt="Orders" className="h-4 w-4" />,
    },
    {
      path: "/subcerption",
      name: "Subcerption",
      icon: <img src={icon3} alt="Subcerption" className="h-4 w-4" />,
    },
    {
      path: "/calinder",
      name: "Calinder",
      icon: <img src={icon4} alt="Calinder" className="h-4 w-4" />,
    },
    {
      path: "/",
      name: "WaitList",
      icon: <img src={icon5} alt="WaitList" className="h-4 w-4" />,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-[#F5F7FA] p-4 flex flex-col justify-between transition-all duration-300 ${
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
              className="rounded-lg flex items-center justify-center flex-shrink-0"
            >
              <img
                src={Logo}
                alt="Side Logo"
                className="w-6 h-6"
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
              className="p-1"
            >
              <img src={icon1} alt="Collapse" className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Location */}
        <div
          className={`bg-white rounded-lg p-3 mb-2 flex items-center shadow-sm ${
            collapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!collapsed && (
            <span className="text-sm font-medium text-gray-700">
              Location Name
            </span>
          )}
          <ArrowLeftRight size={18} className="text-gray-500" />
        </div>

        {/* Date / Time */}
        {!collapsed && (
          <div className="bg-[#EDF2F7] rounded-lg p-3 mb-6">
            <div className="flex gap-2 text-xs text-gray-700">
              <span className="font-semibold">08:30 AM</span>
              <span>Tue 20 Jan</span>
            </div>
            <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
              <span className="flex items-center gap-1"><img src={icon15} alt="ic" className="h-3.5 w-3.5" /> UTC: +5 hours</span>
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
              className={({ isActive }) =>
                `flex items-center rounded-lg py-3 text-xs font-medium text-gray-700 transition-colors ${
                  collapsed ? "justify-center" : "gap-3 px-3"
                } ${isActive ? "bg-white shadow-sm" : "bg-transparent hover:bg-gray-100/60"}`
              }
            >
              {item.icon}
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="pt-4 border-t border-gray-200 space-y-4">
        <div className={`flex items-center rounded-lg py-3 text-xs font-medium text-gray-700 bg-transparent hover:bg-gray-100/60 cursor-pointer ${
          collapsed ? "justify-center" : "gap-3 px-3"
        }`}>
          <img src={icon6} alt="Dashboard" className="h-4 w-4" />
          {!collapsed && (
            <div className="flex items-center justify-between flex-1">
              <span>Dashboard</span>
              <img src={icon7} alt="Arrow" className="h-4 w-4" />
            </div>
          )}
        </div>

        <div className={`bg-[#FFFFFF] px-[8px] py-[10px] justify-between shadow-md rounded-sm flex items-center ${collapsed ? "justify-center" : "gap-3 px-1"}`}>
          <div>
          <img src={icon8} alt="Admin" className="h-8 w-8 rounded-full flex-shrink-0" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-semibold text-gray-800 truncate">Admin name</span>
              <span className="text-[10px] text-gray-500 truncate">adminname@gmail.com</span>
            </div>           
          )}
          </div>
           <img src={icon21} alt="ic" className="" />
        </div>

        <div className={`flex items-center ${collapsed ? "justify-center" : "gap-3 px-1"}`}>
          <img src={icon9} alt="Help" className="h-4 w-4 flex-shrink-0" />
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-medium text-gray-700 truncate">Help center</span>
              <span className="text-[10px] text-gray-400 truncate">@2024 Omnify.Inc</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSideBar;