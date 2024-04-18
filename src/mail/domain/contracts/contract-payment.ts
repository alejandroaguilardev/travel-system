export default `<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="utf-8" />
    <meta http-equiv="x-ua-compatible" content="ie=edge" />
    <title>Pet Travel Notificación de pago de cuota</title>
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
                            <h1 style="font-size: 22px;text-align: center;">
                                Te recordamos realizar el pago de tu cuota en Pet Travel de acuerdo a lo establecido en
                                el contrato
                            </h1>
                            <p style="margin-top: 20px;">Estimado, {{client}}
                            </p>
                            <p style="margin-top: 20px;">Hemos notado que aún no ha realizado el pago de su cuota.
                                Para evitar inconvenientes, le recomendamos realizar el pago lo antes posible.
                            </p>
                    </tr>
                    <tr>
                        <td align="left" bgcolor="#ffffff"
                            style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px">
                                <tr>
                                    <td align="center" bgcolor="#ffffff" style="font-weight: bold;">Fecha</td>
                                    <td align="center" bgcolor="#ffffff" style="font-weight: bold;">Monto</td>
                                    <td align="center" bgcolor="#ffffff" style="font-weight: bold;">Estado</td>
                                </tr>
                                {{payments}}
                        </td>
                    </tr>
                    <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 20px 50px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif;">
                        El pago puede ser por vía depósito bancario a la cuenta dólares del banco BBVA Continental N° 0011-0366-0200127294 o a la cuenta soles del banco BBVA Continental N° 0011-0366-0200127286.
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

                            <p style="margin-top: 20px;">Recuerda que el pago oportuno de tu cuota garantiza el acceso
                                continuo a nuestra plataforma y servicios.
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
                                    Por favor, mantente al tanto de los pagos pendientes y comunícate con nuestro equipo
                                    de atención al cliente si necesitas ayuda adicional.
                                </p>
                                <div align="center" style="margin-top: 20px;">
                                    <a href="https://wa.me/{{phone}}?text=Buen%20día,%20necesito%20información%20sobre%20mi%20contrato%20N°%20{{client}}"
                                        rel="noopener noreferrer" target="_blank"
                                        style="display: inline-block; padding: 10px 40px; background-color: #4cb440; color: #fff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; transition: background-color 0.3s;margin: auto;">
                                        Consultar con el equipo de atención al cliente
                                    </a>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#ffffff"
                            style="padding: 20px 40px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px;">
                            <hr />
                            <p>Has recibido este correo electrónico porque estás registrado en nuestra plataforma de
                                viajes para mascotas.</p>
                            <p style="margin-top: 20px;">
                                ¡No olvides seguirnos en
                                <a href="https://www.facebook.com/pettravelperuviajeconmascotas" target="_blank"
                                    rel="noreferrer noopener">
                                    Facebook
                                </a> para recibir actualizaciones y consejos útiles!
                            </p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>

    </table>
</body>

</html>`;
