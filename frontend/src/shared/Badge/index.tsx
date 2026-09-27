import firstPlace from '@public/icons/place_flag/place_1.svg'
import secondPlace from '@public/icons/place_flag/place_2.svg'
import thirdPlace from '@public/icons/place_flag/place_3.svg'
import defaultPlace from '@public/icons/place_flag/place_default.svg'
import RatingBadge from '@shared/Badge/RatingBadge';



const StatusBadge: React.FC<{ number: number, boldText?: string, defaultText: string,urlImage:string,className?:string }> = ({
                                                                                       number,
                                                                                       boldText,
                                                                                       defaultText,
                                                                                                       className,
  urlImage
                                                                                     }) => {

  return (
    <>
      <RatingBadge urlImage={urlImage} number={number}/>
      <div className={`bg-pnl_secondary flex flex-row max-w-72 rounded p-6 pl-8 border-pnl_secondary border-2 ${className}`}>
        <span><b>{boldText}</b>{defaultText}</span>
      </div>
    </>
  );
};

export default StatusBadge;