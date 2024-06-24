import { Uuid } from '../../../common/domain/value-object/uuid';
import { DateService } from '../../../common/application/services/date-service';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { IPdfService } from '../../../common/application/services/pdf-service';
import { ErrorNotFound } from '../../../common/domain/errors';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { PetGenderType } from '../../../pets/domain/value-object/pet-gender';

export class CDCRVMRPdf {

    private readonly FILENAME = 'CDC-RVMR-2023-508';

    constructor(
        private readonly contractRepository: ContractRepository,
        private readonly dateService: DateService,
        private readonly pdfService: IPdfService<any>,
    ) { }


    async execute(contractId: Uuid, detailId: Uuid, file: File) {
        const contract = await this.contractRepository.searchByIdWithPet(contractId);
        const contractDetail = contract?.details?.filter(_ => _.id === detailId.value);

        if (!contract || contractDetail?.length === 0) {
            throw new ErrorNotFound("No se encontró el identificador del contrato");
        }

        const { editedPdfBytes, client } = await this.setArchive(contractDetail[0], file);
        return {
            editedPdfBytes,
            name: `${this.FILENAME}-${client.toLowerCase()}.pdf`
        };
    }


    async setArchive(contractDetail: ContractDetailResponse, file: File) {
        const pdfBytes = await this.pdfService.load(file);
        const form = pdfBytes.getForm();
        // const fields = form.getFields();
        // fields.forEach((field) => { console.log(field.getName()); });
        const client = await this.formFill(contractDetail, form);
        const editedPdfBytes = await pdfBytes.save();
        return { editedPdfBytes, client };
    }

    private async formFill(contractDetail: ContractDetailResponse, form: any) {

        const client = contractDetail?.travel.accompaniedPet?.name ?? "";
        this.gender(form, contractDetail.pet.sterilized, contractDetail?.pet?.gender);
        this.state(form, "");
        // form.getTextField('City').setText(province ?? "");
        // form.getTextField('Street address').setText(contractDetail?.travel.accompaniedPet?.direction ?? "");
        // form.getTextField('Zip Code').setText(contractDetail?.travel.accompaniedPet?.district ?? "");

        form.getTextField('Name of Owner').setText(client);
        form.getTextField('Phone').setText(contractDetail?.travel.accompaniedPet?.phone ?? "");
        form.getTextField('Email').setText(contractDetail?.travel.accompaniedPet?.email ?? "");

        form.getTextField('AnimalName').setText(contractDetail?.pet?.name ?? "");
        form.getTextField('AnimalMicrochipNum').setText(contractDetail?.pet?.chip ?? "");
        form.getTextField('Animal Breed').setText(contractDetail?.pet?.race ?? "");
        form.getTextField('DOB').setText(this.dateService.formatDateTime(
            contractDetail?.pet?.birthDate,
            'MM/dd/yyyy',
        ) ?? "");
        form.getTextField('ColorMarkings').setText(contractDetail?.pet?.color ?? "");


        return client;
    }

    private gender(form: any, sterilized: string, gender?: PetGenderType) {
        const animalGenderField = form.getDropdown('AnimalGender');
        if (gender === "male") {
            return "si" === sterilized?.toLowerCase() ? animalGenderField.select("Male Neutered") : animalGenderField.select("Male Intact");
        }
        if (gender === "female") {
            return "si" === sterilized?.toLowerCase() ? animalGenderField.select("Female Neutered") : animalGenderField.select("Female Intact");
        }
        animalGenderField.select(animalGenderField.getOptions()[0]);
    }

    private state(form: any, state: string) {
        const stateField = form.getDropdown('State 1');
        if (state) {
            return stateField.select(state)
        }
        stateField.select(stateField.getOptions()[0]);
    }
}

