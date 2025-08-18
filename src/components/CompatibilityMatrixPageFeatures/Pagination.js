import React from 'react';
import styles from './styles.module.css';

const Pagination = ({
  currentPage,
  totalPages,
  paginate,
  itemsPerPage,
  setItemsPerPage,
}) => {

  if (totalPages <= 1) {
    return null; // Don't show pagination if not needed
  }

  return (
    <div className={styles.paginationControls}>
      <button
        onClick={() => paginate(1)}
        disabled={currentPage === 1}
        className={styles.navButton}
        title="First Page"
      >
        {'<<'}
      </button>
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={styles.navButton}
        title="Previous Page"
      >
        {'<'}
      </button>
      
      <span className={styles.pageInfo}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={styles.navButton}
        title="Next Page"
      >
        {'>'}
      </button>
      <button
        onClick={() => paginate(totalPages)}
        disabled={currentPage === totalPages}
        className={styles.navButton}
        title="Last Page"
      >
        {'>>'}
      </button>

      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className={styles.itemsPerPageSelect}
      >
        <option value={10}>10 / page</option>
        <option value={20}>20 / page</option>
        <option value={50}>50 / page</option>
        <option value={100}>100 / page</option>
      </select>
    </div>
  );
};

export default Pagination;