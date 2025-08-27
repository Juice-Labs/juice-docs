import React from 'react';
import styles from './styles.module.css';

export default function OsIcon({ os }) {
  switch (os.toLowerCase()) {
    case 'windows':
      return (
        <img
          src="/img/window-logo.png"
          alt="Windows Icon"
          className={styles.osIconImg}
          title="Windows"
        />
      );
    case 'linux':
      return (
        <img
          src="/img/ubuntu.png"
          alt="Linux Icon"
          className={styles.osIconImg}
          title="Linux"
        />
      );
    default:
      return null;
  }
}