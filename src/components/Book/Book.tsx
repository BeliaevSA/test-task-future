import { FC } from "react";
import { IBook } from "../../types/books";
import styles from "./Book.module.css";
import { CiImageOff } from "react-icons/ci";
import { useAppDispatch } from "../../store/hooks";
import { setBookId, setModal } from "../../store/bookSlice";

interface IBookProps {
  book: IBook;
}

export const Book: FC<IBookProps> = ({ book }) => {
  const dispatch = useAppDispatch();

  const handleClickBook = (id: string) => {
    dispatch(setBookId(id));
    dispatch(setModal());
  };

  return (
    <div
      className={styles.container}
      onClick={() => handleClickBook(book.id)}>
      {book.images ? (
        <img
          src={book.images}
          alt=""
          className={styles.image}
          width="100%"
        />
      ) : (
        <div className={styles["image-null"]}>
          <CiImageOff size={60} color="darkGrey" />
        </div>
      )}
      {book.categories && (
        <p className={styles.categories}>
          {book.categories[0].split(" ")[0]}
        </p>
      )}
      <h2 className={styles.title}>{book.title}</h2>
      {book.authors && (
        <p className={styles.authors}>{book.authors.join(", ")}</p>
      )}
    </div>
  );
};
