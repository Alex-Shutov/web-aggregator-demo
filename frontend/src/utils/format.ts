import { format } from 'date-fns';

const formatDate = (date:Date) => {

  return date ?  format(date, 'yyyy-MM-dd HH:mm') : ''
}






const formatUtils = {formatDate}
export default formatUtils