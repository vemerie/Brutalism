import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageChange?: (page: number) => void;
}

export default function Pagination({
  total,
  page,
  limit,
  onPageChange,
}: PaginationProps) {
  const safeLimit = Math.max(limit, 1);
  const totalPages = Math.max(1, Math.ceil(total / safeLimit));
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = total === 0 ? 0 : (currentPage - 1) * safeLimit + 1;
  const end = Math.min(currentPage * safeLimit, total);
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  const goToPage = (nextPage: number) => {
    if (nextPage === currentPage || nextPage < 1 || nextPage > totalPages) {
      return;
    }
    onPageChange?.(nextPage);
  };

  return (
    <div className="flex items-center gap-3 text-xs text-gray-500">
      <span className="whitespace-nowrap">
        {start}-{end} of {total}
      </span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={!canGoPrev}
          aria-label="Previous page"
          className="flex h-8 w-8 items-center justify-center rounded-full border text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={!canGoNext}
          aria-label="Next page"
          className="flex h-8 w-8 items-center justify-center rounded-full border text-gray-500 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
