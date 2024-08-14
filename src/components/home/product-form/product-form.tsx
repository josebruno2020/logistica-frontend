import AppInput from "@/components/shared/input/app-input";
import PageSubtitle from "@/components/shared/page-subtitle/page-subtitle";
import { Product } from "@/models/Product";
import React, { forwardRef, useImperativeHandle, useState } from "react";

interface ProductFormProps {}

const ProductForm = forwardRef((props: ProductFormProps, ref) => {
  const [product, setProduct] = useState(new Product());

  const handleInputChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    const newProduct = { ...product, [name]: value };
    setProduct(newProduct);
  };

  useImperativeHandle(ref, () => ({
    getProductData: () => product,
    clear: () => setProduct(new Product()),
  }));

  return (
    <div>
      <PageSubtitle subtitle="Informações do item:" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        <AppInput
          type="number"
          name="height"
          value={product.height ?? ""}
          placeholder="Altura em cm"
          onInput={handleInputChange}
          isRequired={true}
        />
        <AppInput
          name="width"
          type="number"
          value={product.width ?? ""}
          placeholder="Largura em cm"
          onInput={handleInputChange}
          isRequired={true}
        />
        <AppInput
          name="length"
          type="number"
          value={product.length ?? ""}
          placeholder="Comprimento em cm"
          onInput={handleInputChange}
          isRequired={true}
        />
      </div>
    </div>
  );
});

ProductForm.displayName = "ProductForm";

export default ProductForm;
