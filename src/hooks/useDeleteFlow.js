import { useState } from "react";

export function useDeleteFlow(removeItem, addToast) {
  const [deleteId, setDeleteId] = useState(null);

  function handleDeleteConfirm() {
    removeItem(deleteId);
    setDeleteId(null);
    addToast("Item excluído com sucesso.", "success");
  }

  return { deleteId, setDeleteId, handleDeleteConfirm };
}
