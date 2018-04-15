import React from 'react'

const PaginationPage = ({ page_num, isActive, onChangePage }) =>
    <li className={(isActive) ? "page-item active" : "page-item"}>
      <a onClick={() => onChangePage(page_num)} className="page-link" href="#">
        {page_num}
      </a>
    </li>



export default PaginationPage;
