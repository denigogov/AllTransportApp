import "../../../Styling/Pages/_editInfoCompany.scss";
import useSWR, { mutate } from "swr";
import { useAuth } from "../../../helpers/useAuth";
import { CompanyInfoTypes } from "../../../types/companyInfoTypes";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { apiGeneralErrorHandle } from "../../../components/GlobalComponents/ErrorShow";
import {
  confirmUpdatePrompt,
  updateActionPrompt,
} from "../../../components/GlobalComponents/updatePrompt";
import { updateCompanyInfo } from "../../../api/companyInfoAPI";
import EditInput from "../../../components/GlobalComponents/EditInput";
import LoadingRing from "../../../components/GlobalComponents/LoadingRing";
import ErrorMinimalDisplay from "../../../components/GlobalComponents/ErrorMinimalDisplay";
import { companyBankInput } from "./editCompanyInput";

const EditBankCompany: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const setPopupOpen =
    useOutletContext<React.Dispatch<React.SetStateAction<boolean>>>();

  const {
    data: companyData,
    error: companyDataError,
    isLoading: companyDataLoading,
  } = useSWR<CompanyInfoTypes[]>(["companyData", token]);

  const selectedCompany =
    companyData?.find((company) => company?.id === Number(id)) ??
    companyData?.[0];

  const handleUpdate = async (query: Partial<CompanyInfoTypes>) => {
    try {
      const confirmUpdateMessage = await confirmUpdatePrompt(
        "Update Company Details",
        "Are you sure you want to save the changes you made? This action will update your Comapny Details.",
        "Yes, update it!"
      );

      if (confirmUpdateMessage.isConfirmed) {
        await updateCompanyInfo(Number(id) ?? null, token ?? "", query);

        mutate(["companyData", token]);
        updateActionPrompt("Great!", "Your Updates has been saved.");
        setPopupOpen((e) => !e);
        navigate("/settings/company-profile/");
      }
    } catch (err: unknown) {
      apiGeneralErrorHandle(err);
    }
  };

  const formInputs = companyBankInput(selectedCompany);

  if (companyDataError)
    return <ErrorMinimalDisplay errorMessage={companyDataError?.message} />;
  if (companyDataLoading) return <LoadingRing />;

  return (
    <div className="editBankCompany">
      <EditInput
        title="Company Details Update"
        buttonName="Update"
        defaultInputValues={formInputs}
        sendRequestFn={handleUpdate}
      />
    </div>
  );
};

export default EditBankCompany;
