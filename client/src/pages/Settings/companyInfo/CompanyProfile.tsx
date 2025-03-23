import useSWR from "swr";
import { fetchCompanyInfo } from "../../../api/companyInfoAPI";
import CompanyDetails from "../../../components/Settings/CompanyProfile/CompanyDetails";
import { useAuth } from "../../../helpers/useAuth";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface DetailItem {
  label: string;
  value: string | number | null | undefined;
}

const CompanyProfile: React.FC = () => {
  const [popUpOpen, setPopupOpen] = useState<boolean>(false);
  const [companyID, setCompanyID] = useState<number | null>(null);
  const navigator = useNavigate();
  const location = useLocation();

  const popupWindow = () => {
    setPopupOpen((x) => !x);
    navigator("/settings/company-profile");
  };
  const { token } = useAuth();

  const {
    data: companyData,
    error: companyDataError,
    isLoading: companyDataLoading,
  } = useSWR<CompanyInfoTypes[]>(["companyData", token], () =>
    fetchCompanyInfo(token ?? "")
  );

  // currently selected company based on the ID
  const selectedCompany =
    companyData?.find((company) => company.id === companyID) ??
    companyData?.[0];

  if (!companyID && companyData?.length) {
    setCompanyID(companyData[0].id);
  }

  const companyDetails: DetailItem[] = selectedCompany
    ? [
        { label: "Company Name", value: selectedCompany.companyName ?? "N/A" },
        { label: "Street", value: selectedCompany.street ?? "N/A" },
        { label: "City", value: selectedCompany.city ?? "N/A" },
        { label: "ZipCode", value: selectedCompany.zipcode ?? "N/A" },
        { label: "Country", value: selectedCompany.country ?? "N/A" },
        { label: "ID Number", value: selectedCompany.idNumber ?? "N/A" },
      ]
    : [];

  const bankDetails: DetailItem[] = selectedCompany
    ? [
        { label: "Bank Name", value: selectedCompany.bankName ?? "N/A" },
        { label: "IBAN", value: selectedCompany.iban ?? "N/A" },
        { label: "BIC", value: selectedCompany.bic ?? "N/A" },
      ]
    : [];

  return (
    <div>
      <select
        onChange={(e) => setCompanyID(Number(e.target.value))}
        value={companyID ?? ""}
        className="companySelect"
      >
        {companyData?.map((company) => (
          <option key={company.id} value={company.id}>
            {company.companyName}
          </option>
        ))}
      </select>

      <CompanyDetails
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        companyDetails={companyDetails}
        title="Company Details"
        navigateTo={`${
          location.pathname === "/settings"
            ? `company-profile/edit-info/${companyID}`
            : `edit-info/${companyID}`
        }`}
        setPopupOpen={setPopupOpen}
      />
      <CompanyDetails
        companyDataError={companyDataError}
        companyDataLoading={companyDataLoading}
        companyDetails={bankDetails}
        title="Bank Details"
        navigateTo={`${
          location.pathname === "/settings"
            ? `company-profile/edit-bank/${companyID}`
            : `edit-bank/${companyID}`
        }`}
        setPopupOpen={setPopupOpen}
      />

      {popUpOpen && (
        <div className="overlay" onClick={popupWindow}>
          <main className="popUp mdPopup" onClick={(e) => e.stopPropagation()}>
            <Outlet context={setPopupOpen} />
          </main>
        </div>
      )}
    </div>
  );
};

export default CompanyProfile;
