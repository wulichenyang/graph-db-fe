import React from 'react';
import "./index.less";
import { SideBarWrapper } from './styled';

// interface IProps {
//   className?: string;
//   style?: React.CSSProperties;
// }

const SideBar: React.FC = (props) => {
  const { children } = props;
  return (
    <SideBarWrapper>
      {children}
    </SideBarWrapper>
  );
}

export default SideBar