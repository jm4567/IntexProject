// Import SweetAlert2 for modal dialogs
import Swal from 'sweetalert2';

// Utility function to confirm deletion using a modal
export const confirmDelete = async (): Promise<boolean> => {
  // Show SweetAlert2 confirmation dialog
  const result = await Swal.fire({
    title: 'Are you sure?', // Dialog title
    text: 'This will permanently delete the movie/TV show.', // Warning message
    icon: 'warning', // Warning icon
    showCancelButton: true, // Show both confirm and cancel buttons
    confirmButtonText: 'Yes, delete it!', // Text for confirm button
    cancelButtonText: 'Cancel', // Text for cancel button
    confirmButtonColor: '#d33', // Red color for confirm
    cancelButtonColor: '#3085d6', // Blue color for cancel
  });

  // Return true only if the user confirmed
  return result.isConfirmed;
};
