import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  ShoppingBag,
  CreditCard,
  CalendarDays,
  Hourglass,
  ArrowLeftRight,
  ChevronDown,
} from "lucide-react";
import { BsLayoutSplit } from "react-icons/bs";
import Logo from "../../assets/sidelogo.svg";

const AdminSideBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const manueItems = [
    {
      path: "/",
      name: "Orders",
      icon: <ShoppingBag size={20} />,
    },
    {
      path: "/calinder",
      name: "Calinder",
      icon: <CalendarDays size={20} />,
    },
    {
      path: "/subcerption",
      name: "Subcerption",
      icon: <CreditCard size={20} />,
    },
    {
      path: "/waitlist",
      name: "WaitList",
      icon: <Hourglass size={20} />,
    },
  ];

  return (
    <div
      className={`min-h-screen bg-[#F5F7FA] p-4 transition-all duration-300 ${
        collapsed ? "w-20" : "w-65"
      }`}
    >
      {/* Logo + Title + Collapse Button */}
      <div
        className={`flex items-center mb-8 ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Logo */}
          <button
            onClick={() => collapsed && setCollapsed(false)}
            className="w-8 h-8 bg-black rounded-lg flex items-center justify-center flex-shrink-0"
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
            onClick={() => setCollapsed(true)}
            className="p-1"
          >
            <BsLayoutSplit size={20} />
          </button>
        )}
      </div>

      {/* Location */}
      <div
        className={`bg-white rounded-lg p-3 mb-2 flex items-center ${
          collapsed ? "justify-center" : "justify-between"
        }`}
      >
        {!collapsed && (
          <span className="text-sm">
            Location Name
          </span>
        )}

        <ArrowLeftRight size={18} />
      </div>

      {/* Date / Time */}
      {!collapsed && (
        <div className="bg-[#EDF2F7] rounded-lg p-3 mb-6">

          <div className="flex gap-2">
            <span className="font-semibold">
              08:30 AM
            </span>

            <span>
              Tue 20 Jan
            </span>
          </div>

          <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
            <span>
              🌐 UTC: +5 hours
            </span>

            <ChevronDown size={18} />
          </div>

        </div>
      )}

      {/* Menu */}
      <div className="space-y-1">

        {manueItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.path}
            className={({ isActive }) =>
              `flex items-center rounded-lg py-3 ${
                collapsed
                  ? "justify-center"
                  : "gap-3 px-3"
              } ${
                isActive
                  ? "bg-white"
                  : "bg-transparent"
              }`
            }
          >
            {item.icon}

            {!collapsed && (
              <span>{item.name}</span>
            )}
          </NavLink>
        ))}

      </div>
    </div>
  );
};

export default AdminSideBar;