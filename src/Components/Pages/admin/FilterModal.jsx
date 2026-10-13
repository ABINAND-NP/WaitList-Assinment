import React, { useState } from "react";
import { 
  Calendar, 
  Users, 
  Package, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  CalendarDays 
} from "lucide-react";
import People from "./People";
import ServiceProduct from "./ServiceProduct";

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  onReset,
}) => {
  const [activeTab, setActiveTab] = useState("Scheduled Date");
  const [showDropdown, setShowDropdown] = useState(false);

  const [preset, setPreset] = useState("All time");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const [selectedPeople, setSelectedPeople] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);

  const dateOptions = [
    "All",
    "Custom",
    "Last 30 days",
    "This month", 
    "Last month",
    "This quarter",
    "2 quarter ago",
    "This year",
    "Last year",
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const getDateRange = (option) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let from = "";
    let to = formatDate(today);

    switch (option) {
      case "All":
      case "All time":
        return { from: "", to: "" };
      case "Custom":
        return { from: fromDate, to: toDate };
      case "Last 30 days": {
        const date = new Date(today);
        date.setDate(date.getDate() - 29);
        from = formatDate(date);
        break;
      }
      case "This month":
        from = formatDate(new Date(today.getFullYear(), today.getMonth(), 1));
        break;
      case "Last month":
        from = formatDate(new Date(today.getFullYear(), today.getMonth() - 1, 1));
        to = formatDate(new Date(today.getFullYear(), today.getMonth(), 0));
        break;
      case "This quarter": {
        const startMonth = Math.floor(today.getMonth() / 3) * 3;
        from = formatDate(new Date(today.getFullYear(), startMonth, 1));
        break;
      }
      case "2 quarter ago": {
        const currentQuarter = Math.floor(today.getMonth() / 3);
        const date = new Date(today.getFullYear(), currentQuarter * 3 - 6, 1);
        from = formatDate(date);
        to = formatDate(new Date(date.getFullYear(), date.getMonth() + 3, 0));
        break;
      }
      case "This year":
        from = formatDate(new Date(today.getFullYear(), 0, 1));
        break;
      case "Last year":
        from = formatDate(new Date(today.getFullYear() - 1, 0, 1));
        to = formatDate(new Date(today.getFullYear() - 1, 11, 31));
        break;
      default:
        return { from: "", to: "" };
    }
    return { from, to };
  };

  const handlePresetChange = (option) => {
    setPreset(option === "All" ? "All time" : option);
    setShowDropdown(false);
    const range = getDateRange(option);
    setFromDate(range.from);
    setToDate(range.to);
  };

  const handleApply = () => {
    onApply({ preset, from: fromDate, to: toDate, selectedPeople, selectedServices });
  };

  const handleReset = () => {
    setPreset("All time");
    setFromDate("");
    setToDate("");
    setSelectedPeople([]);
    setSelectedServices([]);
    setActiveTab("Scheduled Date");
    setShowDropdown(false);
    onReset();
  };

  if (!isOpen) return null;

  const tabs = [
    { name: "Scheduled Date", icon: Calendar, count: 1 },
    { name: "People", icon: Users, count: selectedPeople.length > 0 ? selectedPeople.length : null },
    { name: "Services / Products", icon: Package, count: selectedServices.length > 0 ? selectedServices.length : null },
  ];

  return (
    <div 
      className="absolute left-0 top-full mt-2 z-50 w-[540px] rounded-lg border border-gray-200 bg-white shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex min-h-[300px]">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 border-r border-gray-100 bg-gray-50/70 p-2 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.name;
            return (
              <button
                key={tab.name}
                type="button"
                onClick={() => setActiveTab(tab.name)}
                className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-xs font-medium transition-all ${
                  isActive
                    ? "bg-white text-gray-900 shadow-sm border border-gray-100"
                    : "text-gray-600 hover:bg-gray-100/60"
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${isActive ? "text-gray-900" : "text-gray-500"}`} />
                  <span>{tab.name}</span>
                </div>
                {tab.count && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-100 text-[10px] text-gray-600">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <div className="min-w-0 flex-1 p-5 flex flex-col justify-between">
          <div>
            {activeTab === "Scheduled Date" && (
              <>
                <label className="mb-1.5 block text-xs font-medium text-gray-700">
                  Show orders for
                </label>

                {/* Dropdown Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowDropdown((prev) => !prev)}
                    className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-sm hover:bg-gray-50"
                  >
                    <span className="font-medium">{preset}</span>
                    {showDropdown ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
                  </button>

                  {showDropdown && (
                    <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-56 overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg">
                      {dateOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => handlePresetChange(option)}
                          className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                        >
                          <span>{option}</span>
                          {(option === preset || (option === "All" && preset === "All time")) && (
                            <Check className="h-3.5 w-3.5 text-gray-900" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Date Inputs */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      From
                    </label>
                    <div className="relative flex items-center">
                      <CalendarDays className="absolute left-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      <input
                        type="date"
                        value={fromDate}
                        max={toDate || undefined}
                        onChange={(e) => {
                          setFromDate(e.target.value);
                          setPreset("Custom");
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-2 text-xs text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-1.5 block text-xs font-medium text-gray-600">
                      To
                    </label>
                    <div className="relative flex items-center">
                      <CalendarDays className="absolute left-2.5 h-4 w-4 text-gray-400 pointer-events-none" />
                      <input
                        type="date"
                        value={toDate}
                        min={fromDate || undefined}
                        onChange={(e) => {
                          setToDate(e.target.value);
                          setPreset("Custom");
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-8 pr-2 text-xs text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === "People" && (
              <People
                selectedPeople={selectedPeople} 
                setSelectedPeople={setSelectedPeople} 
              />
            )}

            {activeTab === "Services / Products" && (
              <ServiceProduct 
                selectedServices={selectedServices} 
                setSelectedServices={setSelectedServices} 
              />
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-2 border-t border-gray-100 bg-gray-50/50 px-4 py-3 rounded-b-lg">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-lg border border-gray-300 bg-white px-3.5 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50"
        >
          Reset to Default
        </button>

        <button
          type="button"
          onClick={handleApply}
          className="rounded-lg bg-gray-900 px-4 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-gray-800"
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterModal;