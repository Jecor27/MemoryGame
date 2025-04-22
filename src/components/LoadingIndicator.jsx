
import React from 'react';

export default function LoadingIndicator() {
  return (
    <div className="loading">
      <div className="loading__spinner"></div>
      <div className="loading__text">Loading cosmic data...</div>
    </div>
  );
}