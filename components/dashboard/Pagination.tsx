import {PageButton} from "@/components/dashboard/PageButton";
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  setCurrentPage: (page: number | ((p: number) => number)) => void;
  t: (key: string) => string;
};

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  setCurrentPage,
  t,
}: PaginationProps) {
  const getPages = () => {
    const pages = [];

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="px-4 sm:px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50">
      {/* INFO */}
      <div className="text-sm text-gray-600 text-center sm:text-left">
        {t("messagePage.page")}{" "}
        <span className="font-semibold text-gray-800">
          {currentPage} / {totalPages}
        </span>{" "}
        • {totalItems} {t("messagePage.message")}
      </div>

      {/* CONTROLS */}
      <div className="flex items-center flex-wrap justify-center gap-2">
        {/* PREVIOUS */}
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 rounded-lg border bg-white text-sm disabled:opacity-50 hover:border-teal-400 transition"
        >
          {t("messagePage.previous")}
        </button>

        {/* FIRST */}
        {currentPage > 3 && (
          <>
            <PageButton page={1} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            <span className="px-2 text-gray-400">...</span>
          </>
        )}

        {/* MIDDLE PAGES */}
        {getPages().map((page) => (
          <PageButton
            key={page}
            page={page}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ))}

        {/* LAST */}
        {currentPage < totalPages - 2 && (
          <>
            <span className="px-2 text-gray-400">...</span>
            <PageButton page={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
          </>
        )}

        {/* NEXT */}
        <button
          onClick={() =>
            setCurrentPage((p) => Math.min(totalPages, p + 1))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-2 rounded-lg border bg-white text-sm disabled:opacity-50 hover:border-teal-400 transition"
        >
          {t("messagePage.next")}
        </button>
      </div>
    </div>
  );
}