import { FC } from "react";
import { SelectOption } from "../SelectOption/SelectOption";
import styles from "./Header.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchBooks,
  setTitle,
  setFilter,
  setSort,
} from "../../store/bookSlice";
import { IFetchURL } from "../../types/books";

const dataCategories = [
  "All",
  "Art",
  "Biography",
  "Computers",
  "History",
  "Medical",
  "Poetry",
];

export const Header: FC = () => {
  const dispatch = useAppDispatch();
  const { filter, sort, title } = useAppSelector(
    state => state.books
  );

  const url = (params: IFetchURL) => {
    const { sort, title, filter } = params;
    const valueFinish = title
      .split(" ")
      .filter(value => value)
      .join("+");

    const showFilter = filter === "all" ? "" : `+subject:${filter}`;

    const str = `https://www.googleapis.com/books/v1/volumes?q=intitle:${valueFinish}${showFilter}&startIndex=0&maxResults=30&orderBy=${sort}&key=AIzaSyCKtyMG8XPYopsGUoySAYTWTlYCHUPw2VM`;

    return str;
  };

  const dataForURL = {
    sort,
    title,
    filter,
  };

  const handleChangeFilter: React.ChangeEventHandler<
    HTMLSelectElement
  > = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setFilter(value));
  };

  const handleChangeSort: React.ChangeEventHandler<
    HTMLSelectElement
  > = e => {
    const value = e.target.value.toLowerCase();
    dispatch(setSort(value));
  };

  const handleKeyDownFetchBooks: React.KeyboardEventHandler<
    HTMLInputElement
  > = e => {
    if (e.key === "Enter") dispatch(fetchBooks(url(dataForURL)));
  };

  const handleClickFetchBooks = () =>
    dispatch(fetchBooks(url(dataForURL)));

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Search for books</h1>
      <div className={styles["search-container"]}>
        <input
          className={styles["input-search"]}
          type="text"
          placeholder="Введите название книги"
          value={title}
          onChange={e => dispatch(setTitle(e.target.value))}
          onKeyDown={handleKeyDownFetchBooks}
        />
        <span className={styles.icon} onClick={handleClickFetchBooks}>
          <AiOutlineSearch color="black" size={30} />
        </span>
      </div>

      <div className={styles["params-container"]}>
        <div>
          <span className={styles["input-header"]}>Categories</span>
          <select
            name="categories"
            onChange={handleChangeFilter}
            className={styles.select}>
            {dataCategories.map(category => (
              <SelectOption key={category} value={category} />
            ))}
          </select>
        </div>
        <div>
          <span className={styles["input-header"]}>Sorting by</span>
          <select
            name="sorting"
            onChange={handleChangeSort}
            className={styles.select}>
            <SelectOption value="Relevance" />
            <SelectOption value="Newest" />
          </select>
        </div>
      </div>
    </div>
  );
};
