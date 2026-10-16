import React, { useEffect, useState } from "react";
import StatusCard from "./StatusCard";
import FilterModal from "./FilterModal";
import { CiSearch } from "react-icons/ci";
import DS from "../../Data/DS.js";
import icon10 from "../../../assets/sideBarIcon/icon10.svg";
import icon12 from "../../../assets/sideBarIcon/icon12.svg";
import icon13 from "../../../assets/sideBarIcon/icon13.svg";
import icon14 from "../../../assets/sideBarIcon/icon14.svg";
import icon17 from "../../../assets/sideBarIcon/icon17.svg";
import icon18 from "../../../assets/sideBarIcon/icon18.svg";
import icon19 from "../../../assets/sideBarIcon/icon19.svg";
import icon20 from "../../../assets/sideBarIcon/icon20.svg";
import CustomCheckboxButton from "./CustomCheckboxButton.jsx";

const WaitList = () => {
  const [datas, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showColumnModal, setShowColumnModal] = useState(false);

  // Column visibility state
  const [columns, setColumns] = useState({
    createdOn: true,
    payer: true,
    status: true,
    email: true,
    payerPhone: true,
    service: true,
    scheduled: true,
  });

  const [tempColumns, setTempColumns] = useState({ ...columns });

  const [appliedFilter, setAppliedFilter] = useState({
    preset: "All time",
    from: "",
    to: "",
    selectedPeople: [],
    selectedServices: [],
  });

  const itemsPerPage = 15;

  // Load data safely
  useEffect(() => {
    if (Array.isArray(DS)) {
      setData(DS);
    } else {
      console.error("Waitlist data (DS) is not a valid array.");
    }
  }, []);

  // Convert a date into YYYY-MM-DD for comparisons.
  const normalizeDate = (value) => {
    if (!value) return "";
    const dateValue = String(value).trim();

    const isoMatch = dateValue.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (isoMatch) return `${isoMatch[1]}-${isoMatch[2]}-${isoMatch[3]}`;

    const localMatch = dateValue.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
    if (localMatch) {
      const [, day, month, year] = localMatch;
      return `${year}-${month}-${day}`;
    }

    const parsedDate = new Date(dateValue);
    if (Number.isNaN(parsedDate.getTime())) return "";

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
    const day = String(parsedDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // Search all fields and apply filters
  const filteredDatas = datas.filter((item) => {
    const searchValue = search.trim().toLowerCase();

    const matchesSearch = Object.values(item).some((value) =>
      String(value ?? "")
        .toLowerCase()
        .includes(searchValue),
    );

    if (!matchesSearch) return false;

    if (appliedFilter.selectedPeople?.length > 0) {
      const matchPerson = appliedFilter.selectedPeople.some(
        (p) =>
          (p.name || "").toLowerCase() === (item.payer || "").toLowerCase(),
      );
      if (!matchPerson) return false;
    }

    if (appliedFilter.selectedServices?.length > 0) {
      const matchService = appliedFilter.selectedServices.some(
        (s) =>
          (item.services || "")
            .toLowerCase()
            .includes((s.name || "").toLowerCase()) ||
          (item.services || "")
            .toLowerCase()
            .includes((s.tag || "").toLowerCase()),
      );
      if (!matchService) return false;
    }

    if (!appliedFilter.from && !appliedFilter.to) return true;

    const itemDate = normalizeDate(item.created_at || item.scheduled);
    if (!itemDate) return false;

    if (appliedFilter.from && itemDate < appliedFilter.from) return false;
    if (appliedFilter.to && itemDate > appliedFilter.to) return false;

    return true;
  });

  // Pagination calculations
  const totalItems = filteredDatas.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentDatas = filteredDatas.slice(indexOfFirstItem, indexOfLastItem);

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

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const handlePrev = () =>
    currentPage > 1 && setCurrentPage((prev) => prev - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((prev) => prev + 1);

  const handleApplyFilter = (filter) => {
    setAppliedFilter(filter);
    setCurrentPage(1);
    setShowFilterModal(false);
  };

  const handleResetFilter = () => {
    setAppliedFilter({
      preset: "All time",
      from: "",
      to: "",
      selectedPeople: [],
      selectedServices: [],
    });
    setCurrentPage(1);
  };

  const handleRefresh = () => {
    setSearch("");
    setCurrentPage(1);
  };

  const visibleColumnCount = 1 + Object.values(columns).filter(Boolean).length;

  return (
    <>
      <div className="px-4 py-1">
        <strong className="text-[#334155] text-[20px] font-semibold leading-[28px]">
          WaitList
        </strong>
      </div>

      <div>
        <div className="flex gap-3 px-4 py-3 ">
          <StatusCard title="All Waitlists" value={totalItems} />
          <StatusCard title="Newly Add" value="50" />
          <StatusCard title="Leads" value="20" />
        </div>

        <div className="flex items-center justify-between px-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilterModal((prev) => !prev)}
              className="flex items-center gap-2 rounded-sm bg-[#F1F5F9] px-3 py-2"
            >
              <img src={icon10} alt="ic" className="h-4 w-4" />
              <span className="font-medium text-[#334155] text-[12px]">
                Add Filter
              </span>
            </button>
            <FilterModal
              isOpen={showFilterModal}
              onClose={() => setShowFilterModal(false)}
              onApply={handleApplyFilter}
              onReset={handleResetFilter}
              dsData={datas}
            />
          </div>

          <div className="flex items-center gap-1">
            <div className="relative px-2 py-2">
              <img src={icon17} alt="ic" className="absolute left-5 top-1/2 h-12px w-12px -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Client"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="rounded-md border-[#94A3B8] font-medium placeholder:font-medium placeholder:text-[12px] py-0.5 pl-9 pr-3 shadow outline-none"
              />
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              title="Clear search"
              className="px-1 py-1 hover:text-blue-600"
            >
              <img src={icon12} alt="ic" className="h-16px w-16px" />
            </button>

            <div className="relative">
              <button
                type="button"
                title="Columns"
                onClick={() => {
                  setTempColumns({ ...columns });
                  setShowColumnModal((prev) => !prev);
                }}
                className="px-1 hover:text-blue-600 flex items-center"
              >
                <img src={icon13} alt="ic" className="h-16px w-16px" />
              </button>

              {showColumnModal && (
                <div className="absolute right-0 top-full mt-2 w-80 rounded-lg bg-white p-4 shadow-xl border border-gray-200 z-50">
                  <h3 className="text-base font-semibold text-gray-900">
                    Edit Columns
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    Select the columns to display
                  </p>

                  <div className="mt-4 max-h-[260px] overflow-y-auto space-y-2.5 pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E2E8F0] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-gray-300">
                    {[
                      { key: "createdOn", label: "Order Created On" },
                      { key: "payer", label: "Payer" },
                      { key: "status", label: "Status" },
                      { key: "email", label: "Email" },
                      { key: "payerPhone", label: "Payer Phone" },
                      { key: "service", label: "Service" },
                      { key: "scheduled", label: "Scheduled" },
                    ].map((col) => (
                      <div key={col.key} className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            setTempColumns({
                              ...tempColumns,
                              [col.key]: !tempColumns[col.key],
                            })
                          }
                          className={`h-4 w-4 rounded flex items-center justify-center transition-colors cursor-pointer shadow-sm flex-shrink-0 ${
                            tempColumns[col.key]
                              ? "bg-[#18181B] text-white"
                              : "bg-white border border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {tempColumns[col.key] && (
                            <svg
                              className="h-3 w-3"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </button>
                        <div
                          onClick={() =>
                            setTempColumns({
                              ...tempColumns,
                              [col.key]: !tempColumns[col.key],
                            })
                          }
                          className="flex-1 rounded-lg border border-gray-200 px-3 py-2.5 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-xs font-medium text-gray-700">
                            {col.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex items-center gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => {
                        const defaultCols = {
                          createdOn: true,
                          payer: true,
                          status: true,
                          email: true,
                          payerPhone: true,
                          service: true,
                          scheduled: true,
                        };
                        setTempColumns(defaultCols);
                        setColumns(defaultCols);
                        setShowColumnModal(false);
                      }}
                      className="w-1/2 rounded-md border border-gray-300 bg-white py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
                    >
                      Reset to Default
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setColumns({ ...tempColumns });
                        setShowColumnModal(false);
                      }}
                      style={{ backgroundColor: "#0F172A" }}
                      className="w-1/2 rounded-md py-2 text-xs font-medium text-white hover:opacity-90 shadow-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              title="Download"
              className="px-1 hover:text-blue-600 flex items-center"
            >
              <img src={icon14} alt="ic" className="h-16px w-16px" />
            </button>
          </div>
        </div>
      </div>

      <div className="px-4">
        <div className="overflow-x-auto py-1">
          {/* Adjusted max-h to display ~7 items at a time */}
          <div className="max-h-[350px] overflow-y-auto overflow-x-auto rounded-sm border border-[#E2E8F0] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#E2E8F0] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#E2E8F0]">
            
            <table className="w-full border-collapse text-left font-medium ">
              <thead className="sticky top-0 z-10 border-b border-gray-300 font-medium text-gray-600 text-xs ">
                <tr>
                  <th className="w-10 px-2 py-3 pl-5 bg-[#F8FAFC]">
                    <CustomCheckboxButton />                    
                  </th>
                  {columns.createdOn && (
                    <th className="px-2 py-3 bg-[#F8FAFC] text-[#64748B] font-medium pl-5">Created On</th>
                  )}
                  {columns.payer && (
                    <th className="px-2 py-3 pl-5 bg-[#F8FAFC] text-[#64748B] font-medium">Payer</th>
                  )}
                  {columns.status && (
                    <th className="px-2 py-3 pl-5 bg-[#F8FAFC] text-[#64748B] font-medium">Status</th>
                  )}
                  {columns.email && (
                    <th className="px-2 py-3 pl-5 bg-[#F8FAFC] text-[#64748B] font-medium">Email</th>
                  )}
                  {columns.payerPhone && (
                    <th className="px-2 py-3 pl-5 bg-[#F8FAFC] text-[#64748B] font-medium">Payer Phone</th>
                  )}
                  {columns.service && (
                    <th className="px-2 py-3 pl-5 bg-[#F8FAFC] text-[#64748B] font-medium">Services</th>
                  )}
                  {columns.scheduled && (
                    <th className="bg-[#F8FAFC] text-[#64748B] font-medium pl-5">Scheduled</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E2E8F0] bg-white">
                {currentDatas.length > 0 ? (
                  currentDatas.map((item) => (
                    <tr
                      key={item.id ?? item._id}
                      className="transition-colors hover:bg-gray-50/80 text-xs text-[#37415] font-medium"
                    >
                      <td className="w-10 px-2 py-3 pl-5">
                       

                        <CustomCheckboxButton />

                        
                      </td>
                      {columns.createdOn && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 text-[#374151]">
                          {item.created_at}
                        </td>
                      )} 
                      {columns.payer && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 font-medium text-[#374151]">
                          {item.payer}
                        </td>
                      )}
                      {columns.status && ( 
                        <td className="whitespace-nowrap px-2 py-3 pl-5">
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
                      )}
                      {columns.email && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 text-[#374151]">
                          {item.email}
                        </td>
                      )}
                      {columns.payerPhone && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 text-[#374151]">
                          {item.phone}
                        </td>
                      )}
                      {columns.service && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 text-[#374151]">
                          {item.services}
                        </td>
                      )}
                      {columns.scheduled && (
                        <td className="whitespace-nowrap px-2 py-3 pl-5 text-[#374151]">
                          {item.scheduled}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={visibleColumnCount}
                      className="px-4 py-8 text-center text-gray-500"
                    >
                      No waitlist data found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="flex items-center justify-between px-3 py-4 text-sm text-gray-600">
            <div className="flex gap-1">
              Displaying {" "} <button className="flex bg-[#F8FAFC] text-[#334155] px-2 py-1 rounded-sm ">{Math.min(indexOfLastItem, totalItems)} <img src={icon18} alt="ic" className="h-16px w-16px" /> </button>  out of <label className="text-[#18181B]">{totalItems}</label>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentPage === 1}
                className="flex rounded-md border border-[#FFFFFF] px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <img src={icon19} alt="ic" />
                <label className="pl-2"> Previous</label>
              </button>

              {getPageNumbers().map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`rounded-md border px-3 py-1 ${
                    currentPage === page
                      ? "border-[#FFFFFF00] bg-[#FFFFFF00] text-white"
                      : "border-[#FFFFFF00] hover:border-[#E2E8F0]"
                  }`}
                >
                  <label className="text-[#334155]"> {page}</label>
                </button>
              ))}

              <button
                type="button"
                onClick={handleNext}
                disabled={currentPage === totalPages || totalPages === 0}
                className="flex rounded-md border border-[#FFFFFF] px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >                
                <label className="pr-2" >Next</label>
                <img src={icon20} alt="ic"  />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WaitList;