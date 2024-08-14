"use client";

import AddressForm from "@/components/home/address-form/address-form";
import ProductForm from "@/components/home/product-form/product-form";
import ResultModal from "@/components/home/result-modal/result-modal";
import PageTitle from "@/components/shared/page-title/page-title";
import { Address } from "@/models/Address";
import { Product } from "@/models/Product";
import { Shipping } from "@/models/Shipping";
import { ShippingResult } from "@/models/ShippingResult";
import { ShippingService } from "@/services/shipping.service";
import React, { useRef, useState } from "react";

export default function Home() {
  const shippingService = new ShippingService();
  const productFormRef = useRef<{
    getProductData: () => Product;
    clear: () => void;
  }>(null);
  const addressFormRef = useRef<{
    getAddressData: () => Address;
    clear: () => void;
  }>(null);
  const deliveryAddressFormRef = useRef<{
    getAddressData: () => Address;
    clear: () => void;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setModalOpen] = useState(true);
  const [shipping, setShipping] = useState(new Shipping());
  const [cheaper, setCheaper] = useState(new ShippingResult());
  const [faster, setFaster] = useState(new ShippingResult());

  const cleanForm = () => {
    productFormRef.current?.clear();
    addressFormRef.current?.clear();
    deliveryAddressFormRef.current?.clear();
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const product = productFormRef.current?.getProductData();
    const collectionAddress = addressFormRef.current?.getAddressData();
    const deliveryAddress = deliveryAddressFormRef.current?.getAddressData();

    if (!product || !collectionAddress || !deliveryAddress) {
      alert("preencha as informações obrigatórias");
      return;
    }

    const { shipping, cheaper, faster } = await shippingService.create({
      product,
      collectionAddress,
      deliveryAddress,
    });
    setLoading(false);
    setModalOpen(true);
    setShipping(shipping);
    setFaster(faster);
    setCheaper(cheaper);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <main className="flex flex-col items-center justify-between p-10">
      <PageTitle title="Simulador de Frete" />

      <div className="w-100-l">
        <form onSubmit={handleSubmit}>
          <ProductForm ref={productFormRef} />
          <AddressForm title="Endereço de Retirada:" ref={addressFormRef} />
          <AddressForm
            title="Endereço de Entrega:"
            ref={deliveryAddressFormRef}
          />

          <div className="buttons">
            <button className="button mt-5" type="submit" disabled={loading}>
              {loading ? "Carregando..." : "Salvar"}
            </button>

            <button className="button mt-5" type="button" onClick={cleanForm}>
              Limpar
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && shipping.id && (
        <div>
          <ResultModal
            cheaper={cheaper}
            faster={faster}
            shipping={shipping}
            onCloseModal={closeModal}
          />
        </div>
      )}
    </main>
  );
}
