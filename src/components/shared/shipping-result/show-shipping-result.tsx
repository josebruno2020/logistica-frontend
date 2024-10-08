import { Shipping } from "@/models/Shipping";
import { ShippingResult } from "@/models/ShippingResult";
import AddressInfo from "./address-info";
import OperatorInfo from "./operator-info";
import ProductInfo from "./product-info";
import styles from "./shipping-result.module.css";

export interface ShowShippingResultProps {
  shipping: Shipping;
  faster: ShippingResult;
  cheaper: ShippingResult;
  showProduct?: boolean;
}

export default function ShowShippingResult({
  shipping,
  faster,
  cheaper,
  showProduct,
}: ShowShippingResultProps) {
  return (
    <section>
      <div className={styles.section}>
        <AddressInfo
          title="Edereço de Retirada:"
          address={shipping.collectionAddress}
        />
        <AddressInfo
          title="Endereço de Entrega:"
          address={shipping.deliveryAddress}
        />
        <div className={styles.contentInfo}>
          <p>Distância:</p>
          <span>
            <strong>{shipping.distance}</strong> Km
          </span>
        </div>

        <hr className={styles.separator} />

        {showProduct && <ProductInfo product={shipping.product} />}

        <OperatorInfo result={faster} title="Operador mais Rápido:" />
        <OperatorInfo result={cheaper} title="Operador mais Barato:" />
      </div>
    </section>
  );
}
