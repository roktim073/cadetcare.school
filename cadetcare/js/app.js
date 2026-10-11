(function(){
var D,lang=localStorage.getItem('lang')||'bn',med=0,day=0,$=function(s){return document.querySelector(s)};
var t=function(o){return o&&typeof o==='object'&&!Array.isArray(o)?o[lang]:o};
var money=function(n){return n==null?'—':'৳'+n.toLocaleString(lang==='bn'?'bn-BD':'en-US')};
var other=function(){return lang==='bn'?'en':'bn'};
fetch('data/site.json').then(function(r){return r.json()}).then(function(j){D=j;render()}).catch(function(){
$('#main').insertAdjacentHTML('afterbegin','<p class="wrap">Could not load data/site.json. If opening the file locally, use a local server (see README).</p>')});

function render(){
 var u=D.ui,s=D.school;
 document.documentElement.lang=lang;
 $('#skip').textContent=t(u.skip);$('#brandName').textContent=t(s.name);
 $('#langBtn').textContent=t(u.toggle);$('#langBtn').setAttribute('aria-label',lang==='bn'?'Switch to English':'বাংলায় দেখুন');
 $('#nav').innerHTML=D.nav.map(function(n){return '<a href="#'+n.id+'">'+n[lang]+'</a>'}).join('');
 $('#heroTag').textContent=t(u.tag);$('#motto').textContent=D.motto[lang];$('#mottoSub').textContent=D.motto[other()];
 $('#applyBtn').textContent=t(u.apply);$('#feesBtn').textContent=t(u.seeFees);
 $('#aboutBox').innerHTML='<h2>'+t(u.about)+'</h2><p>'+t(D.about.text)+'</p><div class="facts">'+
  D.about.facts.map(function(f){return '<div class="fact"><small>'+t(f.k)+'</small><b>'+t(f.v)+'</b></div>'}).join('')+'</div>';
 renderFees();renderRes();
 $('#noticeBox').innerHTML='<h2>'+t(u.notices)+'</h2><ul class="list">'+D.notices.map(function(n){
  var d=new Date(n.d+'T00:00:00').toLocaleDateString(lang==='bn'?'bn-BD':'en-GB',{day:'numeric',month:'short',year:'numeric'});
  return '<li><time datetime="'+n.d+'">'+d+'</time><span>'+t(n.t)+'</span></li>'}).join('')+'</ul>';
 $('#galBox').innerHTML='<h2>'+t(u.gallery)+'</h2><div class="grid">'+D.gallery.map(function(g){
  return '<figure class="slot">'+(g.src?'<img loading="lazy" src="'+g.src+'" alt="'+t(g.alt)+'">':'<figcaption><b>'+t(g.alt)+'</b><br><small>'+t(u.galNote)+'</small></figcaption>')+'</figure>'}).join('')+'</div>';
 var ph=s.phones.map(function(p){return '<a href="tel:'+p.replace(/\s/g,'')+'">'+p+'</a>'}).join(' · ');
 $('#contactBox').innerHTML='<h2>'+t(u.contact)+'</h2><div class="contact"><dl><dt>'+t(u.address)+'</dt><dd>'+t(s.name)+'<br>'+t(s.address)+'</dd>'+
  '<dt>'+t(u.phone)+'</dt><dd>'+ph+'</dd><dt>'+t(u.email)+'</dt><dd><a href="mailto:'+s.email+'">'+s.email+'</a></dd>'+
  '<dt>'+t(u.web)+'</dt><dd><a href="'+s.website+'" rel="noopener">www.cadetcare.edu.bd</a></dd>'+
  '<dt>'+t(u.fb)+'</dt><dd><a href="'+s.facebook+'" target="_blank" rel="noopener">'+t(u.fbText)+'</a></dd></dl>'+
  '<iframe title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="'+s.map+'"></iframe></div>';
 $('#foot').textContent='© '+new Date().getFullYear()+' '+t(s.name)+' · '+t(u.rights);
 document.title=t(s.name)+' | '+(lang==='bn'?'Cadet Care School & College':'ক্যাডেট কেয়ার স্কুল এন্ড কলেজ');
}
function renderFees(){
 var u=D.ui,rows=D.fees.map(function(r){return '<tr><td>'+t(r.c)+'</td><td>'+money(r.tiffin)+'</td><td>'+money(r.adm[med])+'</td><td>'+money(r.tui[med])+'</td><td>'+money(r.ses)+'</td><td>'+money(r.exam)+'</td></tr>'}).join('');
 $('#feesBox').innerHTML='<h2>'+t(u.fees)+'</h2><div class="seg" role="group"><button type="button" data-m="0" aria-pressed="'+(med===0)+'">'+t(u.bnMed)+'</button><button type="button" data-m="1" aria-pressed="'+(med===1)+'">'+t(u.enMed)+'</button></div>'+
  '<div class="scroll"><table><thead><tr>'+u.cols.map(function(c){return '<th scope="col">'+t(c)+'</th>'}).join('')+'</tr></thead><tbody>'+rows+'</tbody></table></div>'+
  '<p class="callout"><b>'+t(u.resFee)+':</b> '+money(D.residentialFee[med])+' ('+t(med?u.enMed:u.bnMed)+')</p>';
}
function renderRes(){
 var u=D.ui,R=D.residential,d=R.days[day];
 $('#resBox').innerHTML='<h2>'+t(u.res)+'</h2><div class="tabs" role="tablist">'+R.days.map(function(x,i){return '<button type="button" role="tab" id="tab'+i+'" aria-selected="'+(i===day)+'" aria-controls="panel" tabindex="'+(i===day?0:-1)+'" data-d="'+i+'">'+t(x.n)+'</button>'}).join('')+'</div>'+
  '<div class="meals" id="panel" role="tabpanel" aria-labelledby="tab'+day+'">'+u.meals.map(function(m){return '<div class="meal"><small>'+t(u.mealNames[m])+'</small>'+t(d[m])+'</div>'}).join('')+'</div>'+
  '<p class="callout note">'+t(R.note)+'</p><p class="muted">'+t(R.demoNote)+'</p>';
}
document.addEventListener('click',function(e){
 var b=e.target.closest('button,#nav a');if(!b)return;
 if(b.id==='langBtn'){lang=other();localStorage.setItem('lang',lang);render()}
 else if(b.dataset.m!==undefined){med=+b.dataset.m;renderFees()}
 else if(b.dataset.d!==undefined){day=+b.dataset.d;renderRes();$('#tab'+day).focus()}
 else if(b.id==='burger'){var o=$('#nav').classList.toggle('open');b.setAttribute('aria-expanded',o)}
 else if(b.closest('#nav')){$('#nav').classList.remove('open');$('#burger').setAttribute('aria-expanded',false)}
});
document.addEventListener('keydown',function(e){
 var tb=e.target.closest&&e.target.closest('[role=tab]');if(!tb)return;
 var n=D.residential.days.length;
 if(e.key==='ArrowRight'){day=(day+1)%n}else if(e.key==='ArrowLeft'){day=(day+n-1)%n}else return;
 e.preventDefault();renderRes();$('#tab'+day).focus();
});
})();
