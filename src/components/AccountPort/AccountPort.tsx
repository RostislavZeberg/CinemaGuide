import { Loader } from "../Loader";
import { AuthForm } from "../../Modal/AuthForm";
import { FC, useEffect } from "react";

interface logInProps {
  modalActive: boolean;
  setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
  setLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  logInQueryStatus: unknown;
}

export const AccountPort: FC<logInProps> = ({
  modalActive,
  setModalActive,
  setLogIn,
  logInQueryStatus,
}) => {
  
  useEffect(() => {
    if (logInQueryStatus === "success") {
      setLogIn(false);
    } else {
      setLogIn(true);
    }
  });

  switch (logInQueryStatus) {
    case "pending":
      return <Loader />;
    case "error":
      return (
        <AuthForm modalActive={modalActive} setModalActive={setModalActive} />
      );
    case "success":
      return null;
    default:
      return null;
  }
};
