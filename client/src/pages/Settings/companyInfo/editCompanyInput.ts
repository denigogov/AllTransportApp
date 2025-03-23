import { DefaultInputValuesTypes } from "../../../types/InputTypes";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";

export function companyBankInput(
  companyData?: CompanyInfoTypes
): DefaultInputValuesTypes[] {
  const formInputs: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Bank Name",
      name: "bankName",
      type: "text",
      minLength: 3,
      maxLength: 20,
      minLengthMessage: "Bank Name should be min 3 letters",
      maxLengthMessage: "Bank Name should be max 20 letters",
      defaultValue: companyData?.bankName ?? "No Bank Found",
    },
    {
      id: 2,
      label: "IBAN",
      name: "iban",
      type: "text",
      minLength: 15,
      maxLength: 40,
      minLengthMessage: "IBAN should be min 15 letters",
      maxLengthMessage: "IBAN should be max 40 letters",
      defaultValue: companyData?.iban ?? "No IBAN found",
    },
    {
      id: 3,
      label: "BIC",
      name: "bic",
      type: "text",
      minLength: 8,
      maxLength: 11,
      minLengthMessage: "BIC should be min 8 letters",
      maxLengthMessage: "BIC should be max 11 letters",
      defaultValue: companyData?.bic ?? "No BIC found",
    },
  ];

  return formInputs;
}

export function companyInfoInputForm(
  companyData?: CompanyInfoTypes
): DefaultInputValuesTypes[] {
  const formInputs: DefaultInputValuesTypes[] = [
    {
      id: 1,
      label: "Company Name",
      name: "companyName",
      type: "text",
      minLength: 3,
      maxLength: 40,
      minLengthMessage: "Company Name should be min 3 letters",
      maxLengthMessage: "Company Name should be max 40 letters",
      defaultValue: companyData?.companyName ?? "No Company Name Found",
    },
    {
      id: 2,
      label: "Street",
      name: "street",
      type: "text",
      minLength: 3,
      maxLength: 60,
      minLengthMessage: "Street should be min 3 letters",
      maxLengthMessage: "Street should be max 60 letters",
      defaultValue: companyData?.street ?? "No Street found",
    },
    {
      id: 3,
      label: "City",
      name: "city",
      type: "text",
      minLength: 3,
      maxLength: 20,
      minLengthMessage: "City should be min 3 letters",
      maxLengthMessage: "City should be max 20 letters",
      defaultValue: companyData?.city ?? "No City found",
    },
    {
      id: 4,
      label: "ZipCode",
      name: "zipcode",
      type: "text",
      minLength: 4,
      maxLength: 10,
      minLengthMessage: "ZipCode should be min 4 letters",
      maxLengthMessage: "ZipCode should be max 10 letters",
      defaultValue: companyData?.zipcode ?? "No ZipCode found",
    },
    {
      id: 5,
      label: "Country",
      name: "country",
      type: "text",
      minLength: 3,
      maxLength: 15,
      minLengthMessage: "Country should be min 3 letters",
      maxLengthMessage: "Country should be max 15 letters",
      defaultValue: companyData?.country ?? "No Country found",
    },
    {
      id: 6,
      label: "ID Number",
      name: "idNumber",
      type: "text",
      minLength: 4,
      maxLength: 20,
      minLengthMessage: "ID Number should be min 4 letters",
      maxLengthMessage: "ID Number should be max 20 letters",
      defaultValue: companyData?.idNumber ?? "No ID Number found",
    },
  ];

  return formInputs;
}
