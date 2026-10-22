import { TableSearch, TableSelect } from "../TableControls";
export default function Screen(){return (
    <div className="bg-[#f4f7f3] relative size-full" data-node-id="17:364" data-name="WEB / Identity / ID-12 / default / 3840x2160">
      <div className="absolute bg-[#12351f] content-stretch flex flex-col gap-[8px] h-[2160px] items-start left-0 overflow-clip px-[28px] py-[36px] top-0 w-[496px]" data-node-id="17:365" data-name="Sidebar">
        <div className="content-stretch flex gap-[20px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-node-id="17:366" data-name="Brand">
          <div className="bg-[#e8f5e0] content-stretch flex items-center justify-center overflow-clip relative rounded-[38px] shrink-0 size-[76px]" data-node-id="17:367" data-name="logo">
            <div className="relative shrink-0 size-[44px]" data-node-id="17:368" data-name="icon/leaf">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a651bb3e-c281-4eb3-8b5c-744213e4b71a.svg" />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="17:371" data-name="wordmark">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[32px] text-white" data-node-id="17:372">
              TeaLeaf
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#c5e48b] text-[24px]" data-node-id="17:373">
              Field Scout
            </p>
          </div>
        </div>
        <div className="h-[28px] relative shrink-0 w-[100px]" data-node-id="17:374" data-name="gap"></div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="17:375">
          MENU
        </p>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:376" data-name="Nav / Dashboard">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:377" data-name="icon/home">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/b6abd92f-46e3-4dec-a5fb-fb6c0f29f56a.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:380">
            Dashboard
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:381" data-name="Nav / Users">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:382" data-name="icon/users">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e3c1c310-bc0b-405a-a36e-5d9de1a2d639.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:387">
            Users
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:388" data-name="Nav / Roles & Permissions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:389" data-name="icon/shield">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2abc266d-ba2e-4d27-ab5c-9b8dd38cc5f8.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:391">Roles & Permissions</p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:392" data-name="Nav / Estates">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:393" data-name="icon/map">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/20ebbbe7-1d93-4375-b055-ffd6a2715233.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:396">
            Estates
          </p>
        </a>
        <a className="bg-[#2a5c38] content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:397" data-name="Nav / Divisions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:398" data-name="icon/layers">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a7c5b806-3925-47cc-9f99-3e56607c7015.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-left text-white whitespace-nowrap" data-node-id="17:401">
            Divisions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:402" data-name="Nav / Device Sessions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:403" data-name="icon/phone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/49cf4d68-d9ef-4172-bb7f-f1049ffe3632.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:406">
            Device Sessions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:407" data-name="Nav / My Profile">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:408" data-name="icon/user">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/15056164-879f-410f-840f-ff07e5559a0d.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:411">
            My Profile
          </p>
        </a>
        <div className="flex-[1_0_0] min-h-px relative w-[100px]" data-node-id="17:412" data-name="spacer"></div>
        <div className="bg-[#1b4a2b] content-stretch flex gap-[20px] items-center overflow-clip p-[20px] relative rounded-[20px] shrink-0 w-full" data-node-id="17:413" data-name="User card">
          <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[34px] shrink-0 size-[68px]" data-node-id="17:414" data-name="Avatar">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[25.84px] whitespace-nowrap" data-node-id="17:415">
              AP
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:416" data-name="u">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[25px] text-white" data-node-id="17:417">
              Anika Perera
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#a9c4b0] text-[23px]" data-node-id="17:418">
              Administrator
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="17:419">
          Demonstration data · UI design only
        </p>
      </div>
      <div className="absolute content-stretch flex flex-col h-[2160px] items-start left-[496px] overflow-clip top-0 w-[3344px]" data-node-id="17:420" data-name="Main">
        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[36px] h-[144px] items-center overflow-clip px-[64px] relative shrink-0 w-full" data-node-id="17:421" data-name="Top bar">
          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0" data-node-id="17:422" data-name="Breadcrumbs">
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="17:423">
              <p className="leading-[normal]">Administration</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="17:424" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/8a1b79a2-f237-46b1-a606-a962b7fc0445.svg" />
            </div>
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="17:426">
              <p className="leading-[normal]">Divisions</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="17:427" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/8a1b79a2-f237-46b1-a606-a962b7fc0445.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:429">
              West Terrace
            </p>
          </div>
          <div className="flex-[1_0_0] h-[100px] min-w-px relative" data-node-id="17:430" data-name="spacer"></div>
          <a className="bg-white border-2 border-[#c5cec8] border-solid content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip pl-[26px] pr-[30px] py-[16px] relative rounded-[32px] shrink-0" data-node-id="71:245" data-name="Button / secondary / Switch Demo Role">
            <div className="relative shrink-0 size-[30px]" data-node-id="71:246" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/23f82438-7c13-4c70-b0af-0bc73cd8d77e.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[26px] text-left whitespace-nowrap" data-node-id="71:248">
              <p className="leading-[normal]">Switch Demo Role</p>
            </div>
          </a>
          <div className="bg-[#f1f5f1] content-stretch cursor-pointer flex gap-[16px] h-[80px] items-center overflow-clip px-[28px] relative rounded-[40px] shrink-0 w-[680px]" data-node-id="17:431" data-name="Search">
            <div className="relative shrink-0 size-[34px]" data-node-id="17:432" role="button" tabIndex={0} data-name="icon/search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e2af0290-61e6-4a70-bdfa-da8a11fae4db.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#6b7a72] text-[26px] text-left whitespace-nowrap" data-node-id="17:435" role="button" tabIndex={0}>
              <p className="leading-[normal]">Search observations, cases, users</p>
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.01)] inset-0" data-node-id="60:860" role="button" tabIndex={0} data-name="Search hit area"></div>
          </div>
          <div className="bg-[#fff1d6] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:436" data-name="Badge / Demo data">
            <div className="relative shrink-0 size-[12px]" data-node-id="17:437" data-name="dot">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/60f6972b-79d1-4091-8e4f-9e0fe7829bb1.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7a4f00] text-[23px] whitespace-nowrap" data-node-id="17:438">
              Demo data
            </p>
          </div>
          <button className="bg-[#f1f5f1] content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="17:439" data-name="bell">
            <div className="relative shrink-0 size-[38px]" data-node-id="17:440" data-name="icon/bell">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/6248ac59-75a4-40c3-bc12-ea9853c3c767.svg" />
            </div>
          </button>
          <a className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="17:443" data-name="Profile menu trigger">
            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[36px] shrink-0 size-[72px]" data-node-id="17:444" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27.36px] text-left whitespace-nowrap" data-node-id="17:445">
                AP
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-left whitespace-nowrap" data-node-id="17:446" data-name="p">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[26px]" data-node-id="17:447">
                Anika Perera
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[23px]" data-node-id="17:448">
                Administrator
              </p>
            </div>
            <div className="relative shrink-0 size-[32px]" data-node-id="17:449" data-name="icon/down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/7e21ed2d-7e0b-45d9-8200-b391be0e6a8c.svg" />
            </div>
          </a>
        </div>
        <div className="bg-[#f4f7f3] content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-px overflow-clip px-[64px] py-[52px] relative w-full" data-node-id="17:451" data-name="Content">
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:452" data-name="Page header">
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0" data-node-id="17:453" data-name="titles">
              <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0" data-node-id="17:454" data-name="Back">
                <div className="overflow-clip relative shrink-0 size-[32px]" data-node-id="17:455" data-name="icon/left">
                  <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="17:456" data-name="Vector">
                    <div className="absolute inset-[-8.33%_-16.67%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/50b8d827-0c39-4856-8c9d-dc29c09527aa.svg" />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[26px] text-left whitespace-nowrap" data-node-id="17:457">
                  <p className="leading-[normal]">Back to divisions</p>
                </div>
              </a>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[52px] whitespace-nowrap" data-node-id="17:458">
                West Terrace
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] whitespace-nowrap" data-node-id="17:459">
                DIV-006 · Riverbend Tea Estate (EST-002) · Active
              </p>
            </div>
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="17:460" data-name="Actions">
              <button className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch cursor-pointer flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="17:461" data-name="Button / secondary / Edit division">
                <div className="relative shrink-0 size-[32px]" data-node-id="17:462" data-name="icon/edit">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/bb15813a-4fc3-4163-9fde-73908771f2a1.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[26px] text-left whitespace-nowrap" data-node-id="17:465">
                  Edit division
                </p>
              </button>
            </div>
          </div>
          <div className="content-stretch flex gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="17:466" data-name="KPI row">
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="17:467" data-name="KPI / Observations">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:468" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="17:469">
                  Observations
                </p>
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="17:470" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="17:471" data-name="icon/clip">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/ff316f55-9350-403b-8ceb-c4c60faa48d6.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="17:474">
                5
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="17:475">
                Demo fixture total
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="17:476" data-name="KPI / Verified">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:477" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="17:478">
                  Verified
                </p>
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="17:479" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="17:480" data-name="icon/check">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/84a8f04f-b62f-4c6b-b438-65dc7c490857.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="17:482">
                1
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="17:483">
                Supervisor verified
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="17:484" data-name="KPI / Pending review">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:485" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="17:486">
                  Pending review
                </p>
                <div className="bg-[#fff1d6] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="17:487" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="17:488" data-name="icon/clock">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a584010b-b582-4580-823e-68d513dd69f8.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="17:491">
                1
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="17:492">
                In review
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="17:493" data-name="KPI / Expert-confirmed cases">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:494" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="17:495">
                  Expert-confirmed cases
                </p>
                <div className="bg-[#ede7f8] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="17:496" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="17:497" data-name="icon/flask">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2aaa3582-3e06-4c01-a942-754d834babee.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="17:499">
                2
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="17:500">
                CASE-006, CASE-042
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-start min-h-px overflow-clip relative w-full" data-node-id="17:501" data-name="Row">
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col gap-[32px] h-full items-start overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-[760px]" data-node-id="17:502" data-name="Card / Division profile">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:503" data-name="Card header">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[32px] whitespace-nowrap" data-node-id="17:504">
                  Division profile
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="17:505" data-name="Details grid">
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:506" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:507" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:508">
                      Division ID
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:509">
                      DIV-006
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:510" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:511" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal leading-[normal] relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:512">
                      Estate
                    </p>
                    <a className="block cursor-pointer font-['Inter:Semi_Bold'] font-semibold leading-[0] relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:513">
                      <p className="leading-[normal]">Riverbend Tea Estate</p>
                    </a>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:514" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:515" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:516">
                      Region
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:517">
                      Kandy
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:518" data-name="row">
                  <div className="content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start min-w-px overflow-clip relative" data-node-id="17:519" data-name="kv">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[24px] whitespace-nowrap" data-node-id="17:520">
                      Status
                    </p>
                    <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:521" data-name="Badge / Active">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:522" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/08efc97a-aeb4-46c9-b3af-01dbf56d5359.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:523">
                        Active
                      </p>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:524" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:525" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:526">
                      Field worker
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:527">
                      Ravindu Kumara (USR-010)
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:528" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:529" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:530">
                      Supervisor
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:531">
                      Malini Fernando (USR-003)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="17:532" data-name="Card / Recent observations">
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="17:533" data-name="Card header">
                <p className="relative shrink-0 text-[#1f2a24] text-[32px]" data-node-id="17:534">
                  Recent observations
                </p>
                <p className="relative shrink-0 text-[#2e7d32] text-[26px]" data-node-id="17:535">
                  Open review queue
                </p>
              </div>
              <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] shrink-0 w-full" data-node-id="17:536" data-name="Table">
                <div className="bg-[#f4f8f2] content-stretch flex h-[84px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:537" data-name="Header row">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:538" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:539">
                      OBSERVATION
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:540" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:541">
                      CAPTURED
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:542" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:543">
                      SUSPECTED DISEASE
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:544" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:545">
                      REVIEW STATUS
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:546" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:547">
                      GPS ACCURACY
                    </p>
                  </div>
                </div>
                <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:548" data-name="Row 1">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:549" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:550">
                      OBS-006
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:551" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:552">
                      07 Oct 2026
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:553" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:554">
                      Grey blight
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:555" data-name="Cell">
                    <div className="bg-[#ede7f8] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:556" data-name="Badge / Referred">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:557" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/5336c13d-8caf-4e99-90f0-799c6f90e8cd.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#52389a] text-[23px] whitespace-nowrap" data-node-id="17:558">
                        Referred
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:559" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:560">
                      11 m
                    </p>
                  </div>
                </div>
                <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:561" data-name="Row 2">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:562" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:563">
                      OBS-015
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:564" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:565">
                      16 Oct 2026
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:566" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:567">
                      Brown blight
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:568" data-name="Cell">
                    <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:569" data-name="Badge / Verified">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:570" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/08efc97a-aeb4-46c9-b3af-01dbf56d5359.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:571">
                        Verified
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:572" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:573">
                      20 m
                    </p>
                  </div>
                </div>
                <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:574" data-name="Row 3">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:575" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:576">
                      OBS-024
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:577" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:578">
                      06 Oct 2026
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:579" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:580">
                      Algal leaf spot
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:581" data-name="Cell">
                    <div className="bg-[#fff1d6] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:582" data-name="Badge / Flagged">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:583" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/60f6972b-79d1-4091-8e4f-9e0fe7829bb1.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7a4f00] text-[23px] whitespace-nowrap" data-node-id="17:584">
                        Flagged
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:585" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:586">
                      11 m
                    </p>
                  </div>
                </div>
                <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:587" data-name="Row 4">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:588" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:589">
                      OBS-033
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:590" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:591">
                      15 Oct 2026
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:592" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:593">
                      Blister blight
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:594" data-name="Cell">
                    <div className="bg-[#ede7f8] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:595" data-name="Badge / In review">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:596" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/5336c13d-8caf-4e99-90f0-799c6f90e8cd.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#52389a] text-[23px] whitespace-nowrap" data-node-id="17:597">
                        In review
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:598" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:599">
                      20 m
                    </p>
                  </div>
                </div>
                <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:600" data-name="Row 5">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[370.849px]" data-node-id="17:601" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:602">
                      OBS-042
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[432.658px]" data-node-id="17:603" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:604">
                      05 Oct 2026
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:605" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:606">
                      Grey blight
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[556.274px]" data-node-id="17:607" data-name="Cell">
                    <div className="bg-[#ede7f8] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:608" data-name="Badge / Referred">
                      <div className="relative shrink-0 size-[12px]" data-node-id="17:609" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/5336c13d-8caf-4e99-90f0-799c6f90e8cd.svg" />
                      </div>
                      <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#52389a] text-[23px] whitespace-nowrap" data-node-id="17:610">
                        Referred
                      </p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[339.945px]" data-node-id="17:611" data-name="Cell">
                    <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:612">
                      11 m
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);}
