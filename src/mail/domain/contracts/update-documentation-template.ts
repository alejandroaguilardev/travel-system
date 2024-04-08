export default `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Pet Travel Documentación Actualizada de {{pet.name}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center" >
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="center" valign="top">
                            <a href="https://www.app.pettravelperu.com/" target="_blank" style="display: inline-block">
                                <img src="https://pettravelperu.com/storage/3oI8cZmcGuWB969fhdFOoH4ysCIVEKZejFTpTSka.png" alt="Pet Travel Logo" border="0" style="display: block; width: 150px; max-width: 150px" />
                            </a>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center" >
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                            <h1  style="font-size: 22px;">
                                La documentación del contrato N° {{number_contract}} de {{pet.name}} ha sido actualizado, revise su estado!
                            </h1>
                    
                            <p  style="margin-top: 20px;"> Su contrato ha sido actualizado con éxito!  para mas información ingrese a la plataforma.</p>
                            <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                <thead>
                                    <th>Documentación</th>
                                    <th>Parte del Servicio</th>
                                    <th>Fecha</th>
                                    <th>Estado</th> 
                                <thead>
                                <tbody>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Certificado de chip</td>
                                        <td >{{chipCertificate.hasServiceIncluded}}</td>
                                        <td>{{chipCertificate.date}}</td>
                                        <td><span style="background-color:chipCertificate_color;padding: 5px ;">{{chipCertificate.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Certificado de vacuna</td>
                                        <td>{{vaccinationCertificate.hasServiceIncluded}}</td>
                                        <td>{{vaccinationCertificate.date}}</td>
                                        <td><span style="background-color:vaccinationCertificate_color;padding: 5px ;">{{vaccinationCertificate.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Test serológico de rabia</td>
                                        <td>{{rabiesSeroLogicalTest.hasServiceIncluded}}</td>
                                        <td>{{rabiesSeroLogicalTest.date}}</td>
                                        <td><span style="background-color:rabiesSeroLogicalTest_color;padding: 5px ;">{{rabiesSeroLogicalTest.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Revisión de lectura de chip</td>
                                        <td>{{chipReview.hasServiceIncluded}}</td>
                                        <td>{{chipReview.date}}</td>
                                        <td><span style="background-color:chipReview_color;padding: 5px ;">{{chipReview.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Permiso de importación</td>
                                        <td>{{importLicense.hasServiceIncluded}}</td>
                                        <td>{{importLicense.date}}</td>
                                        <td><span style="background-color:importLicense_color;padding: 5px ;">{{importLicense.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Certificado de salud</td>
                                        <td>{{healthCertificate.hasServiceIncluded}}</td>
                                        <td>{{healthCertificate.date}}</td>
                                        <td><span style="background-color:healthCertificate_color;padding: 5px ;">{{healthCertificate.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Documentos de SENASA</td>
                                        <td>{{senasaDocuments.hasServiceIncluded}}</td>
                                        <td>{{senasaDocuments.date}}</td>
                                        <td><span style="background-color:senasaDocuments_color;padding: 5px ;">{{senasaDocuments.isApplied}}</span></td> 
                                    </tr>
                                    <tr style="text-align: center;">
                                        <td style="padding:10px 0">Certificado de soporte emocional</td>
                                        <td>{{emotionalSupportCertificate.hasServiceIncluded}}</td>
                                        <td>{{emotionalSupportCertificate.date}}</td>
                                        <td><span style="background-color:emotionalSupportCertificate_color;padding: 5px ;">{{emotionalSupportCertificate.isApplied}}</span></td> 
                                    </tr>
                                </tbody>
                            </table>
                            <p align="center" style="margin-top: 20px;">
                                <a href="https://www.app.pettravelperu.com/" target="_blank" rel="noopener noreferrer" style="display: inline-block; padding: 10px 30px; background-color: #1a82e2; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; transition: background-color 0.3s;">
                                    Ingresar a la Plataforma
                                </a>
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="left" bgcolor="#ffffff" style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <div style="background-color:#CBF2FF; padding:10px; font-size: 14px;">
                                <p>
                                    Por favor, manténgase informado y realice un seguimiento constante en la plataforma, o comuníquese regularmente con su asesor para obtener información actualizada.
                                </p>
                                <div align="center" style="margin-top: 20px;">
                                    <a href="https://wa.me/{{phone}}?text=Buen%20día,%20necesito%20información%20sobre%20mi%20contrato%20N°%20{{number_contract}}"  rel="noopener noreferrer" target="_blank" style="display: inline-block; padding: 10px 40px; background-color: #4cb440; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; transition: background-color 0.3s;margin: auto;">
                                        <div>Consultar con el asesor</div>
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#ffffff" style="padding: 20px 40px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px;">
                            <hr />
                            <p>Ha recibido este correo electrónico porque recientemente ha sido actualizado si contrato en la plataforma de viajes para mascotas.</p>
                            <p style="margin-top: 20px;">
                                No olvides visitarnos en nuestra página de
                                <a href="https://www.facebook.com/pettravelperuviajeconmascotas" target="_blank" rel="noreferrer noopener">
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
