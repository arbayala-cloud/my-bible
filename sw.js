const V='91f93cc21f';const CORE='mhb-core-'+V,DATA='mhb-data-'+V,FONTS='mhb-fonts';
// rename v27
const PRE=['./','./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png','./icons/favicon-32.png','./definitions.json','./xrefs.json','./fonts/opendyslexic-latin-400-normal.woff2','./fonts/opendyslexic-latin-700-normal.woff2','./fonts/opendyslexic-latin-400-italic.woff2'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CORE).then(c=>c.addAll(PRE)))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('mhb-')&&k!==CORE&&k!==DATA&&k!==FONTS).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',e=>{if(e.data==='skip')self.skipWaiting()});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(r.mode==='navigate'||(u.origin===location.origin&&/\/(index\.html)?$/.test(u.pathname))){
  e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(CORE).then(c=>c.put('./index.html',cp))}return res}).catch(()=>caches.match('./index.html',{ignoreSearch:true}).then(m=>m||caches.match('./',{ignoreSearch:true}))));return}
 if(u.origin===location.origin){e.respondWith(caches.match(r,{ignoreSearch:true}).then(m=>m||fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(DATA).then(c=>c.put(r,cp))}return res})));return}
 if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'){e.respondWith(caches.open(FONTS).then(c=>c.match(r).then(m=>{const n=fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}).catch(()=>m);return m||n})));return}
});
