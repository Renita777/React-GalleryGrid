import React, { useState } from 'react';
import animalData from './animalImages.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function GalleryPage() {
  const [animals, setAnimals] = useState(animalData);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 4;

  const totalPages = Math.ceil(animals.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const currentImages = animals.slice(startIndex, startIndex + imagesPerPage);

  const goToPrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const confirmDelete = (index) => {
    const confirmToastId = toast(
      ({ closeToast }) => (
        <div>
          <div>Do you want to delete this image?</div>
          <div className="mt-2 d-flex justify-content-end gap-2">
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => {
                toast.dismiss(confirmToastId);
              }}
            >
              Cancel
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => {
                toast.dismiss(confirmToastId);
                performDelete(index);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
      }
    );
  };

  const performDelete = (indexToDelete) => {
    // Show loading toast and store its id
    const toastId = toast.loading('Deleting...');

    setTimeout(() => {
      // Calculate actual index in animals array
      const globalIndex = (currentPage - 1) * imagesPerPage + indexToDelete;

      // Remove the selected animal
      const updated = animals.filter((_, i) => i !== globalIndex);
      setAnimals(updated);

      // Adjust page if needed
      const newTotalPages = Math.ceil(updated.length / imagesPerPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      } else if (newTotalPages === 0) {
        setCurrentPage(1);
      }

      // Update the toast to success and close after 2 seconds
      toast.update(toastId, {
        render: 'Deleted successfully!',
        type: 'success',
        isLoading: false,
        autoClose: 2000,
      });
    }, 1000);
  };

  return (
    <div className="container mt-4 p-4 border rounded" style={{ maxWidth: '700px' }}>
      <ToastContainer position="top-right" />

      <h2 className="text-center mb-4" style={{ color: 'purple' }}>
        Baby Animals Gallery
      </h2>

      <div className="row row-cols-1 row-cols-sm-2 g-3 justify-content-center">
        {currentImages.map((animal, index) => (
          <div className="col d-flex justify-content-center" key={animal.name + index}>
            <div className="card h-100" style={{ maxWidth: '250px', width: '100%' }}>
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  paddingTop: '100%',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
              <div className="card-body d-flex justify-content-between align-items-center p-2">
                <h6 className="mb-0">{animal.name}</h6>
                <button
                  onClick={() => confirmDelete(index)}
                  className="btn btn-sm btn-outline-danger"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center mt-4 gap-2">
        <button className="btn btn-outline-primary" onClick={goToPrev} disabled={currentPage === 1}>
          Prev
        </button>
        <span className="align-self-center">
          Page {currentPage} of {totalPages || 1}
        </span>
        <button
          className="btn btn-outline-primary"
          onClick={goToNext}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default GalleryPage;



