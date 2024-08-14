import ShowShippingResult from "@/components/shared/shipping-result/show-shipping-result";
import { Shipping } from "@/models/Shipping";
import { ShippingResult } from "@/models/ShippingResult";
import styles from "./result-modal.module.css";

export interface ResultModalProps {
  shipping: Shipping;
  faster: ShippingResult;
  cheaper: ShippingResult;
  onCloseModal: () => void;
}

export default function ResultModal({
  shipping,
  faster,
  cheaper,
  onCloseModal,
}: ResultModalProps) {
  return (
    <section className={styles.modalBackground}>
      <main className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Simulação de Frete - Resultado</h3>
          <label>
            <button onClick={onCloseModal}>X</button>
          </label>
        </div>
        <ShowShippingResult
          shipping={shipping}
          faster={faster}
          cheaper={cheaper}
        />
      </main>
    </section>
  );
}
