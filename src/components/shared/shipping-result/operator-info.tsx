import { ShippingResult } from "@/models/ShippingResult";
import styles from "./shipping-result.module.css";

export interface OperatorInfoProps {
  result: ShippingResult;
  title: string;
}

export default function OperatorInfo({ result, title }: OperatorInfoProps) {
  const formatCurrency = (value: number): string => {
    return Number(value).toLocaleString("pt-br", {
      style: "currency",
      currency: "BRL",
    });
  };
  return (
    <div className={styles.contentInfo}>
      <p>
        <strong>{title}</strong>
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Valor</th>
            <th>Dias para entrega</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{result.operatorName}</td>
            <td>{formatCurrency(result.totalCost)}</td>
            <td>{result.deliveryTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
