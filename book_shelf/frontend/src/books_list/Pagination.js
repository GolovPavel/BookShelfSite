import React from 'react'
import PropTypes from 'prop-types';

import PaginationPage from './PaginationPage';

import _ from 'lodash';

const Pagination = ({ num_pages, current_page, onChangePage }) =>
  <div className="row mt-5">
    <div className="col-12 d-flex justify-content-center">
      <nav>
        <ul className="pagination">
          {
            (num_pages > 0) ?
              _.range(1, num_pages + 1).map((idx) =>
                  <PaginationPage
                    key={idx}
                    page_num={idx}
                    isActive={(idx == current_page) ? true : false}
                    onChangePage={(idx == current_page) ? (f=>f) : onChangePage} />
                ) :
              <p></p>
          }
        </ul>
      </nav>
    </div>
  </div>

Pagination.propTypes = {
  num_pages: PropTypes.number.isRequired,
  current_page: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
}

Pagination.defaultProps = {
  num_pages: 0,
  current_page: 0,
  onChangePage: f=>f,
}


export default Pagination;
