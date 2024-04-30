import { toast } from "sonner";

const ConfirmationModal = ({ toggleModal, customerId, status, handleDone }) => {
  const label =
    status === "active"
      ? "activate"
      : status === "inactive"
      ? "deactivate"
      : status;

  const handleConfirmation = async (status) => {
    toggleModal(status);
    const url = `${
      import.meta.env.VITE_HUNGREZY_API
    }/api/user/${customerId}/updateStatus`;
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const result = await response.json();
    if (!response.ok) {
      const error = result.message;
      toast.error(error);
      return;
    }
    handleDone();
    if (status === "active") {
      toast.success("User activated successfully");
      return;
    }
    toast.success("User deactivated successfully");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-96">
        <h1 className="text-xl font-medium mb-4">Are you sure?</h1>
        <p className="text-gray-500 mb-4">
          Are you sure you want to {label} this customer?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700"
            onClick={() => toggleModal(null)}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-500 rounded-lg text-white"
            onClick={() => handleConfirmation(status)}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
