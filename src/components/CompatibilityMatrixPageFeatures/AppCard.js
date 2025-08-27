import React from 'react';
import Link from '@docusaurus/Link';
import OsIcon from './OsIcon';
import styles from './styles.module.css';

export default function AppCard({ app, statusDefs }) {
  const statusColor = statusDefs[app.status]?.color || '#808080';

  return (
    <div className={styles.appCard}>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>
          {app.docLink ? (
            <Link to={app.docLink}>{app.name}</Link>
          ) : (
            app.name
          )}
        </h3>
        <span
          className={styles.statusBadge}
          style={{ backgroundColor: statusColor }}
        >
          {app.status}
        </span>
      </div>
      <p className={styles.cardCategory}>{app.category}</p>
      <div className={styles.cardBody}>
        <p><strong>Versions:</strong> {app.versions.join(', ')}</p>
        <p className={styles.cardOsRow}>
          <strong>OS:</strong>
          <span className={styles.osIconContainer}>
            {app.os.map(osName => <OsIcon key={osName} os={osName} />)}
          </span>
        </p>
        <p className={styles.cardNotes}><strong>Notes:</strong> {app.notes}</p>
      </div>
    </div>
  );
}