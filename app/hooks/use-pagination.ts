import { useMemo } from "react";
import { useLocation } from "react-router";
import { APP_URL } from "~/constants";
import type { PageLinks, Paginated } from "~/types";

const generateUrl = (page: number | null, url: URL): string | null => {
  if (!page) {
    return null;
  }

  url.searchParams.set("page", String(page));

  return url.toString();
};

export type PaginationProps = Paginated<unknown>["pagination"] & {
  pagesToShow?: number;
};

export default function usePagination({
  currentPage,
  lastPage,
  next,
  prev,
  totalPages,
}: PaginationProps) {
  const location = useLocation();

  const pagesToShow = 5; // TODO - make this dynamic

  const isFirstPage = currentPage === 1;

  const isLastPage = currentPage === lastPage;

  const pageLinks = useMemo<PageLinks>(() => {
    const url = new URL(location.pathname + location.search, APP_URL);

    return {
      firstPageUrl: generateUrl(1, url)!,
      lastPageUrl: generateUrl(lastPage, url)!,
      nextPageUrl: generateUrl(next, url),
      prevPageUrl: generateUrl(prev, url),
    };
  }, [lastPage, location.pathname, location.search, next, prev]);

  const visiblePages = useMemo(() => {
    const half = Math.floor(pagesToShow / 2);

    let start = Math.max(1, currentPage - half);

    let end = Math.min(totalPages, currentPage + half);

    if (currentPage <= half) {
      end = Math.min(totalPages, pagesToShow);
    } else if (currentPage + half > totalPages) {
      start = Math.max(1, totalPages - pagesToShow + 1);
    }

    const url = new URL(location.pathname + location.search, APP_URL);

    const pages: { page: number; url: string }[] = [];

    for (let i = start; i <= end; i++) {
      if (pages.some((page) => page.page === i)) {
        continue;
      }

      pages.push({
        page: i,
        url: generateUrl(i, url)!,
      });
    }

    return pages;
  }, [currentPage, location.pathname, location.search, pagesToShow, totalPages]);

  const groupUrls = useMemo(() => {
    const url = new URL(location.pathname + location.search, APP_URL);

    const prevPage = currentPage > pagesToShow ? currentPage - pagesToShow : null;

    const nextPage = currentPage >= lastPage - pagesToShow ? null : currentPage + pagesToShow;

    return {
      prev: prevPage ? { page: prevPage, url: generateUrl(prevPage, url)! } : null,
      next: nextPage ? { page: nextPage, url: generateUrl(nextPage, url)! } : null,
    };
  }, [currentPage, lastPage, location.pathname, location.search, pagesToShow]);

  return {
    pageLinks,
    isFirstPage,
    isLastPage,
    visiblePages,
    groupUrls,
  };
}
