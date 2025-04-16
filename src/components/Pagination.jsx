import React from "react";

const Pagination = ({ totalCards, cardsPerPage, setCurrentPage, currentPage = 1 }) => {
  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 300)
  };

  return (
    <div className="flex justify-center mt-16">
      <nav aria-label="Pagination">
        <ul className="flex space-x-2">
          {pageNumbers.map((number) => (
            <li key={number}>
              <button
                className={`px-3 py-1 text-sm font-inter rounded cursor-pointer ${
                  currentPage === number
                    ? "bg-primary1 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;