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

/* Dedicated Meta Pixel tracking for the Salalah landing page only. */
(function(){
  const PIXEL_ID='2025667841413835';
  if(!/^\/Tours\/salalah(?:\/(?:index\.html)?)?$/i.test(window.location.pathname))return;

  const canonical=document.querySelector('link[rel="canonical"]');
  if(canonical)canonical.href='https://skymundo.ae/Tours/salalah/';

  const state=window.__skymundoSalalahTracking||(window.__skymundoSalalahTracking={
    forms:new WeakSet(),sent:new Map()
  });
  const DUPLICATE_WINDOW=30*60*1000;
  const STORAGE_KEY='skymundo-salalah-leads-v1';

  function loadPixel(){
    if(typeof window.fbq!=='function'){
      !function(f,b,e,v,n,t,s){
        if(f.fbq)return;
        n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;
        n.push=n;n.loaded=true;n.version='2.0';n.queue=[];
        t=b.createElement(e);t.async=true;t.src=v;
        s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
      }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    }
    if(!window.__skymundoSalalahPixelInit){
      window.fbq('init',PIXEL_ID);
      window.__skymundoSalalahPixelInit=true;
      window.fbq('trackSingle',PIXEL_ID,'PageView');
    }
    return window.fbq;
  }

  /* Synchronous SHA-256 keeps Lead dispatch ahead of the mobile WhatsApp handoff. */
  function fingerprint(text){
    const bytes=new TextEncoder().encode(text);
    const data=new Uint8Array(Math.ceil((bytes.length+9)/64)*64);
    data.set(bytes);data[bytes.length]=128;
    const view=new DataView(data.buffer);
    view.setUint32(data.length-8,Math.floor(bytes.length/0x20000000));
    view.setUint32(data.length-4,(bytes.length*8)>>>0);
    const k=[0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
      0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
      0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
      0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
      0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
      0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
      0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
      0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    const h=[0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    const w=new Uint32Array(64),rotate=(x,n)=>(x>>>n)|(x<<(32-n));
    for(let offset=0;offset<data.length;offset+=64){
      for(let i=0;i<16;i++)w[i]=view.getUint32(offset+i*4);
      for(let i=16;i<64;i++){
        const x=w[i-15],y=w[i-2];
        w[i]=(w[i-16]+(rotate(x,7)^rotate(x,18)^(x>>>3))+w[i-7]+(rotate(y,17)^rotate(y,19)^(y>>>10)))>>>0;
      }
      let [a,b,c,d,e,f,g,z]=h;
      for(let i=0;i<64;i++){
        const t1=(z+(rotate(e,6)^rotate(e,11)^rotate(e,25))+((e&f)^(~e&g))+k[i]+w[i])>>>0;
        const t2=((rotate(a,2)^rotate(a,13)^rotate(a,22))+((a&b)^(a&c)^(b&c)))>>>0;
        z=g;g=f;f=e;e=(d+t1)>>>0;d=c;c=b;b=a;a=(t1+t2)>>>0;
      }
      [a,b,c,d,e,f,g,z].forEach((value,i)=>{h[i]=(h[i]+value)>>>0;});
    }
    return h.map(value=>value.toString(16).padStart(8,'0')).join('');
  }

  function trackLead(snapshot){
    let key=snapshot;
    let persistent=false;
    try{
      key=fingerprint(snapshot);
      persistent=true;
    }catch(error){/* In-memory deduplication still works if text encoding is unavailable. */}

    const now=Date.now();
    let saved=[];
    if(persistent){
      try{
        const parsed=JSON.parse(window.sessionStorage.getItem(STORAGE_KEY)||'[]');
        if(Array.isArray(parsed))saved=parsed.filter(item=>item&&typeof item.key==='string'&&
          Number.isFinite(item.at)&&now-item.at>=0&&now-item.at<DUPLICATE_WINDOW);
      }catch(error){/* Storage restrictions must not prevent a valid enquiry. */}
    }
    for(const [previous,at] of state.sent){
      if(now-at>=DUPLICATE_WINDOW)state.sent.delete(previous);
    }
    if(state.sent.has(key)||saved.some(item=>item.key===key))return;

    const eventID='salalah-'+(window.crypto&&window.crypto.randomUUID?
      window.crypto.randomUUID():now.toString(36)+'-'+Math.random().toString(36).slice(2));
    loadPixel()('trackSingle',PIXEL_ID,'Lead',{
      content_name:'Salalah WhatsApp Enquiry',
      content_category:'Travel'
    },{eventID:eventID});
    state.sent.set(key,now);
    if(persistent){
      /* Store only a digest and timestamp, never the customer's form fields. */
      saved.push({key:key,at:now});
      try{window.sessionStorage.setItem(STORAGE_KEY,JSON.stringify(saved.slice(-50)));}catch(error){}
    }
  }

  loadPixel();

  /* Every Salalah WhatsApp CTA now feeds the tracked booking form first. */
  function routeDirectWhatsAppToForm(){
    const booking=document.getElementById('booking');
    const form=document.getElementById('bookingForm');
    if(!booking||!form)return;
    document.querySelectorAll('a[href*="wa.me/971562168857"]').forEach(link=>{
      if(link.dataset.salalahFormRoute==='1')return;
      link.dataset.salalahFormRoute='1';
      link.href='#booking';
      link.removeAttribute('target');
      link.addEventListener('click',function(event){
        event.preventDefault();
        booking.scrollIntoView({behavior:'smooth',block:'start'});
        const first=document.getElementById('fullName');
        window.setTimeout(()=>{
          if(!first)return;
          try{first.focus({preventScroll:true});}catch(error){first.focus();}
        },350);
      });
    });
  }

  function bindTracking(){
    const form=document.getElementById('bookingForm');
    if(!form||state.forms.has(form))return;
    state.forms.add(form);
    form.addEventListener('submit',function(){
      if(!form.checkValidity())return;
      /* Inputs use IDs rather than names, so FormData would miss their values. */
      const fields=['fullName','phone','nationality','adults','children','travelDate','pickup','payment','notes'];
      const snapshot=JSON.stringify(fields.map(id=>{
        const input=document.getElementById(id);
        return input?input.value.trim():'';
      }));
      /* Dispatch before the existing handler opens WhatsApp; retries remain usable. */
      try{trackLead(snapshot);}catch(error){/* Tracking must not block WhatsApp. */}
    },true);
    routeDirectWhatsAppToForm();
  }

  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',bindTracking,{once:true});
  }else{
    bindTracking();
  }
})();
