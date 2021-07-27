import React, { useState, useContext } from 'react';

// UI elements
import Card from '../../shared/components/UIElements/Card';
import Modal from "../../shared/components/UIElements/Modal";
import Button from "../../shared/components/FormElements/Button";
import Map from '../../shared/components/UIElements/Map';
import './Report.css';

// Hooks and helpers
import { AuthContext } from '../../shared/context/auth-context';

// Begin functional component
const Report = props => {

  // Get userId of currently logged-in User;
  // Used to conditionally render "Edit" and "Delete" buttons on the detail
  // view of Reports (when they are clicked);
  const auth = useContext(AuthContext);
  const userId = auth.userId || 'guest';
  // const authorId = props.authorId;
  // const reportId = props.id;

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

  // Conditionally determine which buttons are enabled in the Report detail modal
  const footerContent = (
    <React.Fragment>
      <div className="report-item__actions">
        <Button onClick={closeDetailHandler}>
          CLOSE
        </Button>
        {userId === props.authorId && (
          <Button to={`/data/view/reports/${props.id}`}>
            EDIT
          </Button>
        )}
        {userId === props.authorId && (
          <Button danger onClick={showDeleteWarningHandler}>
            DELETE
          </Button>
        )}
      </div>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <Modal
        show={showDetail}
        onCancel={closeDetailHandler}
        header={props.title}
        contentClass="report-item__modal-content"
        footerClass="report-item__modal-actions"
        footer={footerContent}
      >
        <div className="report-item__content-map">
          <Map center={props.location} zoom={16} />
        </div>
        <div className="report-item__info">
          <h1>{props.imageUrl}</h1>
          <h3>{props.address}</h3>
          <p>{props.reportText}</p>
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass="report-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              PROCEED
            </Button>
          </React.Fragment>
        }>
        <p>
          Are you quite certain you want to delete this Report?  Can't be undone.
        </p>
      </Modal>
      <li className="report-item__" onClick={showDetailHandler}>
        <Card className="report-item__content">
          <div className="report-item__info">
            <h1>{props.imageUrl}</h1>
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.reportText}</p>
          </div>
        </Card>
      </li>
    </React.Fragment>
  );
};

export default Report;
// End functional component;
