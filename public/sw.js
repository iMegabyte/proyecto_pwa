/* Este archivo debe estar colocado en la carpeta raíz del sitio.
 + cWualquier cambio en el contenido de este archivo hace que el service worker
 * se reinstale. Normalmente se cambia el número en el nombre del caché cuando
 * cambia el contenido de los archivos. */
const CACHE = "directoriorh-1.1";
// Archivos requeridos para que la aplicación funcione fuera de línea.
const ARCHIVOS = [
  "img/icono-256.png",
  "css/acordeon.css",
  "css/estilos.css",
  "css/menu.css",
  "css/tabla.css",
  "js/chatUsusistema.js",
  "js/ini.js",
  "js/mantenimientoPersonal.js",
  "js/validaciones.js",
  "favicon.ico",
  "index.html",
  "inicio.html",
  "ayuda.html",
  "comunicacion.html",
  "mantenimiento.html",
  "manifest.json",
  //"__/js/client/2.2.1/firebase.js",
  "/__/firebase/7.7.0/firebase-app.js",
  "/__/firebase/7.7.0/firebase-firestore.js",
  "/__/firebase/7.7.0/firebase-auth.js",
  "/__/firebase/7.7.0/firebase-storage.js",
  '/'
];
self.addEventListener("install", evt => {
  console.log("Service Worker instalado.");
  // Realiza la instalación: carga los archivos requeridos en la caché.
  // @ts-ignore
  evt.waitUntil(cargaCache());
});
// Toma de la caché archivos solicitados. Los otros son descargados.
self.addEventListener("fetch", evt => {
  // @ts-ignore
  if (evt.request.method === "GET") {
    // @ts-ignore
    evt.respondWith(usaCache(evt));
  }
});
self.addEventListener("activate", () => console.log("Service Worker activo."));

async function cargaCache() {
  console.log("Intentando cargar cache: " + CACHE);
  const cache = await caches.open(CACHE);
  await cache.addAll(ARCHIVOS);
  console.log("Cache cargado: " + CACHE);
}

async function usaCache(evt) {
  const cache = await caches.open(CACHE);
  const response = await cache.match(evt.request, { ignoreSearch: true });
  if (response) {
    return response;
  } else {
    return fetch(evt.request);
  }
}