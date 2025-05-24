import clsx from 'clsx';
import s from './Container.module.css';
import { ReactNode } from 'react';

const Container = ({
  children,
  additionalClass,
}: {
  children: ReactNode;
  additionalClass?: string;
}) => {
  return <div className={clsx(s.container, additionalClass)}>{children}</div>;
};

export default Container;
