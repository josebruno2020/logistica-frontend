import AppInput from "@/components/shared/input/app-input";
import PageSubtitle from "@/components/shared/page-subtitle/page-subtitle";
import { Address } from "@/models/Address";
import { PostalCodeService } from "@/services/postal-code.service";
import { forwardRef, useImperativeHandle, useState } from "react";

interface AddressFormProps {
  title: string;
}

const AddressForm = forwardRef(({ title }: AddressFormProps, ref) => {
  const postalCodeService = new PostalCodeService();
  const [address, setAddress] = useState(new Address());
  const handleAddressInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    const newAddress = { ...address, [name]: value };
    setAddress(newAddress);
  };

  const searchPostalCodeInViaCep = async () => {
    if (!address.postalCode || !address.postalCode.length) {
      return;
    }
    const newAddress = await postalCodeService.setAddressByPostalCode(
      address.postalCode.trim()
    );
    setAddress(newAddress);
  };

  useImperativeHandle(ref, () => ({
    getAddressData: () => address,
    clear: () => setAddress(new Address()),
  }));
  return (
    <div>
      <PageSubtitle subtitle={title} />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-2">
        <AppInput
          placeholder="CEP"
          value={address.postalCode}
          name="postalCode"
          onInput={handleAddressInput}
          onBlur={searchPostalCodeInViaCep}
          isRequired={true}
        />
        <AppInput
          placeholder="Cidade"
          value={address.city}
          name="city"
          onInput={handleAddressInput}
          isRequired={true}
        />
        <AppInput
          placeholder="Estado"
          value={address.state}
          name="state"
          onInput={handleAddressInput}
          isRequired={true}
        />
        <AppInput
          placeholder="Bairro"
          value={address.neighborhood}
          name="neighborhood"
          onInput={handleAddressInput}
          isRequired={true}
        />
        <AppInput
          placeholder="Rua"
          value={address.street}
          name="street"
          onInput={handleAddressInput}
          isRequired={true}
        />
        <AppInput
          placeholder="Número"
          value={address.number}
          name="number"
          onInput={handleAddressInput}
          isRequired={true}
        />
      </div>
    </div>
  );
});

AddressForm.displayName = "AddressForm";
export default AddressForm;
