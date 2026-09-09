/* Real-photo previews remain visible until the responsive image is decoded. */
(function(){
  const pending=new WeakMap();
  window.loadPhoto=function(img){
    if(!img||!img.dataset.photo)return Promise.resolve();
    if(pending.has(img))return pending.get(img);
    const data=window.photoAssets[img.dataset.photo];
    if(!data)return Promise.resolve();
    const task=new Promise(resolve=>{
      const next=new Image(); next.decoding='async'; next.sizes=img.sizes||'100vw';
      next.onload=async()=>{try{await next.decode();}catch(e){} img.srcset=data.srcset;img.src=data.src;delete img.dataset.photo;resolve();};
      next.onerror=()=>{pending.delete(img);resolve();};
      next.srcset=data.srcset;next.src=data.src;
    });pending.set(img,task);return task;
  };
  function start(){
    const photos=document.querySelectorAll('img[data-photo]');
    if('IntersectionObserver' in window){
      const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){loadPhoto(e.target);observer.unobserve(e.target);}}),{rootMargin:'2200px 450px'});
      photos.forEach(img=>{if(!img.classList.contains('hero-slide'))observer.observe(img);});
    }else photos.forEach(loadPhoto);
    const hero=document.querySelectorAll('.hero-slide');if(hero[1])loadPhoto(hero[1]);
    document.querySelectorAll('.hotel-photo img').forEach(img=>img.sizes='(max-width:1000px) 92vw, 640px');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
(function(){
  const clock=document.getElementById('oman-clock'),weather=document.getElementById('salalah-weather');
  if(!clock)return;
  const fmt=new Intl.DateTimeFormat('en-GB',{timeZone:'Asia/Muscat',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:true});
  function tick(){clock.textContent=fmt.format(new Date());clock.dateTime=new Date().toISOString();}tick();setInterval(tick,1000);
  const key='skymundo-salalah-weather-v1';let busy=false;
  function show(data){
    const now=Date.now();
    const points=data.properties.timeseries;
    const point=points.reduce((best,p)=>Math.abs(Date.parse(p.time)-now)<Math.abs(Date.parse(best.time)-now)?p:best,points[0]);
    if(Math.abs(Date.parse(point.time)-now)>7200000)throw Error('stale');
    const temp=point.data.instant.details.air_temperature;
    const raw=(point.data.next_1_hours||point.data.next_6_hours)?.summary.symbol_code||'';
    const descriptions={clearsky:'Clear sky',fair:'Mostly clear',partlycloudy:'Partly cloudy',cloudy:'Cloudy',rain:'Rain',lightrain:'Light rain',heavyrain:'Heavy rain',rainshowers:'Rain showers',lightrainshowers:'Light showers',fog:'Fog'};
    const symbol=raw.replace(/_(day|night|polartwilight)$/,'');
    const label=descriptions[symbol]||'Salalah';
    weather.textContent=Math.round(temp)+'°C · '+label;
  }
  async function refresh(){
    if(busy)return;busy=true;
    try{
      let saved;try{saved=JSON.parse(localStorage.getItem(key));}catch(e){}
      if(saved&&saved.expires>Date.now()){show(saved.data);return;}
      weather.textContent='Checking weather…';
      const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),10000);
      let response;try{response=await fetch('https://api.met.no/weatherapi/locationforecast/2.0/compact?lat=17.0194&lon=54.0897',{signal:controller.signal});}finally{clearTimeout(timer);}
      if(!response.ok)throw Error('unavailable');const data=await response.json();show(data);
      const expires=Date.parse(response.headers.get('Expires'))||Date.now()+3600000;
      try{localStorage.setItem(key,JSON.stringify({data,expires}));}catch(e){}
    }catch(e){weather.textContent=navigator.onLine?'Weather unavailable':'Weather needs internet';}finally{busy=false;}
  }
  refresh();setInterval(()=>{if(!document.hidden)refresh();},3600000);window.addEventListener('online',refresh);
})();
