// UPDATED: Import Link from Docusaurus
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

    // Define the custom sort order for statuses
    const statusOrder = {
      'Verified': 1,
      'Community Tested': 2,
      'In Progress': 3,
      'Known Issues': 4
    };

    return filtered.sort((a, b) => {
      // 1. Primary sort by category
      const categoryCompare = a.category.localeCompare(b.category);
      if (categoryCompare !== 0) {
        return categoryCompare;
      }

      // 2. Secondary sort by status using the custom order
      const statusCompare = statusOrder[a.status] - statusOrder[b.status];
      if (statusCompare !== 0) {
        return statusCompare;
      }

      // 3. Tertiary sort by name
      return a.name.localeCompare(b.name);
    });
  }, [searchTerm]);


  useEffect(() => {
    setCurrentPage(1);
    // ...this logic is unchanged...
  }, [searchTerm, itemsPerPage]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredApps.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    // ...this logic is unchanged...
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
    }
  };

  return (
    <div ref={containerRef}>
      {/* ...search input and legend are unchanged... */}
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
              {/* UPDATED: This cell now conditionally renders a link */}
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