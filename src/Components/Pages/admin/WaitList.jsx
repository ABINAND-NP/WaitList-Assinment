import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import FilterModal from "./FilterModal";
import { CiFilter, CiSearch } from "react-icons/ci";
import { LuColumns2, LuDownload } from "react-icons/lu";
import { RefreshCcw } from "lucide-react";
import DS from "../../Data/DS";

const WaitList = () => {
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [appliedFilter, setAppliedFilter] = useState({
    preset: "All time",
    from: "",
    to: "",
  });

  const itemsPerPage = 15;

  // Load data
  useEffect(() => {
    try {
      setData(DS);
    } catch (error) {
      console.error("Error loading waitlist data:", error);
    }
  }, []);

  // Convert a date into YYYY-MM-DD for comparisons.
  // Supports ISO dates and DD/MM/YYYY or DD-MM-YYYY.
  const normalizeDate = (value) => {
    if (!value) return "";

    const dateValue = String(value).trim();

    const isoMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);

    if (isoMatch) {
      return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;
    }

    const localMatch = dateValue.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);

    if (localMatch) {
      const [, day, month, year] = localMatch;
      return `${year}-${month}-${day}`;
    }

    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
      return "";
    }

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Search all fields and apply the selected date range
  const filteredDatas = datas.filter((item) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch = Object.values(item).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(searchValue),
    );

    if (!matchesSearch) return false;

    // No date filter applied
    if (!appliedFilter.from && !appliedFilter.to) {
      return true;
    }

    const itemDate = normalizeDate(item.date);

    if (!itemDate) return false;

    if (appliedFilter.from && itemDate < appliedFilter.from) {
      return false;
    }

    if (appliedFilter.to && itemDate > appliedFilter.to) {
      return false;
    }

    return true;
  });

  // Pagination
  const totalItems = filteredDatas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentDatas = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

  // Show a maximum of three page numbers
  const getPageNumbers = () => {
    const pages = [];

    let startPage = Math.max(1, currentPage - 1);
    let endPage = startPage + 2;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - 2);
    }

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    return pages;
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  // Apply the filter received from FilterModal
  const handleApplyFilter = (filter) => {
    setAppliedFilter(filter);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  // Reset the applied filter
  const handleResetFilter = () => {
    setAppliedFilter({
      preset: "All time",
      from: "",
      to: "",
    });

    setCurrentPage(1);
  };

  // Reset search and pagination
  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Page title */}
      <div className="px-5 py-3">
        <strong className="text-gray-600">WaitList</strong>
      </div>

      {/* Status cards */}
      <div className="py-1">
        <div className="flex gap-2 px-5 py-5">
          <StatusCard title="All Waitlists" value={totalItems} />

          <StatusCard title="Newly Add" value="50" />

          <StatusCard title="Leads" value="20" />
        </div>

        {/* Search and action buttons */}
        <div className="flex items-center justify-between px-5">
          <div className="relative">
          <button
            type="button"
            onClick={() => setShowFilterModal(true)}
            className="flex items-center gap-1 rounded-sm bg-gray-200 px-2 py-1 hover:bg-gray-300"
          >
            <CiFilter size={20} />
            <span>Add Filter</span>     
          </button>
          <FilterModal
  isOpen={showFilterModal}
  onClose={() => setShowFilterModal(false)}
  onApply={handleApplyFilter}
  onReset={handleResetFilter}
  dsData={datas}
/>
          </div>

          <div className="flex items-center gap-2">
            {/* Search input */}
            <div className="relative px-2">
              <CiSearch
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />

              <input
                type="text"
                placeholder="Search Client"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-md border border-gray-300 py-1 pl-10 pr-3 shadow outline-none focus:border-blue-500"
              />
            </div>

            {/* Refresh */}
            <button
              type="button"
              onClick={handleRefresh}
              title="Clear search"
              className="px-2 py-1 hover:text-blue-600"
            >
              <RefreshCcw size={20} />
            </button>

            {/* Columns */}
            <button
              type="button"
              title="Columns"
              className="px-1 hover:text-blue-600"
            >
              <LuColumns2 size={20} />
            </button>

            {/* Download */}
            <button
              type="button"
              title="Download"
              className="px-1 hover:text-blue-600"
            >
              <LuDownload size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Waitlist table */}
      <div className="px-5">
        <div className="overflow-x-auto px-3 py-1">
          <div className="overflow-hidden rounded-sm border border-gray-300">
            <table className="w-full border-collapse text-left text-sm text-gray-700">
              <thead className="border-b border-gray-300 bg-gray-100 font-medium text-gray-600">
                <tr>
                  <th className="w-10 px-2 py-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 cursor-pointer accent-blue-600"
                    />
                  </th>

                  <th className="px-2 py-2">Date &amp; Time</th>
                  <th className="px-2 py-2">Name</th>
                  <th className="px-2 py-2">Status</th>
                  <th className="px-2 py-2">Email</th>
                  <th className="px-2 py-2">Phone</th>
                  <th className="px-2 py-2">Session Type</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {currentDatas.length > 0 ? (
                  currentDatas.map((item, index) => (
                    <tr
                      key={item.id ?? item._id ?? index}
                      className="transition-colors hover:bg-gray-50/80"
                    >
                      <td className="w-10 px-2 py-2">
                        <input
                          type="checkbox"
                          className="h-4 w-4 cursor-pointer accent-blue-600"
                        />
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-gray-600">
                        <span className="font-medium">{item.date}</span>

                        <span className="ml-2 text-gray-500">{item.time}</span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 font-semibold text-gray-800">
                        {item.name}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            item.status === "Active"
                              ? "bg-green-100 text-emerald-700"
                              : item.status === "Lead"
                                ? "bg-blue-100 text-blue-600"
                                : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              item.status === "Active"
                                ? "bg-emerald-500"
                                : item.status === "Lead"
                                  ? "bg-blue-500"
                                  : "bg-slate-500"
                            }`}
                          />

                          {item.status}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-gray-600">
                        {item.email}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-gray-600">
                        {item.phone}
                      </td>

                      <td className="whitespace-nowrap px-2 py-2 text-gray-600">
                        {item.session_type}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No waitlist data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-3 py-4 text-sm text-gray-600">
          <div>
            Displaying {totalItems === 0 ? 0 : indexOfFirstItem + 1}
            {" - "}
            {Math.min(indexOfLastItem, totalItems)}
            {" out of "}
            {totalItems}
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                type="button"
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-md border px-3 py-1 ${
                  currentPage === page
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              type="button"
              onClick={handleNext}
              disabled={currentPage === totalPages || totalPages === 0}
              className="rounded-md border border-gray-300 px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default WaitList;
