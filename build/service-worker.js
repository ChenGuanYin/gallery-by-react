"use strict";var precacheConfig=[["/index.html","f9c5528c71cb4b95d02b649d2898a3eb"],["/static/css/main.2d7b190b.css","6d574a1598873eb493716392cad0eeb0"],["/static/js/main.2b946ea3.js","d1fb60541d8ebc84d06cf0e7fb5a029b"],["/static/media/1.bd63d005.jpg","bd63d00550899d17d96eab0e523e191a"],["/static/media/10.d751435c.jpg","d751435c79f8947a09d2247b694c9f38"],["/static/media/11.75105300.jpg","751053009988ada921063b9c976a0231"],["/static/media/12.851d6074.jpg","851d60748c878027e7a52c42c441b138"],["/static/media/13.4f0b2bbd.jpg","4f0b2bbd13d80bb56db798dffb9bf438"],["/static/media/14.707f3ac5.jpg","707f3ac5e9fc103169b34fe0b01f59d3"],["/static/media/15.a3b5eb2f.jpg","a3b5eb2fd4be679210afd738fcf8edb8"],["/static/media/16.ffa5badd.jpg","ffa5badd054f465bf879543954816c29"],["/static/media/2.6fd1361a.jpg","6fd1361a03f7cf3438b3aab6bc409c7e"],["/static/media/3.c88397ea.jpg","c88397eabc61b0cd856c63dba9af15f6"],["/static/media/4.ace3d5b7.jpg","ace3d5b785f01689d46740d26b55d68a"],["/static/media/5.cdb00628.jpg","cdb0062838530082085a0dd3e2f0b1d1"],["/static/media/6.1555904a.jpg","1555904a3ed0f25d93fafb91d409d99e"],["/static/media/7.ed3b6061.jpg","ed3b6061163c390a6c6a9aea559e6d06"],["/static/media/8.be1a90b6.jpg","be1a90b6fc3184f6a923cb3720b92ec4"],["/static/media/9.120c52ed.jpg","120c52ed00e61c10a538b35b498020e4"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,t){var a=new URL(e);return"/"===a.pathname.slice(-1)&&(a.pathname+=t),a.toString()},cleanResponse=function(e){if(!e.redirected)return Promise.resolve(e);return("body"in e?Promise.resolve(e.body):e.blob()).then(function(t){return new Response(t,{headers:e.headers,status:e.status,statusText:e.statusText})})},createCacheKey=function(e,t,a,n){var r=new URL(e);return n&&r.pathname.match(n)||(r.search+=(r.search?"&":"")+encodeURIComponent(t)+"="+encodeURIComponent(a)),r.toString()},isPathWhitelisted=function(e,t){if(0===e.length)return!0;var a=new URL(t).pathname;return e.some(function(e){return a.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return t.every(function(t){return!t.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var t=e[0],a=e[1],n=new URL(t,self.location),r=createCacheKey(n,hashParamName,a,/\.\w{8}\./);return[n.toString(),r]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var n=new Request(a,{credentials:"same-origin"});return fetch(n).then(function(t){if(!t.ok)throw new Error("Request for "+a+" returned a response with status "+t.status);return cleanResponse(t).then(function(t){return e.put(a,t)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(a){return Promise.all(a.map(function(a){if(!t.has(a.url))return e.delete(a)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var t,a=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching),n="index.html";(t=urlsToCacheKeys.has(a))||(a=addDirectoryIndex(a,n),t=urlsToCacheKeys.has(a));var r="/index.html";!t&&"navigate"===e.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],e.request.url)&&(a=new URL(r,self.location).toString(),t=urlsToCacheKeys.has(a)),t&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(a)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(t){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,t),fetch(e.request)}))}});