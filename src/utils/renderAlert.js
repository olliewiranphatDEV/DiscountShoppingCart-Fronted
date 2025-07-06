import Swal from "sweetalert2";

export const renderAlert = (msg, icon) => {
    return Swal.fire({
        text: msg,
        icon: icon,
        confirmButtonText: "OK",
        showCancelButton: icon === "question", //WORK!, WHEN icon === "error" -- renderAlert("Something went wrong", "error")
        cancelButtonText: "Cancel",
        customClass: {
            popup: "rounded-2xl shadow-lg z-50",
            confirmButton: 'cursor-pointer bg-red-500 text-white font-semibold px-4 py-2 rounded hover:scale-110  hover:duration-500 outline-none mr-4',
            cancelButton: 'cursor-pointer bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 hover:duration-300 outline-none'
        },
        buttonsStyling: false
    });
}
