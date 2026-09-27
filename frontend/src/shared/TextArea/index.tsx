//@ts-nocheck
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import useAutosizeTextArea from '@shared/TextArea/useAutosizeTextArea';

const TextArea = (props) => {
    const textAreaRef = useRef(  null);

    useAutosizeTextArea( textAreaRef,props.value,props.offset)
    return (
      <>
         <textarea
           value={props.value} ref={textAreaRef} rows={1} {...props}
           className={`placeholder-[#bababb] block w-full resize-none  p-4 font-light text-lg bg-pnl_fourth border border-pnl_secondary rounded-md placeholder-pnl_secondary text-white placeholder-rgba-white-color ${props.className}`}

         />
        {props?.maxLength && <div className={'flex justify-end mt-2 text-txt_secondary'}>{props.value.length}/{props.maxLength}</div>}
      </>

      //
    );
}

export default TextArea;