import React from 'react';

interface IProps {
  children: any
}

const MainWrapper: React.FC<IProps> = ({ children }: { children: any }) => {
  return (
    <main>
      {children}
    </main>
  );
}

export default MainWrapper