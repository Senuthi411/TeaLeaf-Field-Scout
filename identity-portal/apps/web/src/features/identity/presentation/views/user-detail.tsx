import { TableSearch, TableSelect } from "../TableControls";
export default function Screen(){return (
    <div className="bg-[#f4f7f3] relative size-full" data-node-id="15:459" data-name="WEB / Identity / ID-04 / default / 3840x2160">
      <div className="absolute bg-[#12351f] content-stretch flex flex-col gap-[8px] h-[2160px] items-start left-0 overflow-clip px-[28px] py-[36px] top-0 w-[496px]" data-node-id="15:460" data-name="Sidebar">
        <div className="content-stretch flex gap-[20px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-node-id="15:461" data-name="Brand">
          <div className="bg-[#e8f5e0] content-stretch flex items-center justify-center overflow-clip relative rounded-[38px] shrink-0 size-[76px]" data-node-id="15:462" data-name="logo">
            <div className="relative shrink-0 size-[44px]" data-node-id="15:463" data-name="icon/leaf">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/3e977152-efac-483a-9221-b3ba82530951.svg" />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="15:466" data-name="wordmark">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[32px] text-white" data-node-id="15:467">
              TeaLeaf
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#c5e48b] text-[24px]" data-node-id="15:468">
              Field Scout
            </p>
          </div>
        </div>
        <div className="h-[28px] relative shrink-0 w-[100px]" data-node-id="15:469" data-name="gap"></div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="15:470">
          MENU
        </p>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:471" data-name="Nav / Dashboard">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:472" data-name="icon/home">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/ecd17ffc-5b87-46d5-b57f-3c83c10b0038.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:475">
            Dashboard
          </p>
        </a>
        <a className="bg-[#2a5c38] content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:476" data-name="Nav / Users">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:477" data-name="icon/users">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/7cf3140d-85f0-46ac-bed9-6eaa93db7305.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-left text-white whitespace-nowrap" data-node-id="15:482">
            Users
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:483" data-name="Nav / Roles & Permissions">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:484" data-name="icon/shield">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/0ffdb8df-bac9-4af4-974c-940e7699f149.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:486">Roles & Permissions</p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:487" data-name="Nav / Estates">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:488" data-name="icon/map">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/0472d325-9c6c-4be3-bfd2-3cb5b558bc6d.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:491">
            Estates
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:492" data-name="Nav / Divisions">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:493" data-name="icon/layers">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/46694126-19f8-42dc-8b4b-fa6ae99ef20e.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:496">
            Divisions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:497" data-name="Nav / Device Sessions">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:498" data-name="icon/phone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/517ac5e2-6036-4e41-a431-dfd8bbdd1032.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:501">
            Device Sessions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="15:502" data-name="Nav / My Profile">
          <div className="relative shrink-0 size-[36px]" data-node-id="15:503" data-name="icon/user">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/7a78236d-0f2b-4fea-b136-8361924b100e.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="15:506">
            My Profile
          </p>
        </a>
        <div className="flex-[1_0_0] min-h-px relative w-[100px]" data-node-id="15:507" data-name="spacer"></div>
        <div className="bg-[#1b4a2b] content-stretch flex gap-[20px] items-center overflow-clip p-[20px] relative rounded-[20px] shrink-0 w-full" data-node-id="15:508" data-name="User card">
          <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[34px] shrink-0 size-[68px]" data-node-id="15:509" data-name="Avatar">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[25.84px] whitespace-nowrap" data-node-id="15:510">
              AP
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:511" data-name="u">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[25px] text-white" data-node-id="15:512">
              Anika Perera
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#a9c4b0] text-[23px]" data-node-id="15:513">
              Administrator
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="15:514">
          Demonstration data · UI design only
        </p>
      </div>
      <div className="absolute content-stretch flex flex-col h-[2160px] items-start left-[496px] overflow-clip top-0 w-[3344px]" data-node-id="15:515" data-name="Main">
        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[36px] h-[144px] items-center overflow-clip px-[64px] relative shrink-0 w-full" data-node-id="15:516" data-name="Top bar">
          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0" data-node-id="15:517" data-name="Breadcrumbs">
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="15:518">
              <p className="leading-[normal]">Administration</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="15:519" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/27442196-9381-4009-9344-8dcc59a9a44e.svg" />
            </div>
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="15:521">
              <p className="leading-[normal]">Users</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="15:522" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/27442196-9381-4009-9344-8dcc59a9a44e.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="15:524">
              Hiruni Nadeesha
            </p>
          </div>
          <div className="flex-[1_0_0] h-[100px] min-w-px relative" data-node-id="15:525" data-name="spacer"></div>
          <a className="bg-white border-2 border-[#c5cec8] border-solid content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip pl-[26px] pr-[30px] py-[16px] relative rounded-[32px] shrink-0" data-node-id="71:189" data-name="Button / secondary / Switch Demo Role">
            <div className="relative shrink-0 size-[30px]" data-node-id="71:190" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/075482ea-8a83-435e-b95a-9ba6219d2261.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[26px] text-left whitespace-nowrap" data-node-id="71:192">
              <p className="leading-[normal]">Switch Demo Role</p>
            </div>
          </a>
          <div className="bg-[#f1f5f1] content-stretch cursor-pointer flex gap-[16px] h-[80px] items-center overflow-clip px-[28px] relative rounded-[40px] shrink-0 w-[680px]" data-node-id="15:526" data-name="Search">
            <div className="relative shrink-0 size-[34px]" data-node-id="15:527" role="button" tabIndex={0} data-name="icon/search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e2ad15d9-7578-48d5-a3ae-1c662f48322b.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#6b7a72] text-[26px] text-left whitespace-nowrap" data-node-id="15:530" role="button" tabIndex={0}>
              <p className="leading-[normal]">Search observations, cases, users</p>
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.01)] inset-0" data-node-id="60:820" role="button" tabIndex={0} data-name="Search hit area"></div>
          </div>
          <div className="bg-[#fff1d6] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:531" data-name="Badge / Demo data">
            <div className="relative shrink-0 size-[12px]" data-node-id="15:532" data-name="dot">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/fea84785-5b71-43dd-aefa-1009da92b4b6.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7a4f00] text-[23px] whitespace-nowrap" data-node-id="15:533">
              Demo data
            </p>
          </div>
          <button className="bg-[#f1f5f1] content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="15:534" data-name="bell">
            <div className="relative shrink-0 size-[38px]" data-node-id="15:535" data-name="icon/bell">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/9945efa1-14f6-4cf7-9086-998448e04275.svg" />
            </div>
          </button>
          <a className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="15:538" data-name="Profile menu trigger">
            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[36px] shrink-0 size-[72px]" data-node-id="15:539" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27.36px] text-left whitespace-nowrap" data-node-id="15:540">
                AP
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-left whitespace-nowrap" data-node-id="15:541" data-name="p">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[26px]" data-node-id="15:542">
                Anika Perera
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[23px]" data-node-id="15:543">
                Administrator
              </p>
            </div>
            <div className="relative shrink-0 size-[32px]" data-node-id="15:544" data-name="icon/down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/7a4616dd-11d1-4680-a6f7-237ddce04d8c.svg" />
            </div>
          </a>
        </div>
        <div className="bg-[#f4f7f3] content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-px overflow-clip px-[64px] py-[52px] relative w-full" data-node-id="15:546" data-name="Content">
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="15:547" data-name="Page header">
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0" data-node-id="15:548" data-name="titles">
              <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0" data-node-id="15:549" data-name="Back">
                <div className="overflow-clip relative shrink-0 size-[32px]" data-node-id="15:550" data-name="icon/left">
                  <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="15:551" data-name="Vector">
                    <div className="absolute inset-[-8.33%_-16.67%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/5a125caf-97a5-43f1-b36b-dda01794aee1.svg" />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[26px] text-left whitespace-nowrap" data-node-id="15:552">
                  <p className="leading-[normal]">Back to users</p>
                </div>
              </a>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[52px] whitespace-nowrap" data-node-id="15:553">
                Hiruni Nadeesha
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] whitespace-nowrap" data-node-id="15:554">
                USR-009 · Field worker · hiruni.nadeesha@example.test
              </p>
            </div>
            <div className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="15:555" data-name="Actions">
              <a className="bg-white border-2 border-[#e5a9a4] border-solid content-stretch flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="15:556" data-name="Button / dangerO / Revoke sessions">
                <div className="relative shrink-0 size-[32px]" data-node-id="15:557" data-name="icon/lock">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/84bb4d17-5e01-433f-82e7-a2014f1d3b3c.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#b3261e] text-[26px] text-left whitespace-nowrap" data-node-id="15:560">
                  Revoke sessions
                </p>
              </a>
              <a className="bg-[#2e7d32] content-stretch flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="15:561" data-name="Button / primary / Edit user">
                <div className="relative shrink-0 size-[32px]" data-node-id="15:562" data-name="icon/edit">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/3e415de1-9d3e-4feb-b328-7b6c867fc9d9.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[26px] text-left text-white whitespace-nowrap" data-node-id="15:565">
                  Edit user
                </p>
              </a>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-start min-h-px overflow-clip relative w-full" data-node-id="15:566" data-name="Details row">
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col gap-[32px] h-full items-center overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-[720px]" data-node-id="15:567" data-name="Card / body">
              <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[88px] shrink-0 size-[176px]" data-node-id="15:568" data-name="Avatar">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[66.88px] whitespace-nowrap" data-node-id="15:569">
                  HN
                </p>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[40px] whitespace-nowrap" data-node-id="15:570">
                Hiruni Nadeesha
              </p>
              <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:571" data-name="Badge / Field worker">
                <div className="relative shrink-0 size-[12px]" data-node-id="15:572" data-name="dot">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="15:573">
                  Field worker
                </p>
              </div>
              <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:574" data-name="Badge / Active">
                <div className="relative shrink-0 size-[12px]" data-node-id="15:575" data-name="dot">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="15:576">
                  Active
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="15:577" data-name="Details grid">
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="15:578" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:579" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:580">
                      User ID
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:581">
                      USR-009
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="15:582" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:583" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:584">
                      Email
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:585">
                      hiruni.nadeesha@example.test
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="15:586" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:587" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:588">
                      Estate
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:589">
                      Riverbend Tea Estate
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="15:590" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:591" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:592">
                      Mobile sync
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:593">
                      Separate from review status
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="15:594" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:595" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:596">
                      Created
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:597">
                      2026-09-14 (demo)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[40px] h-full items-start min-w-px overflow-clip relative" data-node-id="15:598" data-name="Right">
              <div className="border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[56px] items-start overflow-clip relative shrink-0 w-full" data-node-id="15:599" data-name="Tabs">
                <div className="border-[#2e7d32] border-b-6 border-solid content-stretch flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="15:600" data-name="Tab / Overview">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[28px] whitespace-nowrap" data-node-id="15:601">
                    Overview
                  </p>
                </div>
                <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="15:602" data-name="Tab / Scope assignments">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="15:603">
                    Scope assignments
                  </p>
                </a>
                <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="15:604" data-name="Tab / Device sessions">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="15:605">
                    Device sessions
                  </p>
                </a>
                <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="15:606" data-name="Tab / Activity">
                  <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="15:607">
                    Activity
                  </p>
                </a>
              </div>
              <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col gap-[28px] items-start overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-full" data-node-id="15:608" data-name="Card / Account information">
                <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="15:609" data-name="Card header">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[32px] whitespace-nowrap" data-node-id="15:610">
                    Account information
                  </p>
                </div>
                <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="15:611" data-name="Details grid">
                  <div className="content-stretch flex gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="15:612" data-name="row">
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:613" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:614">
                        Full name
                      </p>
                      <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:615">
                        Hiruni Nadeesha
                      </p>
                    </div>
                    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="15:616" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:617">
                        Role
                      </p>
                      <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:618">
                        Field worker
                      </p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="15:619" data-name="kv">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[24px] whitespace-nowrap" data-node-id="15:620">
                        Status
                      </p>
                      <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:621" data-name="Badge / Active">
                        <div className="relative shrink-0 size-[12px]" data-node-id="15:622" data-name="dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="15:623">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="[word-break:break-word] content-stretch flex gap-[32px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="15:624" data-name="row">
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="15:625" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:626">
                        Primary estate
                      </p>
                      <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:627">
                        EST-002 Riverbend
                      </p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="15:628" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:629">
                        Capture permissions
                      </p>
                      <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:630">
                        Create (scoped), read own, revise own
                      </p>
                    </div>
                    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="15:631" data-name="kv">
                      <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="15:632">
                        Last sign-in
                      </p>
                      <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="15:633">
                        Today · 07:58
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch cursor-pointer flex flex-col gap-[28px] items-start overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-full" data-node-id="15:634" data-name="Card / Scope assignments">
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-left w-full whitespace-nowrap" data-node-id="15:635" data-name="Card header">
                  <p className="relative shrink-0 text-[#1f2a24] text-[32px]" data-node-id="15:636">
                    Scope assignments
                  </p>
                  <p className="relative shrink-0 text-[#2e7d32] text-[26px]" data-node-id="15:637">
                    Manage scopes
                  </p>
                </div>
                <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] shrink-0 w-full" data-node-id="15:638" data-name="Table">
                  <div className="bg-[#f4f8f2] content-stretch flex h-[84px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:639" data-name="Header row">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:640" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:641">
                        DIVISION
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:642" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:643">
                        DIVISION ID
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:644" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:645">
                        ESTATE
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[437.405px]" data-node-id="15:646" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:647">
                        ASSIGNED
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:648" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:649">
                        STATUS
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[92px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:650" data-name="Row 1">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:651" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="15:652">
                        East Hills
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:653" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:654">
                        DIV-005
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:655" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:656">
                        Riverbend Tea Estate
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[437.405px]" data-node-id="15:657" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:658">
                        2026-09-14
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:659" data-name="Cell">
                      <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:660" data-name="Badge / Active">
                        <div className="relative shrink-0 size-[12px]" data-node-id="15:661" data-name="dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="15:662">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[92px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:663" data-name="Row 2">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:664" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="15:665">
                        Riverbank
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:666" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:667">
                        DIV-004
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[624.865px]" data-node-id="15:668" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:669">
                        Riverbend Tea Estate
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[437.405px]" data-node-id="15:670" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:671">
                        2026-09-14
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[312.432px]" data-node-id="15:672" data-name="Cell">
                      <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:673" data-name="Badge / Active">
                        <div className="relative shrink-0 size-[12px]" data-node-id="15:674" data-name="dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="15:675">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
              <a className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch cursor-pointer flex flex-col gap-[28px] items-start overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-full" data-node-id="15:676" data-name="Card / Recent device sessions (illustrative)">
                <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 text-left w-full whitespace-nowrap" data-node-id="15:677" data-name="Card header">
                  <p className="relative shrink-0 text-[#1f2a24] text-[32px]" data-node-id="15:678">
                    Recent device sessions (illustrative)
                  </p>
                  <p className="relative shrink-0 text-[#2e7d32] text-[26px]" data-node-id="15:679">
                    All sessions
                  </p>
                </div>
                <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] shrink-0 w-full" data-node-id="15:680" data-name="Table">
                  <div className="bg-[#f4f8f2] content-stretch flex h-[84px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:681" data-name="Header row">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[522.065px]" data-node-id="15:682" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:683">
                        SESSION
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[745.806px]" data-node-id="15:684" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:685">
                        DEVICE
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[596.645px]" data-node-id="15:686" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:687">
                        LAST SEEN
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[447.484px]" data-node-id="15:688" data-name="Header cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] text-left whitespace-nowrap" data-node-id="15:689">
                        STATUS
                      </p>
                    </div>
                  </div>
                  <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[92px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:690" data-name="Row 1">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[522.065px]" data-node-id="15:691" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="15:692">
                        DS-3091
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[745.806px]" data-node-id="15:693" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:694">
                        Android 14 · Pixel 7
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[596.645px]" data-node-id="15:695" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:696">
                        Today · 07:58
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[447.484px]" data-node-id="15:697" data-name="Cell">
                      <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:698" data-name="Badge / Active">
                        <div className="relative shrink-0 size-[12px]" data-node-id="15:699" data-name="dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/25d1ebbb-cae4-451f-80d2-c226ebfdf3f9.svg" />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="15:700">
                          Active
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[92px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="15:701" data-name="Row 2">
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[522.065px]" data-node-id="15:702" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="15:703">
                        DS-2977
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[745.806px]" data-node-id="15:704" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:705">
                        Android 13 · Galaxy A54
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[596.645px]" data-node-id="15:706" data-name="Cell">
                      <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="15:707">
                        12 Oct · 16:40
                      </p>
                    </div>
                    <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[447.484px]" data-node-id="15:708" data-name="Cell">
                      <div className="bg-[#eef1ef] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="15:709" data-name="Badge / Signed out">
                        <div className="relative shrink-0 size-[12px]" data-node-id="15:710" data-name="dot">
                          <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/0fed0bd1-4109-47d3-84f2-7c93cf6feff7.svg" />
                        </div>
                        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#46554c] text-[23px] text-left whitespace-nowrap" data-node-id="15:711">
                          Signed out
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);}
