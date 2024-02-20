import swall from 'sweetalert2';

export const Alert = (options) => {
   return swall.fire({
        ...options,
    });
} 

export const Toast = (options) => {
    return swall.mixin({
        toast: true,
        position: 'top-end',
        timer: options?.timer ?? 1500,
        showConfirmButton : false,
        timerProgressBar: true,
      }).fire({
        ...options
      })

}