import { Repository } from '../../common/domain/repository';
import { Incident } from './incidents';

export interface ErrorRepository extends Repository<Incident> {}
