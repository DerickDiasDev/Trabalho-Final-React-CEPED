import { useNavigate } from "react-router-dom";
import { useFood } from "../context/FoodContext";
import { useDeleteFlow } from "../hooks/useDeleteFlow";
import { useFilteredItems } from "../hooks/useFilteredItems";
import { useToast } from "../hooks/useToast";
import DashboardHeader from "../components/DashboardHeader";
import EmptyState from "../components/EmptyState";
import StatsRow from "../components/StatsRow";
import ConfirmModal from "../components/ConfirmModal";
import Toast from "../components/Toast";

export default function DashboardPage() {
  const { items, stats, removeItem, calcStatus, calcDaysLeft } = useFood();
  const { toasts, addToast, removeToast } = useToast();
  const { filtered, search, setSearch } = useFilteredItems(items);
  const { deleteId, setDeleteId, handleDeleteConfirm } = useDeleteFlow(
    removeItem,
    addToast,
  );
  const navigate = useNavigate();

  return (
    <>
      <DashboardHeader />
      {items.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          <StatsRow stats={stats} />
          <ProductsTable
            items={filtered}
            search={search}
            onSearch={setSearch}
            onDelete={setDeleteId}
            onNavigate={(id) => navigate(`/detalhes/${id}`)}
            calcStatus={calcStatus}
            calcDaysLeft={calcDaysLeft}
          />
        </>
      )}
      <ConfirmModal
        isOpen={deleteId !== null}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteId(null)}
      />
      <Toast toasts={toasts} onRemove={removeToast} />
    </>
  );
}
