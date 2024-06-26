import { Uuid } from '../../../common/domain/value-object/uuid';
import { DateService } from '../../../common/application/services/date-service';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { IPdfService } from '../../../common/application/services/pdf-service';
import { ErrorNotFound } from '../../../common/domain/errors';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { PetGenderType } from 'src/pets/domain/value-object/pet-gender';

export class AdendasPdf {

    private readonly FILENAME = 'adendas';
    private readonly GENDER = {
        male: {
            en: {
                "si": "Neutered Male",
                "no": "Male",
            },
            es: {
                "si": "Hembra Castrada",
                "no": "Hembra"
            }
        },
        female: {
            en: {
                "si": "Spayed Female",
                "no": "Female",
            },
            es: {
                "si": "Hembra Castrada",
                "no": "Hembra"
            }
        }
    }

    private readonly SPECIE = {
        "canino": "Canis familiaris",
        "felino": "Felis catus",

    }

    constructor(
        private readonly contractRepository: ContractRepository,
        private readonly dateService: DateService,
        private readonly pdfService: IPdfService<any>,
    ) { }


    async execute(contractId: Uuid, detailId: Uuid, file: File, lang: string) {
        const contract = await this.contractRepository.searchByIdWithPet(contractId);
        const contractDetail = contract?.details?.filter(_ => _.id === detailId.value);

        if (!contract || contractDetail?.length === 0) {
            throw new ErrorNotFound("No se encontró el identificador del contrato");
        }
        if (!["en", "es"].includes(lang)) throw new ErrorNotFound("No se indico el idioma de la adendas");

        const { editedPdfBytes, client } = await this.setArchive(contractDetail[0], file, lang);
        return {
            editedPdfBytes,
            name: `${this.FILENAME}-${client.toLowerCase()}.pdf`
        };
    }


    async setArchive(contractDetail: ContractDetailResponse, file: File, lang: string) {
        const pdfBytes = await this.pdfService.load(file);
        const form = pdfBytes.getForm();
        const fields = form.getFields();
        // fields.forEach((field) => { console.log(field.getName()); });
        const client = this.formFill(contractDetail, form, lang);
        const editedPdfBytes = await pdfBytes.save();
        return { editedPdfBytes, client };
    }

    private formFill(contractDetail: ContractDetailResponse, form: any, lang: string) {
        const client = contractDetail?.travel.accompaniedPet?.name ?? "";

        form.getTextField('4').setText(client);
        form.getTextField('5').setText(contractDetail?.travel.accompaniedPet?.direction ?? "");
        form.getTextField('6').setText(contractDetail?.travel.accompaniedPet?.district ?? "");
        form.getTextField('7').setText(contractDetail?.travel.accompaniedPet?.phone ?? "");

        this.specie(form, contractDetail?.pet?.type ?? "");
        this.gender(form, lang, contractDetail?.pet?.gender ?? "", contractDetail?.pet?.sterilized);
        form.getTextField('28a').setText(contractDetail?.pet?.color ?? "");
        form.getTextField('38a').setText(contractDetail?.pet?.race ?? "");
        form.getTextField('48a').setText(contractDetail?.pet?.chip ?? "");
        form.getTextField('49a').setText(this.dateService.formatDateTime(
            contractDetail?.pet?.birthDate,
            'dd/MM/yyyy',
        ) ?? "");
        return client;
    }

    private specie(form: any, type?: string) {
        const field = form.getDropdown('Dropdown6.0.0');
        try {
            field.select(this.SPECIE[type?.toLowerCase()])
        } catch (error) {
            field.select(field.getOptions()[0]);
        }
    }

    private gender(form: any, lang: string, gender?: string, sterilized?: string) {
        const field = form.getDropdown('Dropdown4.0');
        try {
            field.select(this.GENDER[gender][lang][sterilized?.toLowerCase()])

        } catch (error) {
            field.select(field.getOptions()[0]);
        }
    }



}



// 1
// 2
// 3
// I3 Autoridad central competente
// 4
// 5
// 6
// 7
// 13
// I20 Cantidad
// Check Box6
// Dropdown6.0.0
// Dropdown6.0.1
// Dropdown6.0.2
// Dropdown6.0.3
// Dropdown6.0.4
// Dropdown4.0
// Dropdown4.1
// Dropdown4.2
// Dropdown4.3
// Dropdown4.4
// 28a
// 38a
// Dropdown3a
// 49a
// 28b
// 38b
// Dropdown3b
// 49b
// 28c
// 38c
// Dropdown3c
// 49c
// 28d
// 38d
// Dropdown3d
// 49d
// 28e
// 38e
// Dropdown3e
// 49e
// 48a
// DateImpl
// Nombre y fabricante de la vacunaRow1
// NumLot
// DateStart
// DateStart1
// DateStart2
// DateDue
// Fecha de toma de la muestra de sangre ddmmaaaaRow1
// 48b
// DateImpl1
// Nombre y fabricante de la vacunaRow2
// NumLot1
// DateDue1
// Fecha de toma de la muestra de sangre ddmmaaaaRow2
// 48c
// DateImpl2
// Nombre y fabricante de la vacunaRow3
// NumLot2
// DateDue2
// Fecha de toma de la muestra de sangre ddmmaaaaRow3
// 48d
// DateImpl3
// DateStart3
// Nombre y fabricante de la vacunaRow4
// NumLot3
// DateDue3
// Fecha de toma de la muestra de sangre ddmmaaaaRow4
// 48e
// DateImpl4
// DateStart4
// Nombre y fabricante de la vacunaRow5
// NumLot4
// DateDue4
// Fecha de toma de la muestra de sangre ddmmaaaaRow5
// Nombre y fabricante del producto1
// DateTrat
// Nombre y Apellido Veterinario1
// Nombre y fabricante del producto2
// DateTrat1
// Nombre y Apellido Veterinario2
// Nombre y fabricante del producto3
// DateTrat2
// Nombre y Apellido Veterinario3
// Nombre y fabricante del producto4
// DateTrat3
// Nombre y Apellido Veterinario4
// Nombre y fabricante del producto5
// DateTrat4
// Nombre y Apellido Veterinario5
// Napellido1.0.0
// 59
// 55
// 58
// 56
// Fecha
// Combo Box2
// I2 Número de referencia del certificado
// I2 Competent authority