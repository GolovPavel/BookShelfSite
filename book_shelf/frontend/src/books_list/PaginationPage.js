import React from 'react'
import PropTypes from 'prop-types';

const PaginationPage = ({ page_num, isActive, onChangePage }) =>
    <li className={(isActive) ? "page-item active" : "page-item"}>
      <a onClick={() => onChangePage(page_num)} className="page-link">
        {page_num}
      </a>
    </li>

PaginationPage.propTypes = {
  page_num: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

PaginationPage.defaultProps = {
  page_num: 0,
  isActive: false,
  onChangePage: f=>f,
}

export default PaginationPage;
