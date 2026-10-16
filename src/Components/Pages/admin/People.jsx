import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import DS from "../../Data/DS";

const People = ({ selectedPeople, setSelectedPeople }) => {
  const [peopleSearch, setPeopleSearch] = useState("");

  // Extract unique people and their tags from DS using 'payer'
  const allPeople = useMemo(() => {
    const uniqueMap = new Map();
    DS.forEach((item) => {
      const personName = item.payer || item.name;
      if (personName && !uniqueMap.has(personName)) {
        uniqueMap.set(personName, {
          id: personName,
          name: personName,
          tag: item.status || "Client",
        });
      }
    });
    return Array.from(uniqueMap.values());
  }, []);

  // Filter, sort, and pin selected people to the top
  const filteredPeople = useMemo(() => {
    const query = peopleSearch.trim().toLowerCase();
    
    // Only show results when user starts typing
    if (!query) return [];

    const matches = allPeople.filter((person) =>
      person.name.toLowerCase().includes(query)
    );

    const sorted = matches.sort((a, b) => a.name.localeCompare(b.name));

    const selectedSet = new Set(selectedPeople.map((p) => p.id));
    const pinned = sorted.filter((p) => selectedSet.has(p.id));
    const unpinned = sorted.filter((p) => !selectedSet.has(p.id));

    return [...pinned, ...unpinned].slice(0, 10);
  }, [allPeople, peopleSearch, selectedPeople]);

  const handleTogglePerson = (person) => {
    if (selectedPeople.some((p) => p.id === person.id)) {
      setSelectedPeople(selectedPeople.filter((p) => p.id !== person.id));
    } else {
      setSelectedPeople([...selectedPeople, person]);
    }
  };

  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-700">
        Search People
      </label>
      
      {/* Search Bar */}
      <div className="relative flex items-center mb-3">
        <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Start typing to search people..."
          value={peopleSearch}
          onChange={(e) => setPeopleSearch(e.target.value)}
          className="w-full rounded-lg border border-gray-300 bg-white py-1.5 pl-8 pr-3 text-xs text-gray-800 shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-900"
        />
      </div>

      {/* Results List */}
      <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
        {!peopleSearch.trim() ? (
          <p className="text-xs text-gray-400 text-center py-4">
            Type to search people...
          </p>
        ) : filteredPeople.length > 0 ? (
          filteredPeople.map((person) => {
            const isChecked = selectedPeople.some((p) => p.id === person.id);
            return (
              <div
                key={person.id}
                onClick={() => handleTogglePerson(person)}
                className="flex items-center justify-between rounded-md px-2 py-1.5 text-xs hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  {/* Integrated Custom Checkbox */}
                  <div
                    style={{
                      backgroundColor: isChecked ? "#18181B" : "#FFFFFF",
                    }}
                    className={`h-[18px] w-[18px] rounded-[5px] border border-gray-300 flex items-center justify-center transition-colors shadow-sm flex-shrink-0 ${
                      isChecked ? "border-[#18181B]" : "hover:border-gray-400"
                    }`}
                  >
                    {isChecked && (
                      <svg
                        className="h-[10px] w-[10px] text-white"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{person.name}</span>
                </div>
                {person.tag && (
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">
                    {person.tag}
                  </span>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-xs text-gray-500 text-center py-4">No people found.</p>
        )}
      </div>
    </div>
  );
};

export default People;