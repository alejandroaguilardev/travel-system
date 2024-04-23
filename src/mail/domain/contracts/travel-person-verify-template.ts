export default `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Pet Travel Contrato acompañante {{client}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="center" valign="top">
                            <a href="https://travel-system-client.vercel.app/" target="_blank" style="display: inline-block">
                                <img src="https://pettravelperu.com/storage/3oI8cZmcGuWB969fhdFOoH4ysCIVEKZejFTpTSka.png"
                                    alt="Pet Travel Logo" border="0"
                                    style="display: block; width: 150px; max-width: 150px" />
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #002060;">
                            <h1 style="font-size: 18px;">
                                <p style="margin-top: 20px;">Por favor, verifique información de la persona que
                                    acompañará a {{pet.name}} durante el viaje ()(si es por cargo serán los datos de la
                                    persona responsable de los documentos).
                                </p>
                            </h1>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 0 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; ">

                            <p style="margin-top: 20px;">En caso de que los datos no sean correctos, le pedimos que se
                                comunique con su asesor para corregir la información.</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <p style="text-align: center;font-weight: bold;">Lugar de destino</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px;padding: 0 50px 0;">
                    <tr>
                        <td style="width: 50%;">País destino:</td>
                        <td style="width: 50%;">{{destination.countryDestination}}</td>
                    </tr>
                    <tr>
                        <td>Ciudad destino:</td>
                        <td>{{destination.cityDestination}}</td>
                    </tr>
                    <tr>
                        <td>Dirección destino:</td>
                        <td>{{destination.directionDestination}}</td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <p style="text-align: center;font-weight: bold;">Datos del responsable del viaje</p>
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px;padding: 0 50px 0;">
                    <tr>
                        <td style="width: 50%;">Documento:</td>
                        <td style="width: 50%;">{{accompaniedPet.document}} N° {{accompaniedPet.documentNumber}}</td>
                    </tr>
                    <tr>
                        <td>Nombre:</td>
                        <td>{{accompaniedPet.name}}</td>
                    </tr>
                    <tr>
                        <td>Teléfono:</td>
                        <td>{{accompaniedPet.phone}}</td>
                    </tr>
                    <tr>
                        <td>Correo:</td>
                        <td>{{accompaniedPet.email}}</td>
                    </tr>
                    <tr>
                        <td>Departamento:</td>
                        <td>{{accompaniedPet.department}}</td>
                    </tr>
                    <tr>
                        <td>Provincia:</td>
                        <td>{{accompaniedPet.province}}</td>
                    </tr>
                    <tr>
                        <td>Distrito:</td>
                        <td>{{accompaniedPet.district}}</td>
                    </tr>
                    <tr>
                        <td>Dirección:</td>
                        <td>{{accompaniedPet.direction}}</td>
                    </tr>
                </table>
            </td>
        </tr>
        {{charge}}
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%"
                    style="max-width: 600px;padding: 0 50px 0;">
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <div style="background-color:#CBF2FF; padding:10px; font-size: 14px;">
                                <p>
                                    Por favor, manténgase informado y realice un seguimiento constante en la plataforma,
                                    o comuníquese regularmente con su asesor para obtener información actualizada.
                                </p>
                                <div align="center" style="margin-top: 20px;">
                                    <a href="https://wa.me/{{phone}}?text=Buen%20día,%20necesito%20información%20sobre%20mi%20contrato%20N°%20{{client}}"
                                        rel="noopener noreferrer" target="_blank"
                                        style="display: inline-block; padding: 10px 40px; background-color: #4cb440; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; transition: background-color 0.3s;margin: auto;">
                                        <div>Consultar con el asesor</div>
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#ffffff"
                            style="padding: 20px 40px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px;">
                            <hr />
                            <p>Ha recibido este correo electrónico porque se necesita indicar que persona viajará junto
                                a la mascota</p>
                            <p style="margin-top: 20px;">
                                No olvides visitarnos en nuestra página de
                                <a href="https://www.facebook.com/pettravelperuviajeconmascotas" target="_blank"
                                    rel="noreferrer noopener">
                                    Facebook
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

    </table>
</body>

</html>`;
