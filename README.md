# RocketDeliveryExpo
By Sebastien Doyon

## How to run
Note: You need tu run the backend first. See the README.md file in the backend folder for instructions.

1. Install dependencies:
-Open the terminal and go to the project folder
-Run `npm install`

2. Set up the url redirect variable:
-Open the file `NgrokUrl.js` in the folder `src/Components/`
-Replace the value of the variable `url` with your ngrok url
### If you don't have ngrok installed, follow the instructions below
1- Download ngrok from https://ngrok.com/download
2- Unzip the file
3- Open the terminal and go to the folder where you unzipped ngrok
4- Run `./ngrok http 3000`
5- Copy the url that appears in the terminal and paste it in the `NgrokUrl.js` file

3. Run the project:
-Open the terminal and go to the project folder
-Run `npm start`

# TRAVAIL DE RECHERCHE

## La différence entre une application mobile native et une application mobile multiplateforme.
- Une application mobile native est une application qui est développée pour une plateforme spécifique. Par exemple, une application mobile native pour Android est développée pour Android et une application mobile native pour iOS est développée pour iOS. Une application mobile native est développée en utilisant les langages de programmation et les outils spécifiques à la plateforme. Par exemple, une application mobile native pour Android est développée en utilisant le langage de programmation Java et les outils Android SDK. Une application mobile native pour iOS est développée en utilisant le langage de programmation Swift et les outils iOS SDK.
- Une application mobile multiplateforme est une application qui est développée pour plusieurs plateformes. Par exemple, une application mobile multiplateforme peut être développée pour Android, iOS, Windows Phone, etc. Une application mobile multiplateforme est développée en utilisant des langages de programmation et des outils communs à toutes les plateformes. Par exemple, une application mobile multiplateforme peut être développée en utilisant le langage de programmation JavaScript et les outils Cordova, PhoneGap, Ionic, etc.
- React Native est un framework open source développé par Facebook. Il permet de développer des applications mobiles multiplateformes en utilisant le langage de programmation JavaScript. React Native utilise le moteur de rendu de React pour afficher les interfaces utilisateur. React Native utilise également les composants natifs de chaque plateforme pour afficher les interfaces utilisateur. Par exemple, React Native utilise les composants natifs de chaque plateforme pour afficher les boutons, les listes, les formulaires, etc. React Native utilise également les composants natifs de chaque plateforme pour afficher les interfaces utilisateur. Par exemple, React Native utilise les composants natifs de chaque plateforme pour afficher les boutons, les listes, les formulaires, etc.

## La différence entre React Native et React.
React est une bibliothèque JavaScript pour créer des interfaces utilisateur d'applications Web en utilisant le DOM. React Native, basé sur React, permet de développer des applications mobiles natives pour iOS et Android en utilisant des composants natifs au lieu du DOM. Les deux partagent des concepts similaires comme les composants et l'état, mais React Native se concentre sur les applications mobiles natives.

## Mes constattions personelles.
L'application de style dans React Native est très différente de celle dans React. Dans React, on utilise le CSS pour styliser les composants. Dans React Native, on utilise des objets JavaScript pour styliser les composants. Par exemple, pour styliser un composant View dans React Native, on utilise un objet JavaScript.
L'application est souvent plus compliqué car on doit gérer les composants natifs. Aussi la structure de l'application elle même se gère moins bien qu'en React.js. Par exemple, pour naviguer entre les pages, on utilise un objet JavaScript qui contient les différentes pages. Cet objet est passé en paramètre à un composant qui s'occupe de la navigation. C'est ce composant qui gère la navigation entre les pages. C'est un peu plus compliqué que de simplement utiliser des liens comme en React.js. Aussi, pour le déboguage, les erreure de React.js sont beaucoup plus précises et descriptives. Dans React Native, les erreurs sont souvent très vagues et ne donnent pas beaucoup d'informations sur l'erreur puisque l'application utilise des composants isolés (englober) et l'erreure ne parvient pas a sortir de ce composant. La moindre erreure sur un composant peut faire planter l'application entière. En résumé, je trouve très intéressante l'expérience React Native, mais je préfère de loin la structure et l'application de React.js.








 
