import { FC } from "react";
import styles from "./Button.module.css";
import { useAppSelector } from "../../store/hooks";
import { RotatingLines } from "react-loader-spinner";

interface IByttonProps {
  value: string;
  handleClick: () => void;
}

export const Button: FC<IByttonProps> = ({ value, handleClick }) => {
  const { loadingButton } = useAppSelector(state => state.books);

  return (
    <div className={styles.wrapper}>
      {loadingButton ? (
        <RotatingLines
          strokeColor="darkGrey"
          strokeWidth="4"
          animationDuration="0.75"
          width="40"
          visible={true}
        />
      ) : (
        <button className={styles.button} onClick={handleClick}>
          {value}
        </button>
      )}
    </div>
  );
};
