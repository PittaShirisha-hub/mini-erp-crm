import AddSupplier from "./AddSupplier";
import type { SupplierData } from "./AddSupplier";

interface Props {
  supplier: SupplierData;
  onUpdate: (supplier: SupplierData) => void;
  onCancel: () => void;
}

export default function EditSupplier({
  supplier,
  onUpdate,
  onCancel,
}: Props) {
  return (
    <AddSupplier
      initialData={supplier}
      onSubmit={onUpdate}
      isEditing={true}
      onCancel={onCancel}
    />
  );
}