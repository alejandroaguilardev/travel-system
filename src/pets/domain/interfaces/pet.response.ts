import { PetInterface } from './pet.interface';

export interface PetResponse extends PetInterface { }

export interface PetsClientResponse {
    id: string,
    name: string,
    chip: string,
}
