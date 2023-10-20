import React, { useState } from "react";
import styles from "./DetailsRDV.module.css";

const DetailsRDV = ({ event, onSave, onRemove, onClose }) => {
  const [editedEvent, setEditedEvent] = useState(event);
  const { details, dateRDV, heureRDV } = editedEvent;

  const setEditedField = (field, value) => {
    setEditedEvent({ ...editedEvent, [field]: value });
  };

  const handleSave = () => {
    onSave(editedEvent);
  };

  const handleRemove = () => {
    onRemove(event);
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <button
            className={styles.closeButton}
            onClick={handleClose}
            type="button"
          >
            Close
          </button>
        </div>
        <div className={styles.body}>
          <label htmlFor="details">Title</label>
          <input
            type="text"
            id="details"
            value={details}
            onChange={(e) => setEditedField("details", e.target.value)}
          />
          <label htmlFor="date">Date</label>
          <input
            type="date"
            id="date"
            value={dateRDV}
            onChange={(e) => setEditedField("dateRDV", e.target.value)}
          />
          <label htmlFor="hours">Hours</label>
          <input
            type="text"
            id="hours"
            value={heureRDV}
            onChange={(e) => setEditedField("heureRDV", e.target.value)}
          />
          <button
            className={styles.saveButton}
            onClick={handleSave}
            type="button"
          >
            Save
          </button>
          <button 

            className={styles.removeButton}
          onClick={handleRemove} type="button">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsRDV;
