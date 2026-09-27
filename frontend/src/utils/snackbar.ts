import {enqueueSnackbar} from "notistack";

export const handleSubmit = (text:string) => {
  enqueueSnackbar(text,{variant:'success'})
}
export const handleError = (text:string) => {
  enqueueSnackbar(text,{variant:'error'})
}
export const handleInfo = (text:string) => {
  enqueueSnackbar(text,{variant:'info'})
}