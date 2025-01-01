export type Paginated<T> = {
  data: T[];
  pagination: {
    currentPage: number;
    lastPage: number;
    totalItems: number;
    totalPages: number;
    perPage: number;
    next: number | null;
    prev: number | null;
  };
};

export type PageLinks = {
  firstPageUrl: string;
  lastPageUrl: string;
  nextPageUrl: string | null;
  prevPageUrl: string | null;
};
