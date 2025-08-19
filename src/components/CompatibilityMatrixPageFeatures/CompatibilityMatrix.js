import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { compatibleApps, statusDefs } from '../../data/compatibleApps';
import Pagination from './Pagination';
import styles from './styles.module.css'; 

export default function CompatibilityMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const containerRef = useRef(null);

  const sortedAndFilteredApps = useMemo(() => {
    const filtered = searchTerm
      ? compatibleApps.filter(app =>
          app.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : compatibleApps;

    return filtered.sort((a, b) => a.name.localeCompare(b.name));

  }, [searchTerm]);


  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredApps.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  };

  return (
    <div ref={containerRef}>
      <input
        type="text"
        placeholder="🔍 Search for an application..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />
      <div className={styles.legend}>
        {Object.entries(statusDefs).map(([status, { description }]) => (
          <p key={status}><strong>{status}:</strong> {description}</p>
        ))}
      </div>
      
      <table className={styles.appTable}>
        <thead>
          <tr>
            <th>Application</th>
            <th>Supported Versions</th>
            <th>Status</th>
            <th>OS</th>
            <th>Notes</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((app) => (
            <tr key={`${app.name}-${app.versions.join('-')}`}>
              <td>
                <strong>
                  {app.docLink ? (
                    <Link to={app.docLink}>{app.name}</Link>
                  ) : (
                    app.name
                  )}
                </strong>
                <br />
                <small>{app.category}</small>
              </td>
              <td>{app.versions.join(', ')}</td>
              <td>
                <span
                  className={styles.statusBadge}
                  style={{ backgroundColor: statusDefs[app.status]?.color || '#808080' }}
                >
                  {app.status}
                </span>
              </td>
              <td>{app.os.join(', ')}</td>
              <td>{app.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(sortedAndFilteredApps.length / itemsPerPage)}
        paginate={paginate}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
      />
    </div>
  );
}