import { FC } from "react";
import styles from "./ModalBook.module.css";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { CiImageOff } from "react-icons/ci";
import { AiFillCloseCircle } from "react-icons/ai";
import { setBookId, setModal } from "../../store/bookSlice";

export const ModalBook: FC = () => {
  const dispatch = useAppDispatch();
  const { bookId, listBook } = useAppSelector(state => state.books);
  const book = listBook.find(book => book.id === bookId);

  const handleClickCloseModal = () => {
    dispatch(setBookId(""));
    dispatch(setModal());
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.close} onClick={handleClickCloseModal}>
          <AiFillCloseCircle size={40} color="black" />
        </div>
        {book && (
          <>
            <div className={styles["image-container"]}>
              {book.images ? (
                <img
                  src={book.images}
                  alt=""
                  className={styles.image}
                />
              ) : (
                <div className={styles["image-null"]}>
                  <CiImageOff size={60} color="darkGrey" />
                </div>
              )}
            </div>
            <div className={styles.info}>
              <p className={styles.categories}>{book.categories}</p>
              <h2 className={styles.title}>{book.title}</h2>
              <p className={styles.authors}>{book.authors}</p>
              <p className={styles.description}>{book.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
