import { Link } from "react-router";
import usePagination, { type PaginationProps } from "~/hooks/use-pagination";
import { cn } from "~/utils";

export default function Pagination(props: PaginationProps) {
  const { isFirstPage, isLastPage, pageLinks, visiblePages, groupUrls } = usePagination(props);

  return (
    <nav
      aria-label="Pagination Navigation"
      role="navigation"
      className="pagination car-drive-container"
    >
      <Link
        className={cn("prev", isFirstPage && "disabled pointer-events-none")}
        to={pageLinks.prevPageUrl || ""}
        aria-disabled={!pageLinks.prevPageUrl}
        aria-label="Previous Page"
      >
        PREV
      </Link>
      <section className="page-numbers">
        {visiblePages[0].page != 1 && (
          <>
            <Link to={pageLinks.firstPageUrl} className="peak-page" aria-label="First Page">
              First
            </Link>
            {groupUrls.prev && (
              <Link to={groupUrls.prev.url} className="showmore" aria-label="Show Previous Group">
                [...]
              </Link>
            )}
          </>
        )}

        {visiblePages.map((pageLink, index) => (
          <Link
            to={pageLink.url}
            className={cn(pageLink.page === props.currentPage && "current-page")}
            {...(pageLink.page === props.currentPage
              ? { "aria-current": "page" }
              : { "aria-label": `Go to Page ${pageLink.page}` })}
            key={index}
          >
            {pageLink.page}
          </Link>
        ))}
        {!isLastPage && (
          <>
            {groupUrls.next && (
              <Link to={groupUrls.next.url} className="showmore" aria-label="Show Next Group">
                [...]
              </Link>
            )}

            <Link to={pageLinks.lastPageUrl} className="peak-page" aria-label="Last Page">
              Last
            </Link>
          </>
        )}
      </section>
      <Link
        className={cn("next", isLastPage && "disabled pointer-events-none")}
        to={pageLinks.nextPageUrl || ""}
        aria-disabled={!pageLinks.nextPageUrl}
        aria-label="Next Page"
      >
        NEXT
      </Link>
    </nav>
  );
}
