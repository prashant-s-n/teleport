import React from 'react';
import Link from 'next/link';

const Pagination = ({ currentPage, totalPages, basePath } : {
  currentPage: number;
  totalPages: number;
  basePath: string;
}) => {
  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className='join p-4'>
      {pages.map((page) => {
        const isActive = page === currentPage;
        return (
          <Link href={`${basePath}?page_no=${page}`} key={page}>
            <input className={`join-item btn btn-sm rounded-md btn-square`}
              checked={isActive ? true : false}
              readOnly
             type='radio' name='options' aria-label={page.toString()} />
          </Link>
        );
      })}

    </div>
  );
};

export default Pagination;
