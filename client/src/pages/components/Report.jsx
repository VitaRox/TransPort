import React, { useState } from 'react';

// UI elements
import Card from '../../shared/components/UIElements/Card';
import Modal from "../../shared/components/UIElements/Modal";
import './Report.css';

// Represents the frontend view of a Report
const Report = props => {

  // This controls whether the detail view Modal is showing
  const [showDetail, setShowDetail] = useState(false);
  // Whether confirmation ("Are you sure?") modal is showing
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Detail view handlers
  const showDetailHandler = () => setShowDetail(true);
  const closeDetailHandler = () => setShowDetail(false);

  // Delete handlers
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
    console.log("Deleting now...");
  };

  return (
    <Card className="report-item__">
      <div className="report-item__info">
        <h1>{props.imageUrl}</h1>
        <h2>{props.title}</h2>
        <h3>{props.address}</h3>
        <p>{props.reportText}</p>
      </div>
    </Card>
  );

};

export default Report;
