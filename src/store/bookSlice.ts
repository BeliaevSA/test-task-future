import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from "@reduxjs/toolkit";
import { IInitialState } from "../types/books";

const fetchDataBooks = async (url: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Server Error!");
  }
  const data = await response.json();

  return data;
};

const getBooks = (data: any) => {
  const totalItems = data.totalItems;
  const dataBooks = data.items;

  const books = totalItems
    ? dataBooks.map((book: any) => ({
        authors: book.volumeInfo.authors,
        categories: book.volumeInfo.categories,
        id: book.id,
        images: book.volumeInfo.imageLinks
          ? book.volumeInfo.imageLinks.thumbnail
          : null,
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
      }))
    : [];
  return { books, totalItems };
};

export const fetchBooks = createAsyncThunk(
  "books/fetchBooks",
  async function (url: string, { rejectWithValue }) {
    try {
      return fetchDataBooks(url);
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue(error.message);
    }
  }
);

export const showMoreBooks = createAsyncThunk(
  "books/showMoreBooks",
  async function (url: string, { rejectWithValue }) {
    try {
      return fetchDataBooks(url);
    } catch (error) {
      if (error instanceof Error)
        return rejectWithValue(error.message);
    }
  }
);

export const initialState: IInitialState = {
  listBook: [],
  // showMore: false,
  title: "",
  totalBooks: 0,
  startIndex: 30,
  filter: "all",
  sort: "relevance",
  loading: null,
  loadingButton: false,
  error: "",
  modal: false,
  bookId: "",
};

const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.sort = action.payload;
    },
    setModal: state => {
      state.modal = !state.modal;
    },
    setBookId: (state, action: PayloadAction<string>) => {
      state.bookId = action.payload;
    },
    changeStartIndex: state => {
      state.startIndex = state.startIndex + 30;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        try {
          const { books, totalItems } = getBooks(action.payload);

          state.listBook = books;
          state.totalBooks = totalItems;
          state.startIndex = 30;
        } catch (error) {
          console.log(error);
          state.error = "Что то пошло не так... Попробуйте снова";
        } finally {
          state.loading = false;
        }
      })
      .addCase(showMoreBooks.pending, state => {
        state.loadingButton = true;
        state.error = "";
      })
      .addCase(showMoreBooks.fulfilled, (state, action) => {
        try {
          const { books, totalItems } = getBooks(action.payload);

          state.listBook = [...state.listBook, ...books];
          console.log(state.listBook.length);
          state.totalBooks = totalItems;
          state.startIndex = state.startIndex + 30;
        } catch (error) {
          console.log(error);
          state.error = "Что то пошло не так... Попробуйте снова";
        } finally {
          state.loadingButton = false;
        }
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        console.log(action.payload);
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const {
  setTitle,
  setFilter,
  setSort,
  changeStartIndex,
  setModal,
  setBookId,
  // showMoreBooks,
} = bookSlice.actions;

export default bookSlice.reducer;

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

// `https://www.googleapis.com/books/v1/volumes?q=intitle:"в+действии"&startIndex=0&maxResults=30&printType=books&key=AIzaSyCKtyMG8XPYopsGUoySAYTWTlYCHUPw2VM`
