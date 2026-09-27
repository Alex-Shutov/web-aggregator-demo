import React from 'react';


interface PublicationNoticeProps {
  children: React.ReactNode;
  className:string
}

const PublicationNotice: React.FC<PublicationNoticeProps> = ({ children,className }) => {
  return (
    <div className={"mb-14 text-xl   text-txt_ind_main" + className}>
      {children}
    </div>
  );
};

export default PublicationNotice;