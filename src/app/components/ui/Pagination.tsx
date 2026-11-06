import { PaginationTypes } from "@/src/app/lib/types";

const arrowClass =
  "flex h-8 items-center gap-1 rounded-full px-2 text-slate-700 transition-colors hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent sm:px-3";

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationTypes) => {
  const pageNumbers: number[] = [];

  for (let page = 1; page <= totalPages; page++) {
    pageNumbers.push(page);
  }

  if (totalPages <= 1) return null;

  return (
    <nav aria-label="Pagination" className="flex items-center gap-1 text-sm">
      <button
        disabled={currentPage === 1}
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        className={arrowClass}
      >
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4">
          <path d="M12 5l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        {/* Op gsm alleen het pijltje, vanaf sm ook de tekst */}
        <span className="hidden sm:inline">Previous</span>
      </button>

      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onPageChange(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`flex size-8 items-center justify-center rounded-full transition-colors ${
            page === currentPage ? "bg-slate-950 font-semibold text-white" : "text-slate-700 hover:bg-slate-200"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        className={arrowClass}
      >
        <span className="hidden sm:inline">Next</span>
        <svg aria-hidden="true" viewBox="0 0 20 20" className="size-4">
          <path d="M8 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
