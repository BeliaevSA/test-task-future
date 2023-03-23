import { FC } from "react";

interface ISelectOption {
  value: string;
}

export const SelectOption: FC<ISelectOption> = ({ value }) => {
  return <option value={value}>{value}</option>;
};
