# Netflix-Clone app

    - Cree la app Netflix-clone con tailwindcss, instale la dependencia de react-icons. Hice el link de la app al repositorio de github correspondiente y tambien conecté ese repositorio a vercel para ver los cambios en cada push. 
    
    - Comencé con la estructura que iba a tener mi index.tsx y rápidamente me puse a trabajar en el componente Header.tsx

    - A continuación seguí con el Banner.tsx, que muestra de manera dinamica una pelicula al azar de la plataforma de netflix, para hacer esto estoy consumiendo una api (TMDB), para que este bien ordenado hice otro archivo en la carpeta utils para los diferentes requests de dicha API, y las interfaces para los tipados de los datos.

    - Algo similar con los componentes Row, que muestran cada uno una lista de peliculas segun su categoria, también le agregue un boton para que haga un scroll segun su ancho. También instalé unas dependencias para tailwind para estilar la barra de scroll.

    - Instalé firebase y lo incorpore a la app, para poder tener el sistema de login, y poder guardar la info de mi lista de peliculas favoritas.

    - Sumé la pagina de login, y para manejar los datos del formulario instalé la dependecia de react-hook-form, ademas agregue una carpeta hooks, donde voy a agregar mis custome hooks, para incorporar todo el sistema de auth a la app y poder llamar a las funciones correspondientes segun necesidad, si inicio sesión me redirige al home y sino no me deja salir del login, este cuenta con login y signup.

    - Para ver los detalles de cada pelicula seleccionada instale MaterialUI, para utilizar el MODAL que provee, de esta manera agregué la funcionalidad del boton del banner, y del tumbnail, para que cuando apretemos ahi se abra el modal y le pase la info de dicha pelicula a este componente, y así poder mostrar los datos, agregando también un boton para cerrar el modal y una botonera donde se puede mutear el video, sumarlo a mis favoritos y tambien simula darle play/me gusta. Para ver el video instale react-player, popular librería para poder visualizar los videos en react.

    - Configuración del metodo de pago con stripe y firebase, una implementación muy dinámica donde cargamos los planes de pago y luego para poder actualizar el plan al que adherimos. Con el hook useSubscription, utilizamos una logica dentro de nuestro index para que se visualice la pagina de pago si aun no tienes subscripción, y luego el componente account para los datos de la cuenta y actualizaciones o cancelaciones.

    -Menu desplegable para la version mobile con MIU.

    -Logica para agregar o sacar peliculas de mi lista de favoritos. 


# Deploy del proyecto

    - https://netflix-clone-bysantiagorivarola.vercel.app/