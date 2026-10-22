import { useEffect, useRef, useState, type MouseEvent, type KeyboardEvent, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../application/AuthProvider';
import { identityRoutes, type ScreenKey } from '../routes.manifest';
import { screenViews } from './screens';
import { TableContext } from './TableControls';

interface LocalRecord { name: string; email?: string; role?: string; scope?: string; }
interface DemoData { users: LocalRecord[]; estates: LocalRecord[]; divisions: LocalRecord[]; profile: Record<string,string>; preferences: Record<string,boolean>; }
const initialData: DemoData = { users: [], estates: [], divisions: [], profile: {}, preferences: {} };
const readData = (): DemoData => { try { return {...initialData,...JSON.parse(localStorage.getItem('tealeaf.react-demo') || '{}')}; } catch { return initialData; } };
const nodeText = (element: Element | null | undefined) => element?.textContent?.trim().replace(/\s+/g,' ') || '';
interface ModalState { title: string; body: string; confirm?: string; action?: () => void; kind?: 'estate' | 'division'; }
const navRoutes: Record<string,ScreenKey> = {'Dashboard':'dashboard','Users':'users','Roles & Permissions':'roles','Estates':'estates','Divisions':'divisions','Device Sessions':'sessions','My Profile':'profile'};

export function PortalPage({ screen }: { screen: ScreenKey }) {
  const View = screenViews[screen];
  const root = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<Record<string,string>>({});
  const [data, setData] = useState<DemoData>(readData);
  const [modal, setModal] = useState<ModalState | null>(null);
  const [revoked, setRevoked] = useState<string[]>([]);
  const selected = (location.state as { selected?: LocalRecord } | null)?.selected;
  const goto = (key: ScreenKey, selectedRecord?: LocalRecord) => { const route=identityRoutes.find(r=>r.key===key); if(route)navigate(route.path,{state:selectedRecord?{selected:selectedRecord}:undefined}); };
  const notify = (message: string) => setToast(message);
  useEffect(()=>{localStorage.setItem('tealeaf.react-demo',JSON.stringify(data));},[data]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(''),3500);return()=>clearTimeout(timer);},[toast]);
  useEffect(()=>{document.body.classList.toggle('collapsed',collapsed);document.body.classList.toggle('menu-open',menuOpen);return()=>{document.body.classList.remove('collapsed','menu-open');};},[collapsed,menuOpen]);
  useEffect(()=>{
    setQuery('');setFilters({});setMenuOpen(false);window.scrollTo(0,0);
    document.title=(identityRoutes.find(r=>r.key===screen)?.label || 'Administration')+' | TeaLeaf';
    root.current?.querySelectorAll<HTMLElement>('[data-name^="Nav / "]').forEach(el=>{const key=navRoutes[el.dataset.name?.slice(6)||''];const route=identityRoutes.find(r=>r.key===key);if(route)el.setAttribute('href',route.path);el.setAttribute('aria-current',key===screen?'page':'false');});
    root.current?.querySelectorAll<HTMLElement>('a:not([href]),[data-name="Sidebar collapse toggle"],[data-name="User card"],[data-name^="Tab /"]').forEach(el=>{el.tabIndex=0;el.setAttribute('role','button');});
    root.current?.querySelectorAll<HTMLElement>('[data-name="Search"] p').forEach(el=>{el.textContent='Search users, estates, divisions';});
    if(selected && (screen==='user-detail'||screen==='estate-detail'||screen==='division-detail')){const title=root.current?.querySelector('[data-name="Page header"] [data-name="titles"]>p');if(title)title.textContent=selected.name;}
    if(screen==='edit-user'&&selected){root.current?.querySelectorAll<HTMLInputElement|HTMLSelectElement>('[name]').forEach(el=>{if(el.name==='Hiruni Nadeesha'||el.name==='Full name')el.value=selected.name;if(el.name==='Email'&&selected.email)el.value=selected.email;if(el.name==='Role'&&selected.role)el.value=selected.role;});}
    if(screen==='profile')root.current?.querySelectorAll<HTMLInputElement>('[name]').forEach(el=>{if(data.profile[el.name]&&!/password/i.test(el.name))el.value=data.profile[el.name];});
  },[screen,selected]);
  useEffect(()=>{root.current?.querySelectorAll<HTMLElement>('[data-name^="Row "]').forEach(row=>{const content=nodeText(row).toLowerCase();row.hidden=!content.includes(query.toLowerCase())||Object.values(filters).some(v=>v&&!content.includes(v.toLowerCase()));});},[screen,query,filters]);

  function exportCSV() {
    const rows=[...root.current!.querySelectorAll<HTMLElement>('[data-name="Header row"],[data-name^="Row "]')].filter(r=>!r.hidden);
    const csv=rows.map(row=>[...row.children].map(cell=>'"'+nodeText(cell).replace(/"/g,'""')+'"').join(',')).join('\r\n')||'Metric,Value\r\nActive users,13\r\nEstates,3\r\nDivisions,9\r\nActive sessions,11';
    const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8;'}));const link=document.createElement('a');link.href=url;link.download=`tealeaf-${screen}.csv`;link.click();URL.revokeObjectURL(url);notify('CSV exported');
  }
  function saveUser() {
    const fields=[...root.current!.querySelectorAll<HTMLInputElement|HTMLSelectElement>('[data-name^="Field /"] input,[data-name^="Field /"] select')];
    if(fields.some(field=>!field.reportValidity()))return;
    const values=Object.fromEntries(fields.map(f=>[f.name,f.value]));
    const record: LocalRecord={name:values['Full name']||values['Hiruni Nadeesha'],email:values.Email,role:values.Role};
    if(!record.name)return notify('Enter a full name');
    setData(old=>({...old,users:[...old.users.filter(u=>screen==='edit-user'?u.name!==selected?.name:true),record]}));goto('users');notify(screen==='edit-user'?'User saved locally':'User created locally');
  }
  function click(event: MouseEvent<HTMLDivElement>) {
    const target=event.target as HTMLElement;
    if(target.closest('input,select,textarea'))return;
    const nav=target.closest<HTMLElement>('[data-name^="Nav / "]');if(nav){event.preventDefault();const key=navRoutes[nav.dataset.name!.slice(6)];if(key)goto(key);return;}
    const collapse=target.closest('[data-name="Sidebar collapse toggle"]');if(collapse){event.preventDefault();setCollapsed(v=>!v);return;}
    if(target.closest('[data-name="Profile menu trigger"],[data-name="User card"]')){event.preventDefault();goto('profile');return;}
    if(target.closest('[data-name="bell"]')){setModal({title:'Notifications',body:'You’re up to date. There are no new administrative alerts.'});return;}
    const globalSearch=target.closest('[data-name="Top bar"] [data-name="Search"]');if(globalSearch){goto('users');return;}
    const button=target.closest<HTMLElement>('[data-name^="Button / "]');
    if(button){event.preventDefault();const action=button.dataset.name!.split(' / ').pop()!;
      if(action.startsWith('Export'))return exportCSV();
      if(action==='Create user')return screen==='create-user'?saveUser():goto('create-user');
      if(action==='Edit user')return goto('edit-user',selected);
      if(action==='Save changes')return saveUser();
      if(action==='Cancel')return goto('users');
      if(action==='Sign out'){setModal({title:'Sign out?',body:'You will return to the login page. Your local demonstration records will be kept.',confirm:'Sign out',action:()=>{auth.signOut();navigate('/login',{replace:true});}});return;}
      if(action==='Reset filters'){setFilters({});setQuery('');return;}
      if(action==='Refresh'){notify('Demo device sessions refreshed');return;}
      if(action==='Save assignment'){notify('Demo scope assignment saved');return;}
      if(action==='Reset'){notify('Scope selection reset');return;}
      if(action==='Switch Demo Role'){setModal({title:'Administrator portal',body:'You are signed in as Anika Perera, Administrator. This implementation includes the administration modules.'});return;}
      if(action==='Update password'){const fields=[...root.current!.querySelectorAll<HTMLInputElement>('input[type="password"]')];if(fields.some(f=>!f.value))return notify('Complete all password fields');if(fields[1]?.value.length<12)return notify('Use at least 12 characters');if(fields[1]?.value!==fields[2]?.value)return notify('Passwords do not match');notify('Validation passed. Password changes require the Identity API.');return;}
      if(action==='Revoke sessions'||action==='Start recovery'){setModal({title:action,body:'This is a frontend demonstration. Confirm to record the action locally.',confirm:'Confirm',action:()=>notify('Demo action recorded')});return;}
      if(/(?:Add|Edit) (estate|division)/.test(action)){setModal({title:action,body:'Save a demonstration record in this browser.',kind:action.includes('estate')?'estate':'division'});return;}
    }
    const anchor=target.closest('a,button');const label=nodeText(anchor||target);
    if(label==='View all users'||label==='Back to users'){event.preventDefault();goto('users');return;}
    if(label==='View estates'||label==='Back to estates'){event.preventDefault();goto('estates');return;}
    if(label==='Back to divisions'){event.preventDefault();goto('divisions');return;}
    const tab=target.closest<HTMLElement>('[data-name^="Tab / "]');if(tab){event.preventDefault();const name=tab.dataset.name!.slice(6);if(name==='Scope assignments')return goto('scope');if(name==='Device sessions')return goto('sessions');if(name==='Divisions')return goto('divisions');if(name==='Overview')return;setModal({title:name,body:name==='Team'?'Riverbend Tea Estate team: Malini Fernando (Supervisor), Ishara Kumari (Field worker).':'Recent administrative activity is available on the dashboard.'});return;}
    const row=target.closest<HTMLElement>('[data-name^="Row "]');if(row){const cells=[...row.children];if(screen==='users'||screen==='dashboard'){const record={name:nodeText(cells[0]?.lastElementChild),email:screen==='users'?nodeText(cells[3]):'',role:nodeText(cells[screen==='users'?2:1])};goto('user-detail',record);return;}if(screen==='estates'||screen==='divisions'){goto(screen==='estates'?'estate-detail':'division-detail',{name:nodeText(cells[1])});return;}if(screen==='sessions'&&/revoke/i.test(label)){setModal({title:'Revoke session?',body:'Mark this demo session as revoked in this browser.',confirm:'Revoke',action:()=>{setRevoked(v=>[...v,nodeText(row)]);notify('Demo session revoked');}});}}
  }
  function keyboard(event: KeyboardEvent<HTMLDivElement>) {if((event.key==='Enter'||event.key===' ')&&(event.target as HTMLElement).matches('a:not([href]),[role="button"]')){event.preventDefault();(event.target as HTMLElement).click();}}
  function modalSubmit(event: FormEvent<HTMLFormElement>){event.preventDefault();const values=new FormData(event.currentTarget);if(modal?.kind){const kind=modal.kind==='estate'?'estates':'divisions';setData(old=>({...old,[kind]:[...old[kind],{name:String(values.get('name')),scope:String(values.get('scope'))}]}));goto(modal.kind==='estate'?'estates':'divisions');notify('Record saved locally');}else modal?.action?.();setModal(null);}
  const localRows=screen==='users'?data.users:screen==='estates'?data.estates:screen==='divisions'?data.divisions:[];
  return <>
    <button id="mobile-menu" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={()=>setMenuOpen(v=>!v)}>☰</button>
    <TableContext.Provider value={{query,setQuery,filters,setFilter:(key,value)=>setFilters(old=>({...old,[key]:value}))}}><div ref={root} onClick={click} onKeyDown={keyboard} onChange={event=>{const el=event.target as HTMLInputElement;if(screen==='profile'&&el.name&&!/password/i.test(el.name)){setData(old=>({...old,profile:{...old.profile,[el.name]:el.value}}));notify('Profile saved locally');}}}><View /></div></TableContext.Provider>
    {localRows.length>0&&<section className="react-local-records"><h2>Locally saved {screen}</h2>{localRows.filter(r=>Object.values(r).join(' ').toLowerCase().includes(query.toLowerCase())).map((record,index)=><button key={index} onClick={()=>screen==='users'?goto('user-detail',record):undefined}><span>{record.name}</span><span>{record.email||record.scope}</span><span>{record.role||'Active'}</span></button>)}</section>}
    {revoked.length>0&&<p className="react-local-records">{revoked.length} session(s) marked revoked in this demo.</p>}
    <div id="toast" role="status" aria-live="polite" className={toast?'show':''}>{toast}</div>
    {modal&&<div className="modal-backdrop"><form className="portal-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" onSubmit={modalSubmit} onKeyDown={e=>{if(e.key==='Escape')setModal(null);}}><h2 id="modal-title">{modal.title}</h2><p>{modal.body}</p>{modal.kind&&<><label>Name<input name="name" required /></label><label>{modal.kind==='estate'?'Region':'Estate'}<input name="scope" required /></label></>}<footer><button type="button" autoFocus onClick={()=>setModal(null)}>{modal.confirm||modal.kind?'Cancel':'Close'}</button>{(modal.confirm||modal.kind)&&<button type="submit">{modal.confirm||'Save'}</button>}</footer></form></div>}
  </>;
}
