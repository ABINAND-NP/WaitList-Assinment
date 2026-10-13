import React, { useState, useMemo } from "react";
import { Search, X, ChevronDown, ChevronUp, Check } from "lucide-react";
import DS from "../../Data/DS";

const ServiceProduct = ({ selectedServices, setSelectedServices }) => {
  const [searchType, setSearchType] = useState("name"); // "name" or "tag"
  const [searchTerm, setSearchTerm] = useState("");

  // Tag UI states
  const [showServiceTypeDropdown, setShowServiceTypeDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [selectedServiceType, setSelectedServiceType] = useState("Select Service Type");
  const [selectedStatus, setSelectedStatus] = useState("Select Status");

  const dataList = Array.isArray(DS) ? DS : [];

  // Extract unique session types safely
  const uniqueSessionTypes = useMemo(() => {
    const types = new Set();
    dataList.forEach((item) => {
      const serviceType = item.session_type || item.services || item.service;
      if (serviceType) types.add(serviceType);
    });
    return Array.from(types);
  }, [dataList]);

  // Extract unique statuses safely
  const uniqueStatuses = useMemo(() => {
    const statuses = new Set();
    dataList.forEach((item) => {
      if (item.status) statuses.add(item.status);
    });
    return Array.from(statuses);
  }, [dataList]);

  // Extract unique services/products for "Search by Name"
  const allServices = useMemo(() => {
    const uniqueMap = new Map();
    dataList.forEach((item) => {
      const itemName = item.services || item.name || item.service || "Standard Session";
      const itemTag = item.session_type || item.services || "General";
      const itemStatus = item.status || "Active";
      
      if (!uniqueMap.has(itemName)) {
        uniqueMap.set(itemName, {
          id: itemName,
          name: itemName,
          tag: itemTag,
          status: itemStatus,
        });
      }
    });
    return Array.from(uniqueMap.values());
  }, [dataList]);

  // Filter based on "Search by Name"
  const filteredServices = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return [];

    const matches = allServices.filter((item) =>
      item.name.toLowerCase().includes(query)
    );

    const sorted = matches.sort((a, b) => a.name.localeCompare(b.name));
    const selectedSet = new Set(selectedServices.map((s) => s.id));
    const pinned = sorted.filter((s) => selectedSet.has(s.id));
    const unpinned = sorted.filter((s) => !selectedSet.has(s.id));

    return [...pinned, ...unpinned];
  }, [allServices, searchTerm, selectedServices]);

  const handleToggleService = (service) => {
    if (selectedServices.some((s) => s.id === service.id)) {
      setSelectedServices(selectedServices.filter((s) => s.id !== service.id));
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleSelectServiceType = (type) => {
    setSelectedServiceType(type);
    setShowServiceTypeDropdown(false);
    // Add to selectedServices filter payload
    const matchingService = allServices.find((s) => s.tag === type || s.name === type);
    if (matchingService && !selectedServices.some((s) => s.id === matchingService.id)) {
      setSelectedServices([...selectedServices, matchingService]);
    }
  };

  return (
    <div>
      <label className="mb-2 block text-xs font-medium text-gray-700">
        Search Services / Products
      </label>

      {/* Side-by-side Dot Selectors (Radio buttons) */}
      <div className="flex items-center gap-6 mb-3 text-xs">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="searchOption"
            checked={searchType === "name"}
            onChange={() => {
              setSearchType("name");
              setSearchTerm("");
              setShowServiceTypeDropdown(false);
              setShowStatusDropdown(false);
            }}
            className="accent-black h-3.5 w-3.5"
          />
          <span className="font-medium text-gray-700">Search by Name</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="radio"
            name="searchOption"
            checked={searchType === "tag"}
            onChange={() => {
              setSearchType("tag");
              setSearchTerm("");
              setShowServiceTypeDropdown(false);
              setShowStatusDropdown(false);
            }}
            className="accent-black h-3.5 w-3.5"
          />
          <span className="font-medium text-gray-700">Select by Tag</span>
        </label>
      </div>

      {/* CONDITIONAL UI 1: Search by Name */}
      {searchType === "name" ? (
        <>
          <div className="relative flex items-center mb-2">
            <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-8 pr-8 text-xs text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 text-gray-400 hover:text-gray-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {searchTerm.trim() && (
            <p className="text-[11px] text-gray-500 mb-2">
              Showing {filteredServices.length} result{filteredServices.length === 1 ? "" : "s"} matching "{searchTerm}"
            </p>
          )}

          <div className="max-h-44 overflow-y-auto space-y-1 pr-1">
            {!searchTerm.trim() ? (
              <p className="text-xs text-gray-400 text-center py-4">
                Type to search by name...
              </p>
            ) : filteredServices.length > 0 ? (
              filteredServices.map((service) => {
                const isChecked = selectedServices.some((s) => s.id === service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => handleToggleService(service)}
                    className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-gray-50 cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`h-4 w-4 rounded border flex items-center justify-center transition-colors ${
                          isChecked ? "bg-black border-black text-white" : "bg-white border-gray-300"
                        }`}
                      >
                        {isChecked && <Check className="h-3 w-3" />}
                      </div>
                      <span className="font-medium text-gray-800">{service.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-500">{service.tag}</span>
                      <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                        {service.status}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-gray-500 text-center py-4">No results found.</p>
            )}
          </div>
        </>
      ) : (
        /* CONDITIONAL UI 2: Select by Tag */
        <div className="space-y-4 pt-1">
          {/* First Select Box: Service Type */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Service Type
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowServiceTypeDropdown((prev) => !prev);
                  setShowStatusDropdown(false);
                }}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-sm hover:bg-gray-50"
              >
                <span>{selectedServiceType}</span>
                {showServiceTypeDropdown ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
              </button>

              {showServiceTypeDropdown && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-[210px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#E2E8F0] [&::-webkit-scrollbar-thumb]:rounded-full">
                  {uniqueSessionTypes.length > 0 ? (
                    uniqueSessionTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => handleSelectServiceType(type)}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <span>{type}</span>
                        {selectedServiceType === type && <Check className="h-3.5 w-3.5 text-black" />}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">No service types found</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Second Select Box: Status */}
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">
              Status
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowStatusDropdown((prev) => !prev);
                  setShowServiceTypeDropdown(false);
                }}
                className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs text-gray-800 shadow-sm hover:bg-gray-50"
              >
                <span>{selectedStatus}</span>
                {showStatusDropdown ? <ChevronUp className="h-4 w-4 text-gray-500" /> : <ChevronDown className="h-4 w-4 text-gray-500" />}
              </button>

              {showStatusDropdown && (
                <div className="absolute left-0 right-0 top-full z-20 mt-1 max-h-[210px] overflow-y-auto rounded-lg border border-gray-200 bg-white p-1 shadow-lg [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-[#E2E8F0] [&::-webkit-scrollbar-thumb]:rounded-full">
                  {uniqueStatuses.length > 0 ? (
                    uniqueStatuses.map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => {
                          setSelectedStatus(status);
                          setShowStatusDropdown(false);
                        }}
                        className="flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-xs text-gray-700 hover:bg-gray-50"
                      >
                        <span>{status}</span>
                        {selectedStatus === status && <Check className="h-3.5 w-3.5 text-black" />}
                      </button>
                    ))
                  ) : (
                    <p className="text-xs text-gray-400 text-center py-2">No statuses found</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProduct;