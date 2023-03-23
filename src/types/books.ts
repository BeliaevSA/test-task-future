export interface IBook {
  id: string;
  authors: string[] | undefined;
  categories: string[] | undefined;
  images: string | null;
  title: string;
  description: string;
}

export interface IInitialState extends IFilter, ISort {
  listBook: IBook[];
  // showMore: boolean;
  title: string;
  totalBooks: number;
  startIndex: number;
  loading: boolean | null;
  loadingButton: boolean;
  error: string;
  modal: boolean;
  bookId: string;
}

export interface IFetchBooks {
  url: string;
  more: boolean;
}

export interface IFilter {
  filter: string;
}

export interface ISort {
  sort: string;
}

export interface IFetchURL extends IFilter, ISort {
  title: string;
  startIndex?: number;
}
