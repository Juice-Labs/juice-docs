import React, { useState, useEffect } from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';
import styles from './edit.module.css';

function EditPage() {
  const location = useLocation();
  const [path, setPath] = useState('');
  const [githubUrl, setGithubUrl] = useState('');

  useEffect(() => {
    // Check if we have a path parameter in the URL
    const params = new URLSearchParams(location.search);
    const pathParam = params.get('path');

    if (pathParam) {
      setPath(pathParam);
      // Construct GitHub edit URL - using the correct format for GitHub editing
      const githubEditUrl = `https://github.com/juice-labs/juice-docs/edit/master/docs/${pathParam}.md`;
      setGithubUrl(githubEditUrl);
    }
  }, [location]);

  return (
    <Layout
      title="Edit Documentation"
      description="Edit Juice documentation"
    >
      <div className="container margin-vert--lg">
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Edit Documentation</h1>

            <div className={styles.editSection}>
              <h2>Current Page</h2>
              {path ? (
                <p>You are editing: <code>{path}.md</code></p>
              ) : (
                <p>No specific page selected. Please select a page to edit from the documentation.</p>
              )}

              {githubUrl && (
                <div className={styles.editOptions}>
                  <h2>Editing Options</h2>

                  <div className={styles.editOption}>
                    <h3>Option 1: Edit directly on GitHub</h3>
                    <p>
                      The easiest way to edit this page is directly on GitHub.
                      GitHub provides a web-based editor where you can make changes and submit them for review.
                    </p>
                    <Link
                      className="button button--primary"
                      to={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Edit on GitHub
                    </Link>
                  </div>

                  <div className={styles.editOption}>
                    <h3>Option 2: Clone the repository</h3>
                    <p>
                      For more extensive changes, you might want to clone the repository and work locally:
                    </p>
                    <div className={styles.codeBlock}>
                      <code>
                        git clone https://github.com/juice-labs/juice-docs.git<br />
                        cd juice-docs<br />
                        npm install<br />
                        npm start
                      </code>
                    </div>
                  </div>
                </div>
              )}

              <div className={styles.helpSection}>
                <h2>Need Help?</h2>
                <p>
                  If you need assistance with editing the documentation, please refer to our
                  <Link to="/docs/contributing"> Contributing Guide</Link> or
                  <Link to="https://github.com/juice-labs/juice-docs/issues/new"> open an issue</Link> on GitHub.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default EditPage;