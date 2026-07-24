import AddProduct from "./AddProduct";
import type { ProductData } from "./AddProduct";

interface Props {
  product: ProductData;
  onUpdate: (product: ProductData) => void;
  onCancel: () => void;
}

export default function EditProduct({
  product,
  onUpdate,
  onCancel,
}: Props) {
  return (
    <AddProduct
      initialData={product}
      onSubmit={onUpdate}
      isEditing={true}
      onCancel={onCancel}
    />
  );
}