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
  useEffect(() => {
    shippingService.list().then((shippings) => setShippings(shippings));
  }, []);
  return (
    <main className="flex flex-col items-center justify-between p-10">
      <PageTitle title="Últimas simulações" />

      <div className="w-100-l">
        {shippings.map(({ shipping, faster, cheaper }, i) => {
          return (
            <div key={i} className={styles.shipping}>
              <div className={styles.modalHeader}>
                <h3>Simulação de Frete</h3>
              </div>
              <ShowShippingResult
                shipping={shipping}
                faster={faster}
                cheaper={cheaper}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
