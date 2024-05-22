export default `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bienvenido a Pet Travel Perú</title>
  <style>
    body {
      font-family: 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(to right, #74ebd5, #ACB6E5);
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      color: #333;
    }
    .container {
      text-align: center;
      background: rgba(255, 255, 255, 0.9);
      padding: 40px;
      border-radius: 12px;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
      max-width: 600px;
    }
    h1 {
      color: #2c3e50;
      margin-bottom: 10px;
      font-size: 2em;
    }
    p {
      font-size: 1em;
      line-height: 1.8;
      margin: 0 0 10px;
    }
    .logo {
      height: 80px;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      font-size: 1em;
      color: #fff;
      background-color: #3498db;
      border: none;
      border-radius: 5px;
      text-decoration: none;
      transition: background-color 0.3s ease;
    }
    .button:hover {
      background-color: #2980b9;
    }
  </style>
</head>
<body>
  <div class="container">
    <img src="https://pettravelperu.com/storage/3oI8cZmcGuWB969fhdFOoH4ysCIVEKZejFTpTSka.png" alt="Pet Travel Perú" class="logo">
    <h1>Bienvenido a Pet Travel Perú</h1>
    <p>En <strong>Pet Travel Perú</strong>, somos un equipo de profesionales y veterinarios dedicados a tu tranquilidad y satisfacción. Desde 2008, hemos ayudado a movilizar a más de diez mil mascotas en todo el mundo, a destinos como Estados Unidos, Unión Europea, Asia, África y toda América Latina.</p>
    <p>Gracias por confiar en nosotros para el cuidado y transporte de tus seres queridos. ¡Tu tranquilidad es nuestra prioridad!</p>
    <a href="/api" class="button">Ver Documentación API</a>
  </div>
</body>
</html>


    `;
