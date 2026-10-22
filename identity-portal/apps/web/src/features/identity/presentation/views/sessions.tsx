import { TableSearch, TableSelect } from "../TableControls";
export default function Screen(){return (
    <div className="bg-[#f4f7f3] relative size-full" data-node-id="17:613" data-name="WEB / Identity / ID-13 / default / 3840x2160">
      <div className="absolute bg-[#12351f] content-stretch flex flex-col gap-[8px] h-[2160px] items-start left-0 overflow-clip px-[28px] py-[36px] top-0 w-[496px]" data-node-id="17:614" data-name="Sidebar">
        <div className="content-stretch flex gap-[20px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-node-id="17:615" data-name="Brand">
          <div className="bg-[#e8f5e0] content-stretch flex items-center justify-center overflow-clip relative rounded-[38px] shrink-0 size-[76px]" data-node-id="17:616" data-name="logo">
            <div className="relative shrink-0 size-[44px]" data-node-id="17:617" data-name="icon/leaf">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/03d843ba-060c-496c-afd2-e74b8eb4d4cc.svg" />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="17:620" data-name="wordmark">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[32px] text-white" data-node-id="17:621">
              TeaLeaf
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#c5e48b] text-[24px]" data-node-id="17:622">
              Field Scout
            </p>
          </div>
        </div>
        <div className="h-[28px] relative shrink-0 w-[100px]" data-node-id="17:623" data-name="gap"></div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="17:624">
          MENU
        </p>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:625" data-name="Nav / Dashboard">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:626" data-name="icon/home">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/319d13e8-e2bb-488c-b527-eb9a5c0188ca.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:629">
            Dashboard
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:630" data-name="Nav / Users">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:631" data-name="icon/users">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/4dfa567f-cd29-45a3-8f45-eaaf3d1bfaf3.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:636">
            Users
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:637" data-name="Nav / Roles & Permissions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:638" data-name="icon/shield">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/ffb88f0c-41e6-47a4-a21d-a7636367c593.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:640">Roles & Permissions</p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:641" data-name="Nav / Estates">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:642" data-name="icon/map">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/6034f9d8-a60b-4c4b-b686-75a22bd26bb0.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:645">
            Estates
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:646" data-name="Nav / Divisions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:647" data-name="icon/layers">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2828c8c9-6f7c-47fa-84f3-a55981382897.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:650">
            Divisions
          </p>
        </a>
        <div className="bg-[#2a5c38] content-stretch flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:651" data-name="Nav / Device Sessions">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:652" data-name="icon/phone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/751dfc8f-4644-4c3f-b195-ea1d23c0b71c.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-white whitespace-nowrap" data-node-id="17:655">
            Device Sessions
          </p>
        </div>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="17:656" data-name="Nav / My Profile">
          <div className="relative shrink-0 size-[36px]" data-node-id="17:657" data-name="icon/user">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a363f535-c11c-4b4a-8011-04c1ea1701b2.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="17:660">
            My Profile
          </p>
        </a>
        <div className="flex-[1_0_0] min-h-px relative w-[100px]" data-node-id="17:661" data-name="spacer"></div>
        <div className="bg-[#1b4a2b] content-stretch flex gap-[20px] items-center overflow-clip p-[20px] relative rounded-[20px] shrink-0 w-full" data-node-id="17:662" data-name="User card">
          <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[34px] shrink-0 size-[68px]" data-node-id="17:663" data-name="Avatar">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[25.84px] whitespace-nowrap" data-node-id="17:664">
              AP
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:665" data-name="u">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[25px] text-white" data-node-id="17:666">
              Anika Perera
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#a9c4b0] text-[23px]" data-node-id="17:667">
              Administrator
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="17:668">
          Demonstration data · UI design only
        </p>
      </div>
      <div className="absolute content-stretch flex flex-col h-[2160px] items-start left-[496px] overflow-clip top-0 w-[3344px]" data-node-id="17:669" data-name="Main">
        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[36px] h-[144px] items-center overflow-clip px-[64px] relative shrink-0 w-full" data-node-id="17:670" data-name="Top bar">
          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0" data-node-id="17:671" data-name="Breadcrumbs">
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="17:672">
              <p className="leading-[normal]">Administration</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="17:673" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/235644c0-c640-4d1e-99e9-ef066af39e55.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:675">
              Device Sessions
            </p>
          </div>
          <div className="flex-[1_0_0] h-[100px] min-w-px relative" data-node-id="17:676" data-name="spacer"></div>
          <a className="bg-white border-2 border-[#c5cec8] border-solid content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip pl-[26px] pr-[30px] py-[16px] relative rounded-[32px] shrink-0" data-node-id="71:252" data-name="Button / secondary / Switch Demo Role">
            <div className="relative shrink-0 size-[30px]" data-node-id="71:253" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/f291dc9a-c7da-493b-8a37-d02de5f3e6e3.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[26px] text-left whitespace-nowrap" data-node-id="71:255">
              <p className="leading-[normal]">Switch Demo Role</p>
            </div>
          </a>
          <div className="bg-[#f1f5f1] content-stretch cursor-pointer flex gap-[16px] h-[80px] items-center overflow-clip px-[28px] relative rounded-[40px] shrink-0 w-[680px]" data-node-id="17:677" data-name="Search">
            <div className="relative shrink-0 size-[34px]" data-node-id="17:678" role="button" tabIndex={0} data-name="icon/search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/71cddce9-e0d1-4d6e-b2c6-74b9e2f253ec.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#6b7a72] text-[26px] text-left whitespace-nowrap" data-node-id="17:681" role="button" tabIndex={0}>
              <p className="leading-[normal]">Search observations, cases, users</p>
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.01)] inset-0" data-node-id="60:865" role="button" tabIndex={0} data-name="Search hit area"></div>
          </div>
          <div className="bg-[#fff1d6] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:682" data-name="Badge / Demo data">
            <div className="relative shrink-0 size-[12px]" data-node-id="17:683" data-name="dot">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/c4be3b4d-983d-4d67-8a54-62292d423602.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7a4f00] text-[23px] whitespace-nowrap" data-node-id="17:684">
              Demo data
            </p>
          </div>
          <button className="bg-[#f1f5f1] content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="17:685" data-name="bell">
            <div className="relative shrink-0 size-[38px]" data-node-id="17:686" data-name="icon/bell">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/b7dc3b90-e844-4062-917c-12c1347e22fc.svg" />
            </div>
          </button>
          <a className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="17:689" data-name="Profile menu trigger">
            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[36px] shrink-0 size-[72px]" data-node-id="17:690" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27.36px] text-left whitespace-nowrap" data-node-id="17:691">
                AP
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-left whitespace-nowrap" data-node-id="17:692" data-name="p">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[26px]" data-node-id="17:693">
                Anika Perera
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[23px]" data-node-id="17:694">
                Administrator
              </p>
            </div>
            <div className="relative shrink-0 size-[32px]" data-node-id="17:695" data-name="icon/down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/c3ed1614-d914-4137-8209-3dcb55ce503c.svg" />
            </div>
          </a>
        </div>
        <div className="bg-[#f4f7f3] content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-px overflow-clip px-[64px] py-[52px] relative w-full" data-node-id="17:697" data-name="Content">
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:698" data-name="Page header">
            <div className="[word-break:break-word] content-stretch flex flex-col gap-[8px] items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="17:699" data-name="titles">
              <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[#1f2a24] text-[52px]" data-node-id="17:700">
                Device Sessions
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[28px]" data-node-id="17:701">
                Mobile app sessions for field workers · illustrative session data
              </p>
            </div>
            <div className="content-stretch flex items-center overflow-clip relative shrink-0" data-node-id="17:702" data-name="Actions">
              <button className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch cursor-pointer flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="17:703" data-name="Button / secondary / Refresh">
                <div className="relative shrink-0 size-[32px]" data-node-id="17:704" data-name="icon/refresh">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/cbfbad37-1723-4959-a0b8-6c916ab536d5.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[26px] text-left whitespace-nowrap" data-node-id="17:709">
                  Refresh
                </p>
              </button>
            </div>
          </div>
          <div className="content-stretch cursor-pointer flex gap-[24px] items-center overflow-clip relative shrink-0 w-full" data-node-id="17:710" data-name="Filter bar">
            <div className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch flex gap-[16px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-[720px]" data-node-id="17:711" data-name="Search">
              <div className="relative shrink-0 size-[34px]" data-node-id="17:712" role="button" tabIndex={0} data-name="icon/search">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e4c8eaa5-e84d-4520-bb0f-4dca92207532.svg" />
              </div>
              <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#6b7a72] text-[27px] text-left whitespace-nowrap" data-node-id="17:715" role="button" tabIndex={0}>
                <TableSearch className="leading-[normal]" placeholder="Search by session, user or device" />
              </div>
            </div>
            <div className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch flex gap-[16px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0" data-node-id="17:716" data-name="Filter / User: All">
              <TableSelect className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="17:717" label="User" />
              <div className="relative shrink-0 size-[28px]" data-node-id="17:718" data-name="icon/down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/3e05abb0-c810-4841-8eaa-8edf1914294e.svg" />
              </div>
            </div>
            <div className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch flex gap-[16px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0" data-node-id="17:720" data-name="Filter / Status: All">
              <TableSelect className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="17:721" label="Status" />
              <div className="relative shrink-0 size-[28px]" data-node-id="17:722" data-name="icon/down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/3e05abb0-c810-4841-8eaa-8edf1914294e.svg" />
              </div>
            </div>
            <div className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch flex gap-[16px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0" data-node-id="17:724" data-name="Filter / Last seen: 30 days">
              <TableSelect className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="17:725" label="Last seen" />
              <div className="relative shrink-0 size-[28px]" data-node-id="17:726" data-name="icon/down">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/3e05abb0-c810-4841-8eaa-8edf1914294e.svg" />
              </div>
            </div>
            <button className="content-stretch flex gap-[10px] items-center overflow-clip px-[20px] py-[14px] relative shrink-0" data-node-id="82:608" data-name="Button / ghost / Reset filters">
              <div className="relative shrink-0 size-[28px]" data-node-id="82:609" role="button" tabIndex={0} data-name="Frame">
                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/f49c8691-500e-4b48-8605-73c9de4e0a1c.svg" />
              </div>
              <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[26px] text-left whitespace-nowrap" data-node-id="82:611" role="button" tabIndex={0}>
                <p className="leading-[normal]">Reset filters</p>
              </div>
            </button>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-start min-h-px overflow-clip relative w-full" data-node-id="17:728" data-name="Row">
            <div className="content-stretch flex flex-[1_0_0] flex-col gap-[32px] items-start min-w-px overflow-clip relative" data-node-id="17:729" data-name="Left">
              <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] shrink-0 w-full" data-node-id="17:730" data-name="Table">
                <div className="bg-[#f4f8f2] content-stretch flex h-[84px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:731" data-name="Header row">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:732" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:733">
                      SESSION
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:734" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:735">
                      USER
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:736" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:737">
                      DEVICE
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:738" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:739">
                      LAST SEEN
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:740" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:741">
                      STATUS
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:742" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="17:743">
                      ​
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:580" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:579" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:578" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:577" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:744" data-name="Row 1">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:745" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:746">
                              DS-3091
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:747" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:748" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:749">
                                HN
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:750">
                              Hiruni Nadeesha
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:751" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:752">
                              Android 14 · Pixel 7
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:753" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:754">
                              Today · 07:58
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:755" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:756" data-name="Badge / Active">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:757" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/719f0867-c0c7-4d2a-8e8f-38be2a07f489.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:758">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:759" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:760" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:584" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:583" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:582" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:581" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:764" data-name="Row 2">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:765" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:766">
                              DS-3088
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:767" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:768" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:769">
                                IK
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:770">
                              Ishara Kumari
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:771" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:772">
                              Android 13 · Galaxy A54
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:773" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:774">
                              Today · 08:12
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:775" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:776" data-name="Badge / Active">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:777" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/719f0867-c0c7-4d2a-8e8f-38be2a07f489.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:778">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:779" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:780" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:588" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:587" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:586" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:585" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:784" data-name="Row 3">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:785" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:786">
                              DS-3075
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:787" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:788" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:789">
                                DS
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:790">
                              Dinuka Sen
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:791" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:792">
                              Android 14 · Pixel 6a
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:793" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:794">
                              Today · 07:30
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:795" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:796" data-name="Badge / Active">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:797" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/719f0867-c0c7-4d2a-8e8f-38be2a07f489.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:798">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:799" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:800" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:592" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:591" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:590" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:589" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:804" data-name="Row 4">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:805" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:806">
                              DS-3060
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:807" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:808" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:809">
                                RK
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:810">
                              Ravindu Kumara
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:811" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:812">
                              Android 12 · Redmi Note 11
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:813" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:814">
                              Yesterday · 17:20
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:815" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:816" data-name="Badge / Active">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:817" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/719f0867-c0c7-4d2a-8e8f-38be2a07f489.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:818">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:819" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:820" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:596" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:595" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:594" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:593" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:824" data-name="Row 5">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:825" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:826">
                              DS-3054
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:827" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:828" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:829">
                                PF
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:830">
                              Pasan Fernando
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:831" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:832">
                              Android 13 · Galaxy A34
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:833" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:834">
                              Yesterday · 15:02
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:835" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:836" data-name="Badge / Active">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:837" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/719f0867-c0c7-4d2a-8e8f-38be2a07f489.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] whitespace-nowrap" data-node-id="17:838">
                                Active
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:839" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:840" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:600" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:599" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:598" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:597" data-name="Filter gate / User">
                        <div className="bg-[#f1f7ec] border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:844" data-name="Row 6">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:845" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:846">
                              DS-3012
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:847" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:848" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:849">
                                SR
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:850">
                              Sewmi Raj
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:851" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:852">
                              Android 14 · Pixel 7
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:853" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:854">
                              20 Oct · 08:15
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:855" data-name="Cell">
                            <div className="bg-[#fde4e1] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:856" data-name="Badge / Revoked">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:857" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/d5a726e1-4bc4-4b20-9ba3-655ec3257da7.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#a8221a] text-[23px] whitespace-nowrap" data-node-id="17:858">
                                Revoked
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:859" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:860" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:604" data-name="Filter gate / Search">
                  <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:603" data-name="Filter gate / Last seen">
                    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:602" data-name="Filter gate / Status">
                      <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-node-id="82:601" data-name="Filter gate / User">
                        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex h-[108px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="17:864" data-name="Row 7">
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[276.049px]" data-node-id="17:865" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] whitespace-nowrap" data-node-id="17:866">
                              DS-2977
                            </p>
                          </div>
                          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:867" data-name="Cell">
                            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[28px] shrink-0 size-[56px]" data-node-id="17:868" data-name="Avatar">
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[21.28px] whitespace-nowrap" data-node-id="17:869">
                                HN
                              </p>
                            </div>
                            <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:870">
                              Hiruni Nadeesha
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[552.099px]" data-node-id="17:871" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:872">
                              Android 13 · Galaxy A54
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[414.074px]" data-node-id="17:873" data-name="Cell">
                            <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="17:874">
                              12 Oct · 16:40
                            </p>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[331.259px]" data-node-id="17:875" data-name="Cell">
                            <div className="bg-[#eef1ef] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:876" data-name="Badge / Signed out">
                              <div className="relative shrink-0 size-[12px]" data-node-id="17:877" data-name="dot">
                                <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/58abee17-37f3-493f-ad9c-fe289c0792e2.svg" />
                              </div>
                              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#46554c] text-[23px] whitespace-nowrap" data-node-id="17:878">
                                Signed out
                              </p>
                            </div>
                          </div>
                          <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[110.42px]" data-node-id="17:879" data-name="Cell">
                            <div className="relative shrink-0 size-[36px]" data-node-id="17:880" data-name="icon/more">
                              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2f6662fa-29f2-49b0-9e3b-5b78c27ab4dc.svg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:884" data-name="Pagination">
                <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="17:885">
                  Showing 1–7 of 7 sessions
                </p>
                <div className="content-stretch flex gap-[12px] items-start overflow-clip relative shrink-0" data-node-id="17:886" data-name="pages">
                  <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex items-center justify-center opacity-40 overflow-clip relative rounded-[16px] shrink-0 size-[68px]" data-node-id="17:887" data-name="Page ‹">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[26px] whitespace-nowrap" data-node-id="17:888">
                      ‹
                    </p>
                  </div>
                  <div className="bg-[#2e7d32] content-stretch flex items-center justify-center overflow-clip relative rounded-[16px] shrink-0 size-[68px]" data-node-id="17:889" data-name="Page 1">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[26px] text-white whitespace-nowrap" data-node-id="17:890">
                      1
                    </p>
                  </div>
                  <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex items-center justify-center opacity-40 overflow-clip relative rounded-[16px] shrink-0 size-[68px]" data-node-id="17:893" data-name="Page ›">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[26px] whitespace-nowrap" data-node-id="17:894">
                      ›
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col gap-[32px] h-full items-start overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)] shrink-0 w-[840px]" data-node-id="17:895" data-name="Card / Session DS-3012">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="17:896" data-name="Card header">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[32px] whitespace-nowrap" data-node-id="17:897">
                  Session DS-3012
                </p>
              </div>
              <div className="bg-[#fde4e1] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="17:898" data-name="Badge / Revoked">
                <div className="relative shrink-0 size-[12px]" data-node-id="17:899" data-name="dot">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/d5a726e1-4bc4-4b20-9ba3-655ec3257da7.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#a8221a] text-[23px] whitespace-nowrap" data-node-id="17:900">
                  Revoked
                </p>
              </div>
              <div className="content-stretch flex flex-col gap-[32px] items-start overflow-clip relative shrink-0 w-full" data-node-id="17:901" data-name="Details grid">
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:902" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:903" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:904">
                      User
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:905">
                      Sewmi Raj (USR-011)
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:906" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:907" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:908">
                      Device
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:909">
                      Android 14 · Pixel 7
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:910" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:911" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:912">
                      Scope
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:913">
                      DIV-007, DIV-008
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:914" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:915" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:916">
                      Revoked
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:917">
                      20 Oct 2026 · 08:15
                    </p>
                  </div>
                </div>
                <div className="content-stretch flex items-start overflow-clip relative shrink-0 w-full" data-node-id="17:918" data-name="row">
                  <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[6px] items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="17:919" data-name="kv">
                    <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[24px]" data-node-id="17:920">
                      Reason code
                    </p>
                    <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="17:921">
                      DEVICE_SESSION_REVOKED
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-[#fff1d6] content-stretch flex gap-[20px] items-center overflow-clip px-[32px] py-[24px] relative rounded-[20px] shrink-0 w-full" data-node-id="17:922" data-name="Banner / warn">
                <div className="relative shrink-0 size-[36px]" data-node-id="17:923" data-name="icon/alert">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e2dd80af-8071-4d46-9496-914824032691.svg" />
                </div>
                <p className="[word-break:break-word] flex-[1_0_0] font-['Inter:Medium'] font-medium leading-[normal] min-w-px not-italic relative text-[#7a4f00] text-[27px]" data-node-id="17:926">
                  Revoked sessions cannot be reactivated and cannot upload. Recovery needs an Administrator, a verified Field Worker and an audited recovery ticket; a new validated device session is created and queued records are revalidated. Unsynced evidence stays on the device.
                </p>
                <button className="content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[22px] shrink-0 size-[44px]" data-node-id="66:108" data-name="Dismiss banner">
                  <div className="relative shrink-0 size-[24px]" data-node-id="66:109" data-name="Frame">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2fa3c306-16bf-4547-b3a9-99e1bb065993.svg" />
                  </div>
                </button>
              </div>
              <a className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch cursor-pointer flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="17:927" data-name="Button / secondary / Start recovery">
                <div className="overflow-clip relative shrink-0 size-[32px]" data-node-id="17:928" data-name="icon/refresh">
                  <div className="absolute inset-[17.45%_16.67%_54.17%_16.67%]" data-node-id="17:929" data-name="Vector">
                    <div className="absolute inset-[-14.68%_-6.25%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/15123562-3dd2-4bb4-8a82-6cf396ede841.svg" />
                    </div>
                  </div>
                  <div className="absolute inset-[16.67%_62.5%_62.5%_16.67%]" data-node-id="17:930" data-name="Vector">
                    <div className="absolute inset-[-20%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/538d3998-48da-4269-9157-c06196f07d57.svg" />
                    </div>
                  </div>
                  <div className="absolute inset-[54.17%_16.67%_17.45%_16.67%]" data-node-id="17:931" data-name="Vector">
                    <div className="absolute inset-[-14.68%_-6.25%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/dd776cb2-13b7-4999-8596-ea93bf47da85.svg" />
                    </div>
                  </div>
                  <div className="absolute inset-[62.5%_16.67%_16.67%_62.5%]" data-node-id="17:932" data-name="Vector">
                    <div className="absolute inset-[-20%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/f64d68d9-e045-4513-886e-50ba6a97955c.svg" />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[26px] text-left whitespace-nowrap" data-node-id="17:933">
                  <p className="leading-[normal]">Start recovery</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>);}
