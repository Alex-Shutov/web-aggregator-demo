import React, { useEffect, useState } from 'react';
import useSignUpCredentials from '@components/Auth/components/Register/hooks/useSignUpCredentials';
import Basic from '@components/Auth/components/Register/Basic';
import Contacts from '@components/Auth/components/Register/Contacts';

const Register = () => {
  const [step, setStep] = useState(1);
  const {credentials,resetCredentials,changeCredentials} = useSignUpCredentials()

  useEffect(() => {
    return ()=>resetCredentials()
  }, []);

  return (
    <>
      <div className="flex justify-center gap-12 mb-12">
        <button
          className={`relative font-bold w-12 h-12 rounded-full text-xl flex items-center justify-center ${step >= 1 ? "bg-bt_secondary text-txt_main" : "bg-pnl_add_second_border text-txt_secondary"}`}
          onClick={() => setStep(1)}
        >
          1
          {step >= 2 && (
            <span className="absolute top-1/2 right-14 w-8 h-0.5 bg-bt_secondary" />
          )}
        </button>
        <button
          className={`relative font-bold w-12 h-12 rounded-full text-xl flex items-center justify-center ${step >= 2 ? "bg-bt_secondary text-txt_main" : "bg-pnl_add_second_border text-txt_secondary"}`}
        >
          2
        </button>
      </div>
      {step === 1
        ? <Basic changeCredentials={changeCredentials} credentials={credentials}  setStep={setStep} />
        : <Contacts changeCredentials={changeCredentials} credentials={credentials} />}
    </>
  );
};

export default Register;