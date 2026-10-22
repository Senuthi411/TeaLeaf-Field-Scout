const fs = require('node:fs');
(async()=>{
 const tabs=await fetch('http://localhost:9222/json').then(r=>r.json());const tab=tabs.find(t=>t.type==='page'&&t.url.includes('localhost'))||tabs.find(t=>t.type==='page');
 const ws=new WebSocket(tab.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener('open',r));let next=0;const pending=new Map();const failures=[];
 ws.addEventListener('message',e=>{const d=JSON.parse(e.data);if(d.id){pending.get(d.id)?.(d);pending.delete(d.id);}if(d.method==='Runtime.exceptionThrown')failures.push(d.params.exceptionDetails.text);});
 const send=(method,params={})=>new Promise(resolve=>{const id=++next;pending.set(id,resolve);ws.send(JSON.stringify({id,method,params}));});
 const evaluate=async expression=>{const d=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(d.result.exceptionDetails)throw Error(JSON.stringify(d.result.exceptionDetails));return d.result.result.value;};
 const pause=()=>new Promise(r=>setTimeout(r,500));
 const check=async(name,expression)=>{if(!await evaluate(expression))throw Error('FAILED: '+name);console.log('PASS '+name);};
 await send('Runtime.enable');await send('Page.navigate',{url:'http://localhost:5174/login'});await pause();await pause();
 await evaluate(`sessionStorage.removeItem('tealeaf.demo-session');localStorage.removeItem('tealeaf.remembered-username');location.href='/admin/users'`);await pause();
 await check('protected route redirects to login',`location.pathname==='/login'&&!!document.querySelector('#username')`);
 await send('Emulation.setDeviceMetricsOverride',{width:1440,height:900,deviceScaleFactor:1,mobile:false});await pause();
 fs.mkdirSync('verification',{recursive:true});let shot=await send('Page.captureScreenshot',{format:'png'});fs.writeFileSync('verification/login-desktop.png',Buffer.from(shot.result.data,'base64'));
 await evaluate(`document.querySelector('.login-card form').requestSubmit()`);await pause();await check('required field messages',`document.querySelectorAll('.field-error').length===2`);
 await evaluate(`(()=>{const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;for(const [id,value] of [['username','admin@tealeaf.test'],['password','wrong-password']]){let e=document.getElementById(id);set.call(e,value);e.dispatchEvent(new Event('input',{bubbles:true}));}})()`);await pause();
 await evaluate(`document.querySelector('.login-card form').requestSubmit()`);await pause();await pause();await check('invalid credentials stay on login',`location.pathname==='/login'&&!!document.querySelector('.login-error')`);
 await evaluate(`document.querySelector('.password-toggle').click()`);await pause();await check('password visibility toggles',`document.querySelector('#password').type==='text'`);
 await evaluate(`document.querySelector('.login-demo details').open=true;document.querySelector('.login-demo button').click()`);await pause();await evaluate(`document.querySelector('.login-card form').requestSubmit()`);await pause();await pause();await check('login restores intended users route',`location.pathname==='/admin/users'&&document.body.textContent.includes('User Management')`);
 await check('all current assets load',`[...document.images].every(i=>i.complete&&i.naturalWidth>0)`);
 await evaluate(`(()=>{let input=document.querySelector('.table-search');const set=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set;set.call(input,'no-matching-user-xyz');input.dispatchEvent(new Event('input',{bubbles:true}));})()`);await pause();await check('React table search filters results',`[...document.querySelectorAll('[data-name^="Row "]')].every(row=>row.hidden)`);
 for(const path of ['/admin','/admin/users','/admin/users/detail','/admin/users/new','/admin/users/edit','/admin/roles','/admin/scopes','/admin/estates','/admin/estates/detail','/admin/divisions','/admin/divisions/detail','/admin/devices','/profile']){await send('Page.navigate',{url:'http://localhost:5174'+path});await pause();await check('React screen '+path,`!!document.querySelector('[data-name="Main"]')&&[...document.images].every(i=>i.complete&&i.naturalWidth>0)`);}
 await send('Page.navigate',{url:'http://localhost:5174/profile'});await pause();await evaluate(`document.querySelector('[data-name="Button / secondary / Sign out"]').click()`);await pause();await evaluate(`document.querySelector('.portal-modal button[type="submit"]').click()`);await pause();await check('sign out clears demo session',`location.pathname==='/login'&&!sessionStorage.getItem('tealeaf.demo-session')`);
 await send('Page.navigate',{url:'http://localhost:5174/admin'});await pause();await check('signed-out dashboard is guarded',`location.pathname==='/login'&&!document.querySelector('[data-name="Sidebar"]')`);
 await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});await pause();shot=await send('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});fs.writeFileSync('verification/login-mobile.png',Buffer.from(shot.result.data,'base64'));
 await check('mobile has no horizontal overflow',`document.documentElement.scrollWidth<=innerWidth`);await check('login assets load',`[...document.images].every(i=>i.complete&&i.naturalWidth>0)`);
 console.log('Browser exceptions:',failures.length);if(failures.length)throw Error(failures.join('\n'));ws.close();
})().catch(e=>{console.error(e);process.exitCode=1;process.exit();});
