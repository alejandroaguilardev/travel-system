import { Uuid } from '../../../common/domain/value-object/uuid';
import { DateService } from '../../../common/application/services/date-service';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { IPdfService } from '../../../common/application/services/pdf-service';
import { ErrorNotFound } from '../../../common/domain/errors';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class RabiesSerologyPdf {

    public readonly FILENAME = 'rabies-serology';

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
        const client = this.formFill(contractDetail, form);
        const editedPdfBytes = await pdfBytes.save();
        return { editedPdfBytes, client };
    }

    private formFill(contractDetail: ContractDetailResponse, form: any) {
        const client = contractDetail?.travel.accompaniedPet?.name ?? "";

        this.chip(contractDetail?.pet?.chip ?? "", form);
        form.getTextField('Owners name').setText(client);
        form.getTextField('owners address').setText(contractDetail?.travel.accompaniedPet?.direction?.padEnd(100, " ") ?? "");
        form.getTextField('Owners postcode').setText(contractDetail?.travel.accompaniedPet?.district ?? "");
        form.getTextField('animals Name').setText(contractDetail?.pet?.name ?? "");

        form.getTextField('animals species').setText(contractDetail?.pet?.type ?? "");
        form.getTextField('animals breed').setText(contractDetail?.pet?.race ?? "");
        form.getTextField('age of animal').setText(this.petAgeEnglish(contractDetail?.pet?.birthDate));
        form.getTextField('sex of animal').setText(contractDetail?.pet?.gender ?? "");
        form.getTextField('date of sampling and microchip reading').setText(this.dateService.formatDateTime(
            contractDetail?.topico?.takingSampleSerologicalTest?.date,
            'MM/dd/yyyy',
        ) ?? "");
        form.getTextField('date of last rabies vaccination').setText(this.dateService.formatDateTime(
            contractDetail?.topico?.rabiesReVaccination?.date,
            'MM/dd/yyyy',
        ) ?? "");
        form.getTextField('date of travel').setText(this.dateService.formatDateTime(
            contractDetail?.travel?.airlineReservation?.departureDate,
            'MM/dd/yyyy',
        ) ?? "");
        form.getTextField('destination country').setText(contractDetail?.travel?.destination?.countryDestination ?? "");
        return client;
    }


    private chip(chip: string, form: any) {
        let count = 0;

        for (let index = 1; index <= 5; index++) {
            const length = (index * 3)
            const value = chip?.substring(count, length);
            form.getTextField(`Microchip ${index}`).setText(value);
            count = index * 3;
        }
    }

    private petAgeEnglish(birthDate: Date) {
        const value = this.dateService.formatDifferenceInYearsAndMonths(birthDate);
        return this.dateStringToEnglish(value);
    }

    private dateStringToEnglish(value: string): string {
        return value
            .replace('años', 'years')
            .replace('año', 'year')
            .replace('meses', 'months')
            .replace('mes', 'month');
    }
}