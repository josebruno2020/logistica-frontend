"use client";

import PageTitle from "@/components/shared/page-title/page-title";
import ShowShippingResult from "@/components/shared/shipping-result/show-shipping-result";
import {
  ShippingCreateResponse,
  ShippingService,
} from "@/services/shipping.service";
import { useEffect, useState } from "react";
import styles from "./lasts.module.css";

export default function Shippings() {
  const shippingService = new ShippingService();
  const [shippings, setShippings] = useState<ShippingCreateResponse[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    shippingService
      .list()
      .then((shippings) => setShippings(shippings))
      .catch((err) => alert("Não foi possivel buscar as informações"))
      .finally(() => setLoading(false));
  }, []);
  const displayDate = (date: Date | string): string => {
    return new Date(date).toLocaleString().replace(",", "");
  };
  return (
    <main className="flex flex-col items-center justify-between md:p-10">
      <PageTitle title="Últimas simulações" />

      <div className="w-100-l">
        {loading && <p>Carregando...</p>}
        {shippings.map(({ shipping, faster, cheaper }, i) => {
          return (
            <div key={i} className={styles.shipping}>
              <div className={styles.modalHeader}>
                <h3>Simulação de Frete - {displayDate(shipping.createdAt)}</h3>
              </div>
              <ShowShippingResult
                shipping={shipping}
                faster={faster}
                cheaper={cheaper}
                showProduct
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
