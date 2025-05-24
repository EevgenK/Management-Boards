import clsx from 'clsx';
import s from './CustomButton.module.css';

export interface CustomButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  disabled?: boolean;
  additionalClass?: string;
}
const CustomButton = ({
  additionalClass,
  disabled,
  ...rest
}: CustomButtonProps) => {
  return (
    <button
      {...rest}
      disabled={disabled}
      className={clsx(s.btn, additionalClass)}
    />
  );
};

export default CustomButton;
