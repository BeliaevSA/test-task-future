import { FC } from "react";
import styles from "./SelectOption.module.css";

interface ISelectOption {
  value: string;
}

export const SelectOption: FC<ISelectOption> = ({ value }) => {
  return (
    <option className={styles.option} value={value}>
      {value}
    </option>
  );
};
