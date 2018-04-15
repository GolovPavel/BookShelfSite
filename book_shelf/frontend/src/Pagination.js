import React from 'react'

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
                    onChangePage={(idx == current_page) ? "" : onChangePage} />
                ) :
              <p></p>
          }
        </ul>
      </nav>
    </div>
  </div>


export default Pagination;
