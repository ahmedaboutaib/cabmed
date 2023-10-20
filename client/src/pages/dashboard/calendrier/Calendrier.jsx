import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { modifyRendezVous, removeRendezVous } from "@api/dashboard/rendezvous";
import "moment/dist/locale/fr";
import CustomToolbar from "./CustomToobar";
import DetailsRDV from "./DetailsRDV";
import { Login } from "../../_helpers/service";
import { useCabinetId } from "../../_helpers/Tokin";
import { fetchRendezVous } from "../../../utils/apis3";

moment.locale("fr");

const localizer = momentLocalizer(moment);

const RendezVous = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //const [updatedEvent, setUpdatedEvent] = useState(selectedEvent)
  const CabinetId = useCabinetId();
  useEffect(() => {
    if (!CabinetId) {
      return;
    }
    const loadEvents = async () => {
      const fetchedRendezVous = await fetchRendezVous(CabinetId);
      const formattedRendezVous = fetchedRendezVous.map((rendezVous) => ({
        ...rendezVous,
        title: rendezVous.details,
        start: moment(rendezVous.dateRDV).toDate(),
        end: moment(rendezVous.start)
          .add(rendezVous.heureRDV, "hours")
          .toDate(),
      }));
      setEvents(formattedRendezVous);
    };

    loadEvents();
  }, []);

  const handleEventSelect = (event) => {
    setShowModal(true);
    setSelectedEvent(event);
  };
  const onClose = () => {
    setShowModal(false);
  };
  const handleEventRemove = async (event) => {
    try {
      const removed = await removeRendezVous(event);
      if (removed) {
        setEvents((prevEvents) =>
          prevEvents.filter((ev) => ev.id !== event.id)
        );
      }
    } catch (error) {
      console.error("Error removing event:", error);
    }
  };

  const handleEventModify = async (event) => {
    try {
      const modified = await modifyRendezVous(event);
      if (modified) {
        setEvents((prevEvents) =>
          prevEvents.map((ev) => (ev.id === event.id ? event : ev))
        );
      }
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  return (
    <>
      <div className="row column_title ">
        <div className="col-md-12 ">
          <div
            className={
              Login().roles === "medecin"
                ? "page_title medcin"
                : Login().roles === "secretaire"
                ? "page_title secretair"
                : "page_title "
            }
          >
            <center>
              {" "}
              <h2>Calendrier</h2>
            </center>
          </div>
        </div>
      </div>
      <div style={{ height: "700px" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleEventSelect}
          components={{
            toolbar: CustomToolbar,
          }}
        />
        {selectedEvent && showModal && (
          <DetailsRDV
            event={selectedEvent}
            onSave={handleEventModify}
            onRemove={handleEventRemove}
            onClose={onClose}
          />
        )}
      </div>
    </>
  );
};

export default RendezVous;
