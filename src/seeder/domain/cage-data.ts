import { CreateCageRequest } from '../../cages/application/create';
import { UUID } from '../../common/application/services/uuid';

export const getCageData = (uuid: UUID): CreateCageRequest[] => [
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML45',
    dimensionsCage: '43*27*33',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML50',
    dimensionsCage: '50*33*33',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML55',
    dimensionsCage: '56*33*37',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML60',
    dimensionsCage: '60*40*40',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML70',
    dimensionsCage: '67*47*51',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML80',
    dimensionsCage: '81*56*59',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML90',
    dimensionsCage: '90*60*69',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML100',
    dimensionsCage: '100*67*75',
    user: '',
  },
  {
    id: uuid.generate(),
    typeCage: 'rígida',
    modelCage: 'ML120',
    dimensionsCage: '120*79*89',
    user: '',
  },
];
