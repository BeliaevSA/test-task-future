import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Book } from "../Book/Book";
import styles from "./Main.module.css";
import { RotatingLines } from "react-loader-spinner";
import { Button } from "../Button/Button";
import { IFetchURL } from "../../types/books";
import { showMoreBooks } from "../../store/bookSlice";
import { ModalBook } from "../ModalBook/ModalBook";

export const Main: FC = () => {
  const dispatch = useAppDispatch();
  const {
    listBook,
    loading,
    error,
    totalBooks,
    startIndex,
    sort,
    filter,
    title,
    modal,
  } = useAppSelector(state => state.books);

  const url = (params: IFetchURL) => {
    const { startIndex, sort, title, filter } = params;
    const valueFinish = title
      .split(" ")
      .filter(value => value)
      .join("+");

    const showFilter = filter === "all" ? "" : `+subject:${filter}`;

    const str = `https://www.googleapis.com/books/v1/volumes?q=intitle:${valueFinish}${showFilter}&startIndex=${startIndex}&maxResults=30&orderBy=${sort}&key=AIzaSyCKtyMG8XPYopsGUoySAYTWTlYCHUPw2VM`;

    return str;
  };

  const dataForURL = {
    sort,
    startIndex,
    title,
    filter,
  };

  const handleClickShowMoreBook = () => {
    dispatch(showMoreBooks(url(dataForURL)));
  };

  return (
    <>
      {loading && (
        <div className={styles.info}>
          <RotatingLines
            strokeColor="darkGrey"
            strokeWidth="4"
            animationDuration="0.75"
            width="75"
            visible={true}
          />
        </div>
      )}
      {error && (
        <p className={styles.info}>
          Произошла ошибка, попробуйте снова.
        </p>
      )}
      <div>
        {loading === null ? (
          <p className={styles.info}>Create a request</p>
        ) : (
          <p className={styles.info}>Found {totalBooks} results</p>
        )}
        <div className={styles.books}>
          {listBook[0] &&
            listBook.map((book, index) => (
              <Book book={book} key={index} />
            ))}
        </div>
        {totalBooks - listBook.length > 0 && (
          <Button
            value="Load more"
            handleClick={handleClickShowMoreBook}
          />
        )}
      </div>
      {modal && <ModalBook />}
    </>
  );
};
