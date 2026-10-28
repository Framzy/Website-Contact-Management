import { memo } from "react";
import useToggleAnimation from "../../hooks/useToggleAnimation";

const SearchContacts = memo(function SearchContacts({
  name,
  email,
  phone,
  setName,
  setEmail,
  setPhone,
  onSearch,
}) {
  const { toggle, contentRef, iconRef } = useToggleAnimation(300);
  return (
    <>
      {/* Search form */}
      <div className="bg-gray-800 bg-opacity-80 rounded-xl shadow-custom border border-gray-700 p-6 mb-8 animate-fade-in">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <i className="fas fa-search text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold text-white">
              Search Contacts
            </h2>
          </div>
          <button
            type="button"
            onClick={toggle}
            className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-full focus:outline-none transition-all duration-200"
          >
            <i className="fas fa-chevron-down text-lg" ref={iconRef} />
          </button>
        </div>
        <div ref={contentRef} className="mt-4">
          <form onSubmit={onSearch}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div>
                <label
                  htmlFor="search_name"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-user text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_name"
                    name="search_name"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search_email"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-envelope text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_email"
                    name="search_email"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="search_phone"
                  className="block text-gray-300 text-sm font-medium mb-2"
                >
                  Phone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <i className="fas fa-phone text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="search_phone"
                    name="search_phone"
                    className="w-full pl-10 pr-3 py-3 bg-gray-700 bg-opacity-50 border border-gray-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Search by phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-5 text-right">
              <button
                type="submit"
                className="px-5 py-3 bg-gradient text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 font-medium shadow-lg transform hover:-translate-y-0.5 hover:cursor-pointer"
              >
                <i className="fas fa-search mr-2" /> Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
});

export default SearchContacts;
