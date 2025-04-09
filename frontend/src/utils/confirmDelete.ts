import Swal from 'sweetalert2';

export const confirmDelete = async (): Promise<boolean> => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the movie/TV show.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
  });

  return result.isConfirmed;
};
