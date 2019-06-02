import React from 'react';
import "./index.less";

interface IProps {
  className?: string;
  style?: React.CSSProperties;
}

const SectionWrapper: React.FC<IProps> = (props) => {
  const { children, ...restProps } = props;
  return (
    <section {...restProps}>
      {children}
    </section>
  );
}

export default SectionWrapper