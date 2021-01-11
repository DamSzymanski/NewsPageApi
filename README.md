# NewsPageApi

Backend dla aplikacji NewsPage, stworzony za pomocą Express. Celem powstania projektu jest rozwinięcie umiejętności z zakresu programowania w NodeJS oraz wykorzystania bazy danych MongoDB. 
W NewsPage znajduje się panel administracyjny służący do moderacji newsów. Dla zabezpieczenia routów panelu wykorzystano Firebase authentication, który weryfikuje token dla klienta zarejestrowanego w pliku konfiguracyjnym serviceWorker.json, pobranym z Firebase. Projekt obsługuje typowe zapytania CRUD dla MongoDB. Dla większego realizmu system imituje sekcję komentarzy użytkowników za pomocą Fakera. 

Dekodowanie tokena obsługuje tokenService.

Domyślny url aplikacji do `http://localhost:9000`

NewsPageApi jest częścią projektu, którego częścią frontendową jest [NewsPageReact](https://github.com/DamSzymanski/NewsPageReact)

## Uruchumienie

1. Otwórz folder projektu i użyj komendy: `npm install`
2. Użyj własnego pliku serviceWorker.json, który pobrać można z Firebase Console
3. W tokenService.js ustaw url do swojej bazy Firebase, oraz w zmiennej url w server.js ustawić connection string do swojej bazy MongoDB.
4. Uruchom server poprzez: `npm run dev`

## Technologie
* NodeJS
* Firebase
* Express
* MongoDB

## Contact
darreur@gmail.com


