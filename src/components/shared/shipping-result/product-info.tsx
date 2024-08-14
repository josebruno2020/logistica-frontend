import { Product } from "@/models/Product";
import styles from "./shipping-result.module.css";

export interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className={styles.contentInfo}>
      <p>
        <strong>Informações do Produto:</strong>
      </p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Altura</th>
            <th>Largura</th>
            <th>Comprimento</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{product.height}</td>
            <td>{product.width}</td>
            <td>{product.length}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
