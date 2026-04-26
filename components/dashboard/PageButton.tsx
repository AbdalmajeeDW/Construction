type PageButtonProps = {
  page: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
};

export function PageButton({
  page,
  currentPage,
  setCurrentPage,
}: PageButtonProps) {
  const isActive = currentPage === page;

  return (
    <button
      onClick={() => setCurrentPage(page)}
      className={`px-3 py-2 rounded-lg text-sm border transition ${
        isActive
          ? "bg-teal-600 text-white border-teal-600"
          : "bg-white text-gray-600 hover:border-teal-400"
      }`}
    >
      {page}
    </button>
  );
}