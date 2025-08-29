import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import { compatibleApps, statusDefs } from '../../data/compatibleApps';
import Pagination from './Pagination';
import AppCard from './AppCard';
import OsIcon from './OsIcon';
import styles from './styles.module.css'; 

export default function CompatibilityMatrix() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 
  const containerRef = useRef(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('Table');
  const [sortBy, setSortBy] = useState('name');
  
  const [isMobile, setIsMobile] = useState(false);

  // detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const categories = useMemo(() => {
    return ['All', ...new Set(compatibleApps.map(app => app.category).sort())];
  }, []);

  const sortedAndFilteredApps = useMemo(() => {
    let filtered = compatibleApps;
    if (searchTerm) {
      filtered = filtered.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (selectedStatus !== 'All') {
      filtered = filtered.filter(app => app.status === selectedStatus);
    }
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(app => app.category === selectedCategory);
    }

    if (sortBy === 'category') {
      return filtered.sort((a, b) => {
        const categoryCompare = a.category.localeCompare(b.category);
        if (categoryCompare !== 0) return categoryCompare;
        return a.name.localeCompare(b.name);
      });
    } else { 
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
  }, [searchTerm, selectedStatus, selectedCategory, sortBy]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, itemsPerPage, selectedStatus, selectedCategory, sortBy]);

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

  const shouldShowCards = isMobile || viewMode === 'Card';

  return (
    <div ref={containerRef}>
      <input
        type="text"
        placeholder="🔍 Search for an application..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchInput}
      />

      <div className={styles.controlsContainer}>
        <div className={styles.filterControls}>
          <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} className={styles.filterSelect}>
            <option value="All">All Statuses</option>
            {Object.keys(statusDefs).map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={styles.filterSelect}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category === 'All' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={styles.filterSelect}>
            <option value="name">Sort by Name (A-Z)</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>

        {!isMobile && (
          <div className={styles.viewToggle}>
            <button onClick={() => setViewMode('Table')} disabled={viewMode === 'Table'}>Table</button>
            <button onClick={() => setViewMode('Card')} disabled={viewMode === 'Card'}>Cards</button>
          </div>
        )}
      </div>
      
      <div className={styles.legend}>
        {Object.entries(statusDefs).map(([status, { description }]) => (
          <p key={status}><strong>{status}:</strong> {description}</p>
        ))}
      </div>
      
      {shouldShowCards ? (
        <div className={styles.cardGrid}>
          {currentItems.map((app) => (
            <AppCard key={`${app.name}-${app.versions.join('-')}`} app={app} statusDefs={statusDefs} />
          ))}
        </div>
      ) : (
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
                <td className={styles.osCell}>
                  <div className={styles.osIconContainer}>
                    {app.os.map(osName => <OsIcon key={osName} os={osName} />)}
                  </div>
                </td>
                <td>{app.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

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