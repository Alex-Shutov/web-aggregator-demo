import React, { CSSProperties, useState } from 'react';
import { Link } from 'react-router-dom';
import DropdownOutline from '@public/icons/arrows/dropdown_outline.svg'
import OutsideClickLayout from '@shared/Layouts/OutsideClickLayout';

interface IDropdownOptionProps{
  route:string,
  title:string,
  disable?:boolean
  style?:CSSProperties
  onClick?:()=>void
}
interface IProps {
  header?:React.ReactNode | string
  items:IDropdownOptionProps[]
  after?:React.ReactNode

}

const Index:React.FC<IProps> = ({items,header,after}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = () => {
    setIsOpen(old => !old);
  }

  const transClass = isOpen
    ?
    "flex"
    :
    "hidden";

  return (
    <OutsideClickLayout isOpen={isOpen} toggle={toggle}>
      <div className=" ml-1 relative flex flex-row items-center">
        <div
          className="hover:text-txt_info"
          onClick={toggle}
        >{header ?? <img src={DropdownOutline} alt={'Dropdown'} />}</div>

        <div className={`absolute top-14 z-30 w-[160px]  right-0 flex flex-col py-4 bg-pnl_fourth ${transClass}`}>
          {
            items.map(item =>
              !item.disable && <Link
              style={item?.style}
                key={item.route}
                className="text-txt_main hover:text-txt_info px-8 py-1"
                to={item?.route}
                onClick={()=>{
                  toggle()
                  item?.onClick && item?.onClick()
                }}
              >{item.title}</Link>
            )
          }
        </div>
        {after}
      </div>



    </OutsideClickLayout>
  )
};

export default Index;