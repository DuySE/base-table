import classnames from 'classnames';
import { usePagination, DOTS } from './hooks/usePagination';

const Pagination = (props) => {
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize
  });

  if (currentPage === 0 || paginationRange?.length < 2 || !paginationRange) {
    return null;
  }
  let lastPage = paginationRange[paginationRange?.length - 1];

  const next = () => {
    onPageChange(Math.min(currentPage + 1, lastPage));
  };

  const prev = () => {
    onPageChange(Math.max(currentPage - 1, 1));
  };

  return (
    <ul
      className={classnames('pagination-container', { [className]: className })}
    >
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === 1
        })}
        onClick={prev}
      >
        <button>&lt;</button>
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="pagination-item dots">&#8230;</li>;
        }

        return (
          <li
            className={classnames('pagination-item', {
              selected: pageNumber === currentPage
            })}
            onClick={() => onPageChange(pageNumber)}
          >
            <button>{pageNumber}</button>
          </li>
        );
      })}
      <li
        className={classnames('pagination-item', {
          disabled: currentPage === lastPage
        })}
        onClick={next}
      >
        <button>&gt;</button>
      </li>
    </ul>
  );
};

export default Pagination
