import React from 'react';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import EditIcon from '@mui/icons-material/Edit';
import styles from './styles.module.css';

export default function EditThisPage() {
  const location = useLocation();
  const {siteConfig} = useDocusaurusContext();

  // Get the current path and convert it to a GitHub edit URL
  const currentPath = location.pathname;
  const docPath = currentPath.replace('/docs/', '');

  // Safely access the editUrl with fallback
  const editUrl = siteConfig.presets?.[0]?.[1]?.docs?.editUrl || 'https://github.com/juice-labs/juice-docs/edit/master/';

  // Construct the edit URLs
  const githubEditUrl = `${editUrl.replace('/blob/', '/edit/')}docs/${docPath}.md`;
  const customEditUrl = `/juice-docs/edit?path=${docPath}`;

  return (
    <div className={styles.editContainer}>
      <h3 className={styles.editTitle}>Help Improve This Page</h3>
      <div className={styles.editButtons}>
        <Link
          to={githubEditUrl}
          className={styles.editButton}
          target="_blank"
          rel="noopener noreferrer"
        >
          <EditIcon className={styles.editIcon} />
          Edit on GitHub
        </Link>
        <Link
          to={customEditUrl}
          className={`${styles.editButton} ${styles.editButtonSecondary}`}
        >
          More Editing Options
        </Link>
      </div>
      <p className={styles.editDescription}>
        Found a mistake? Want to contribute? Edit this page on GitHub or explore more editing options.
      </p>
    </div>
  );
}