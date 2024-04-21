export default `
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Pet Travel Toma de muestra {{pet.name}}</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>

<body>
    <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
            <td align="center">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                    <tr>
                        <td align="center" valign="top">
                            <a href="https://www.app.pettravelperu.com/" target="_blank" style="display: inline-block">
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

                            <p style="margin-top: 20px;">Queremos informarle que hemos programado la fecha de la toma de
                                muestra para el test serological de rabia
                                para su mascota. La fecha acordada es: {{date}}.</p>


                            <p style="margin-top: 20px;"> ¡Gracias por su cooperación y esperamos verlos pronto!</p>
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
