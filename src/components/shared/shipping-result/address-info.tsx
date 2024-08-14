import { Address } from "@/models/Address";
import styles from "./shipping-result.module.css";

export interface AddressInfoProps {
  address: Address;
  title: string;
}

export default function AddressInfo({ address, title }: AddressInfoProps) {
  const formatAddress = ({
    street,
    number,
    neighborhood,
    city,
    state,
    postalCode,
  }: Address): string => {
    return `${street}, ${number} - ${neighborhood}, ${city} - ${state}, ${postalCode}`;
  };
  return (
    <div className={styles.contentInfo}>
      <p>
        <strong>{title}</strong>
      </p>
      <span>{formatAddress(address)}</span>
      <p className={styles.lat}>
        Latitude: {address.lat}, Longitude: {address.long}
      </p>
    </div>
  );
}
