import React from 'react';

interface PageTitleProps {
  title: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title }) => {
  return <h1 className="page-title text-4xl font-bold pb-6">{title}</h1>;
};

export default PageTitle;