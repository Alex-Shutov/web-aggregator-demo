import { PROJECT_STATUSES } from '@components/Project/projects.types';

export const statusTypes = {
  DRAFT:PROJECT_STATUSES.DRAFT,
  CHECK:PROJECT_STATUSES.CHECK,
  APPROVED:PROJECT_STATUSES.APPROVED,
  DECLINED:PROJECT_STATUSES.DECLINED,
}
export const statusTypesRu = {
  DRAFT:'Черновик',
  CHECK:'На проверке',
  APPROVED:'Подтвержден',
  DECLINED:'Отклонен',
}


export const colorStatusTypes = {
  draft:{status:statusTypesRu.DRAFT,class:'text-txt_ind_third'},
  check:{status:statusTypesRu.CHECK,class:'text-txt_ind_secondary'},
  approved:{status:statusTypesRu.APPROVED,class:'text-txt_ind_main'},
  declined:{status:statusTypesRu.DECLINED,class:'text-txt_ind_info'},
}