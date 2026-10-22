import { TableSearch, TableSelect } from "../TableControls";
export default function Screen(){return (
    <div className="bg-[#f4f7f3] relative size-full" data-node-id="16:865" data-name="WEB / Identity / ID-10 / default / 3840x2160">
      <div className="absolute bg-[#12351f] content-stretch flex flex-col gap-[8px] h-[2160px] items-start left-0 overflow-clip px-[28px] py-[36px] top-0 w-[496px]" data-node-id="16:866" data-name="Sidebar">
        <div className="content-stretch flex gap-[20px] items-center overflow-clip px-[12px] py-[8px] relative shrink-0" data-node-id="16:867" data-name="Brand">
          <div className="bg-[#e8f5e0] content-stretch flex items-center justify-center overflow-clip relative rounded-[38px] shrink-0 size-[76px]" data-node-id="16:868" data-name="logo">
            <div className="relative shrink-0 size-[44px]" data-node-id="16:869" data-name="icon/leaf">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/96fa1bed-527d-471f-ab18-0745393ee05b.svg" />
            </div>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="16:872" data-name="wordmark">
            <p className="font-['Inter:Bold'] font-bold relative shrink-0 text-[32px] text-white" data-node-id="16:873">
              TeaLeaf
            </p>
            <p className="font-['Inter:Medium'] font-medium relative shrink-0 text-[#c5e48b] text-[24px]" data-node-id="16:874">
              Field Scout
            </p>
          </div>
        </div>
        <div className="h-[28px] relative shrink-0 w-[100px]" data-node-id="16:875" data-name="gap"></div>
        <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="16:876">
          MENU
        </p>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:877" data-name="Nav / Dashboard">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:878" data-name="icon/home">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/6103c784-46e7-4d47-8699-6ed1af4d8995.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:881">
            Dashboard
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:882" data-name="Nav / Users">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:883" data-name="icon/users">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/370d95a6-5bd8-46c5-a2b5-8b1d8961645b.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:888">
            Users
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:889" data-name="Nav / Roles & Permissions">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:890" data-name="icon/shield">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/6dbb745e-3184-4c3b-adff-bb1013f37939.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:892">Roles & Permissions</p>
        </a>
        <a className="bg-[#2a5c38] content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:893" data-name="Nav / Estates">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:894" data-name="icon/map">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/95b9b283-8d43-4ff4-8546-062c5c395fe3.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[27px] text-left text-white whitespace-nowrap" data-node-id="16:897">
            Estates
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:898" data-name="Nav / Divisions">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:899" data-name="icon/layers">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/dc618beb-dab4-4894-91c0-c8f737f924ee.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:902">
            Divisions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:903" data-name="Nav / Device Sessions">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:904" data-name="icon/phone">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/ce1081d8-8c42-4a89-8b32-f0df625833b3.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:907">
            Device Sessions
          </p>
        </a>
        <a className="content-stretch cursor-pointer flex gap-[24px] h-[80px] items-center overflow-clip px-[24px] relative rounded-[16px] shrink-0 w-full" data-node-id="16:908" data-name="Nav / My Profile">
          <div className="relative shrink-0 size-[36px]" data-node-id="16:909" data-name="icon/user">
            <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/e166da1d-921b-4e3f-ab72-f943c2b0f978.svg" />
          </div>
          <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#c9dcce] text-[27px] text-left whitespace-nowrap" data-node-id="16:912">
            My Profile
          </p>
        </a>
        <div className="flex-[1_0_0] min-h-px relative w-[100px]" data-node-id="16:913" data-name="spacer"></div>
        <div className="bg-[#1b4a2b] content-stretch flex gap-[20px] items-center overflow-clip p-[20px] relative rounded-[20px] shrink-0 w-full" data-node-id="16:914" data-name="User card">
          <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[34px] shrink-0 size-[68px]" data-node-id="16:915" data-name="Avatar">
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[25.84px] whitespace-nowrap" data-node-id="16:916">
              AP
            </p>
          </div>
          <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col items-start leading-[normal] min-w-px not-italic overflow-clip relative whitespace-nowrap" data-node-id="16:917" data-name="u">
            <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[25px] text-white" data-node-id="16:918">
              Anika Perera
            </p>
            <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#a9c4b0] text-[23px]" data-node-id="16:919">
              Administrator
            </p>
          </div>
        </div>
        <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#8fb39a] text-[21px] whitespace-nowrap" data-node-id="16:920">
          Demonstration data · UI design only
        </p>
      </div>
      <div className="absolute content-stretch flex flex-col h-[2160px] items-start left-[496px] overflow-clip top-0 w-[3344px]" data-node-id="16:921" data-name="Main">
        <div className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[36px] h-[144px] items-center overflow-clip px-[64px] relative shrink-0 w-full" data-node-id="16:922" data-name="Top bar">
          <div className="content-stretch flex gap-[16px] items-center overflow-clip relative shrink-0" data-node-id="16:923" data-name="Breadcrumbs">
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="16:924">
              <p className="leading-[normal]">Administration</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="16:925" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/b052e5ea-39df-4ca5-9d0e-1af74b4d7e06.svg" />
            </div>
            <a className="[word-break:break-word] block cursor-pointer font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#5b6b62] text-[27px] whitespace-nowrap" data-node-id="16:927">
              <p className="leading-[normal]">Estates</p>
            </a>
            <div className="relative shrink-0 size-[28px]" data-node-id="16:928" data-name="icon/right">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/b052e5ea-39df-4ca5-9d0e-1af74b4d7e06.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[27px] whitespace-nowrap" data-node-id="16:930">
              Riverbend Tea Estate
            </p>
          </div>
          <div className="flex-[1_0_0] h-[100px] min-w-px relative" data-node-id="16:931" data-name="spacer"></div>
          <a className="bg-white border-2 border-[#c5cec8] border-solid content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip pl-[26px] pr-[30px] py-[16px] relative rounded-[32px] shrink-0" data-node-id="71:231" data-name="Button / secondary / Switch Demo Role">
            <div className="relative shrink-0 size-[30px]" data-node-id="71:232" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/b91d5d46-8874-40d0-b930-5a11a9239de6.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[26px] text-left whitespace-nowrap" data-node-id="71:234">
              <p className="leading-[normal]">Switch Demo Role</p>
            </div>
          </a>
          <div className="bg-[#f1f5f1] content-stretch cursor-pointer flex gap-[16px] h-[80px] items-center overflow-clip px-[28px] relative rounded-[40px] shrink-0 w-[680px]" data-node-id="16:932" data-name="Search">
            <div className="relative shrink-0 size-[34px]" data-node-id="16:933" role="button" tabIndex={0} data-name="icon/search">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/d4b1492f-bf17-4fbf-bb70-32ff7b9a3357.svg" />
            </div>
            <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#6b7a72] text-[26px] text-left whitespace-nowrap" data-node-id="16:936" role="button" tabIndex={0}>
              <p className="leading-[normal]">Search observations, cases, users</p>
            </div>
            <div className="absolute bg-[rgba(255,255,255,0.01)] inset-0" data-node-id="60:850" role="button" tabIndex={0} data-name="Search hit area"></div>
          </div>
          <div className="bg-[#fff1d6] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="16:937" data-name="Badge / Demo data">
            <div className="relative shrink-0 size-[12px]" data-node-id="16:938" data-name="dot">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/2d67a830-9046-4486-8f9f-94d2bc99bdcb.svg" />
            </div>
            <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#7a4f00] text-[23px] whitespace-nowrap" data-node-id="16:939">
              Demo data
            </p>
          </div>
          <button className="bg-[#f1f5f1] content-stretch cursor-pointer flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="16:940" data-name="bell">
            <div className="relative shrink-0 size-[38px]" data-node-id="16:941" data-name="icon/bell">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/ab4840f0-bc95-431a-bc33-19ab851d1105.svg" />
            </div>
          </button>
          <a className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="16:944" data-name="Profile menu trigger">
            <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[36px] shrink-0 size-[72px]" data-node-id="16:945" data-name="Avatar">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[27.36px] text-left whitespace-nowrap" data-node-id="16:946">
                AP
              </p>
            </div>
            <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 text-left whitespace-nowrap" data-node-id="16:947" data-name="p">
              <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[26px]" data-node-id="16:948">
                Anika Perera
              </p>
              <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[23px]" data-node-id="16:949">
                Administrator
              </p>
            </div>
            <div className="relative shrink-0 size-[32px]" data-node-id="16:950" data-name="icon/down">
              <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a69ef77e-b1ca-4cad-937d-458b34188cde.svg" />
            </div>
          </a>
        </div>
        <div className="bg-[#f4f7f3] content-stretch flex flex-[1_0_0] flex-col gap-[40px] items-start min-h-px overflow-clip px-[64px] py-[52px] relative w-full" data-node-id="16:952" data-name="Content">
          <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:953" data-name="Page header">
            <div className="content-stretch flex flex-col gap-[8px] items-start overflow-clip relative shrink-0" data-node-id="16:954" data-name="titles">
              <a className="content-stretch cursor-pointer flex gap-[12px] items-center overflow-clip relative shrink-0" data-node-id="16:955" data-name="Back">
                <div className="overflow-clip relative shrink-0 size-[32px]" data-node-id="16:956" data-name="icon/left">
                  <div className="absolute bottom-1/4 left-[37.5%] right-[37.5%] top-1/4" data-node-id="16:957" data-name="Vector">
                    <div className="absolute inset-[-8.33%_-16.67%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/1a823be7-f188-4c08-b7e9-493b2a64ae49.svg" />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#2e7d32] text-[26px] text-left whitespace-nowrap" data-node-id="16:958">
                  <p className="leading-[normal]">Back to estates</p>
                </div>
              </a>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[52px] whitespace-nowrap" data-node-id="16:959">
                Riverbend Tea Estate
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] whitespace-nowrap" data-node-id="16:960">
                EST-002 · Kandy · Active
              </p>
            </div>
            <div className="content-stretch cursor-pointer flex gap-[20px] items-center overflow-clip relative shrink-0" data-node-id="16:961" data-name="Actions">
              <button className="bg-white border-2 border-[#b8c4bc] border-solid content-stretch flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="16:962" data-name="Button / secondary / Edit estate">
                <div className="relative shrink-0 size-[32px]" data-node-id="16:963" data-name="icon/edit">
                  <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/28a49473-1486-461f-afc9-d4b605c7dcb3.svg" />
                </div>
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[26px] text-left whitespace-nowrap" data-node-id="16:966">
                  Edit estate
                </p>
              </button>
              <button className="bg-[#2e7d32] content-stretch flex gap-[12px] h-[76px] items-center justify-center overflow-clip px-[28px] relative rounded-[16px] shrink-0" data-node-id="16:967" data-name="Button / primary / Add division">
                <div className="overflow-clip relative shrink-0 size-[32px]" data-node-id="16:968" role="button" tabIndex={0} data-name="icon/plus">
                  <div className="absolute inset-[20.83%]" data-node-id="16:969" role="button" tabIndex={0} data-name="Vector">
                    <div className="absolute inset-[-7.14%]">
                      <img alt="" className="block max-w-none size-full" src="/assets/729f9164-82be-4176-a17b-78096042a488.svg" />
                    </div>
                  </div>
                </div>
                <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[26px] text-left text-white whitespace-nowrap" data-node-id="16:970" role="button" tabIndex={0}>
                  <p className="leading-[normal]">Add division</p>
                </div>
              </button>
            </div>
          </div>
          <div className="border-[#e1e8e2] border-b-2 border-solid content-stretch flex gap-[56px] items-start overflow-clip relative shrink-0 w-full" data-node-id="16:971" data-name="Tabs">
            <div className="border-[#2e7d32] border-b-6 border-solid content-stretch flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="16:972" data-name="Tab / Overview">
              <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[28px] whitespace-nowrap" data-node-id="16:973">
                Overview
              </p>
            </div>
            <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="16:974" data-name="Tab / Divisions">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="16:975">
                Divisions
              </p>
            </a>
            <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="16:976" data-name="Tab / Team">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="16:977">
                Team
              </p>
            </a>
            <a className="content-stretch cursor-pointer flex flex-col items-start overflow-clip py-[20px] relative shrink-0" data-node-id="16:978" data-name="Tab / Activity">
              <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[28px] text-left whitespace-nowrap" data-node-id="16:979">
                Activity
              </p>
            </a>
          </div>
          <div className="content-stretch flex gap-[40px] items-start overflow-clip relative shrink-0 w-full" data-node-id="16:980" data-name="KPI row">
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:981" data-name="KPI / Observations">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:982" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="16:983">
                  Observations
                </p>
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="16:984" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="16:985" data-name="icon/clip">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/139c279c-86cd-4e0d-85d0-f2d1d4150d0f.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="16:988">
                15
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="16:989">
                Demo fixture total
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:990" data-name="KPI / Pending review">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:991" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="16:992">
                  Pending review
                </p>
                <div className="bg-[#fff1d6] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="16:993" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="16:994" data-name="icon/inbox">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/c6dacbae-bbc5-4255-a601-30d63819b014.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="16:997">
                5
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="16:998">
                Submitted or in review
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:999" data-name="KPI / Corrections requested">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:1000" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="16:1001">
                  Corrections requested
                </p>
                <div className="bg-[#e1eefb] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="16:1002" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="16:1003" data-name="icon/edit">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/a6d5197a-560f-4288-a193-474137492e9c.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="16:1006">
                2
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="16:1007">
                Active correction requests
              </p>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[16px] items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:1008" data-name="KPI / Expert-confirmed cases">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:1009" data-name="top">
                <p className="[word-break:break-word] font-['Inter:Medium'] font-medium leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[26px] whitespace-nowrap" data-node-id="16:1010">
                  Expert-confirmed cases
                </p>
                <div className="bg-[#ede7f8] content-stretch flex items-center justify-center overflow-clip relative rounded-[20px] shrink-0 size-[72px]" data-node-id="16:1011" data-name="icon chip">
                  <div className="relative shrink-0 size-[40px]" data-node-id="16:1012" data-name="icon/flask">
                    <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/0792e410-b6b0-4019-9965-451f56fb843d.svg" />
                  </div>
                </div>
              </div>
              <p className="[word-break:break-word] font-['Inter:Bold'] font-bold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[68px] whitespace-nowrap" data-node-id="16:1014">
                2
              </p>
              <p className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[25px] whitespace-nowrap" data-node-id="16:1015">
                Diagnosed with confirmation
              </p>
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] gap-[40px] items-start min-h-px overflow-clip relative w-full" data-node-id="16:1016" data-name="Row">
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:1017" data-name="Card / Divisions">
              <div className="[word-break:break-word] content-stretch flex font-['Inter:Semi_Bold'] font-semibold items-center justify-between leading-[normal] not-italic overflow-clip relative shrink-0 w-full whitespace-nowrap" data-node-id="16:1018" data-name="Card header">
                <p className="relative shrink-0 text-[#1f2a24] text-[32px]" data-node-id="16:1019">
                  Divisions
                </p>
                <p className="relative shrink-0 text-[#2e7d32] text-[26px]" data-node-id="16:1020">
                  Manage divisions
                </p>
              </div>
              <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] shrink-0 w-full" data-node-id="16:1021" data-name="Table">
                <div className="bg-[#f4f8f2] content-stretch flex h-[84px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="16:1022" data-name="Header row">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[482.222px]" data-node-id="16:1023" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1024">
                      DIVISION
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1025" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1026">
                      ID
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[289.333px]" data-node-id="16:1027" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1028">
                      OBSERVATIONS
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1029" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1030">
                      VERIFIED
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1031" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1032">
                      PENDING
                    </p>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1033" data-name="Header cell">
                    <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#5b6b62] text-[22px] whitespace-nowrap" data-node-id="16:1034">
                      STATUS
                    </p>
                  </div>
                </div>
                <a className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch cursor-pointer flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="16:1035" data-name="Row 1">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[482.222px]" data-node-id="16:1036" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="16:1037">
                      <p className="leading-[normal]">Riverbank</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1038" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1039">
                      <p className="leading-[normal]">DIV-004</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[289.333px]" data-node-id="16:1040" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1041">
                      <p className="leading-[normal]">5</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1042" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1043">
                      <p className="leading-[normal]">0</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1044" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1045">
                      <p className="leading-[normal]">3</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1046" data-name="Cell">
                    <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="16:1047" data-name="Badge / Active">
                      <div className="relative shrink-0 size-[12px]" data-node-id="16:1048" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/269033fc-c67a-4138-b09b-922cf880102b.svg" />
                      </div>
                      <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="16:1049">
                        <p className="leading-[normal]">Active</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch cursor-pointer flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="16:1050" data-name="Row 2">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[482.222px]" data-node-id="16:1051" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="16:1052">
                      <p className="leading-[normal]">East Hills</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1053" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1054">
                      <p className="leading-[normal]">DIV-005</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[289.333px]" data-node-id="16:1055" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1056">
                      <p className="leading-[normal]">5</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1057" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1058">
                      <p className="leading-[normal]">1</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1059" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1060">
                      <p className="leading-[normal]">1</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1061" data-name="Cell">
                    <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="16:1062" data-name="Badge / Active">
                      <div className="relative shrink-0 size-[12px]" data-node-id="16:1063" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/fd779c0d-c9e4-4232-bba8-d63cc22ae6c0.svg" />
                      </div>
                      <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="16:1064">
                        <p className="leading-[normal]">Active</p>
                      </div>
                    </div>
                  </div>
                </a>
                <a className="bg-white border-[#e1e8e2] border-b-2 border-solid content-stretch cursor-pointer flex h-[100px] items-center overflow-clip px-[32px] relative shrink-0 w-full" data-node-id="16:1065" data-name="Row 3">
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[482.222px]" data-node-id="16:1066" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[27px] text-left whitespace-nowrap" data-node-id="16:1067">
                      <p className="leading-[normal]">West Terrace</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1068" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1069">
                      <p className="leading-[normal]">DIV-006</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[289.333px]" data-node-id="16:1070" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1071">
                      <p className="leading-[normal]">5</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1072" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1073">
                      <p className="leading-[normal]">1</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1074" data-name="Cell">
                    <div className="[word-break:break-word] font-['Inter:Regular'] font-normal leading-[0] not-italic relative shrink-0 text-[#1f2a24] text-[27px] text-left whitespace-nowrap" data-node-id="16:1075">
                      <p className="leading-[normal]">1</p>
                    </div>
                  </div>
                  <div className="content-stretch flex items-center overflow-clip relative shrink-0 w-[241.111px]" data-node-id="16:1076" data-name="Cell">
                    <div className="bg-[#e3f2da] content-stretch flex gap-[10px] items-center overflow-clip px-[18px] py-[6px] relative rounded-[40px] shrink-0" data-node-id="16:1077" data-name="Badge / Active">
                      <div className="relative shrink-0 size-[12px]" data-node-id="16:1078" data-name="dot">
                        <img alt="" className="absolute block inset-0 max-w-none size-full" src="/assets/da2a0011-00ee-4382-906e-e3f353760e80.svg" />
                      </div>
                      <div className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[0] not-italic relative shrink-0 text-[#1f5a2e] text-[23px] text-left whitespace-nowrap" data-node-id="16:1079">
                        <p className="leading-[normal]">Active</p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
            <div className="bg-white border-2 border-[#e1e8e2] border-solid content-stretch flex flex-[1_0_0] flex-col gap-[28px] h-full items-start min-w-px overflow-clip px-[40px] py-[36px] relative rounded-[28px] shadow-[0px_4px_16px_0px_rgba(18,51,31,0.08)]" data-node-id="16:1080" data-name="Card / Team">
              <div className="content-stretch flex items-center justify-between overflow-clip relative shrink-0 w-full" data-node-id="16:1081" data-name="Card header">
                <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f2a24] text-[32px] whitespace-nowrap" data-node-id="16:1082">
                  Team
                </p>
              </div>
              <div className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full" data-node-id="16:1083" data-name="Member">
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="16:1084" data-name="Avatar">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[30.4px] whitespace-nowrap" data-node-id="16:1085">
                    MF
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="16:1086" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="16:1087">
                    Malini Fernando
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[25px]" data-node-id="16:1088">
                    Supervisor
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full" data-node-id="16:1089" data-name="Member">
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="16:1090" data-name="Avatar">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[30.4px] whitespace-nowrap" data-node-id="16:1091">
                    TW
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="16:1092" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="16:1093">
                    Dr Tara Wijesinghe
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[25px]" data-node-id="16:1094">
                    Disease expert
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full" data-node-id="16:1095" data-name="Member">
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="16:1096" data-name="Avatar">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[30.4px] whitespace-nowrap" data-node-id="16:1097">
                    HN
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="16:1098" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="16:1099">
                    Hiruni Nadeesha
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[25px]" data-node-id="16:1100">
                    Field worker · DIV-004, DIV-005
                  </p>
                </div>
              </div>
              <div className="content-stretch flex gap-[24px] items-center overflow-clip relative shrink-0 w-full" data-node-id="16:1101" data-name="Member">
                <div className="bg-[#e3f2da] content-stretch flex items-center justify-center overflow-clip relative rounded-[40px] shrink-0 size-[80px]" data-node-id="16:1102" data-name="Avatar">
                  <p className="[word-break:break-word] font-['Inter:Semi_Bold'] font-semibold leading-[normal] not-italic relative shrink-0 text-[#1f5a2e] text-[30.4px] whitespace-nowrap" data-node-id="16:1103">
                    RK
                  </p>
                </div>
                <div className="[word-break:break-word] content-stretch flex flex-col items-start leading-[normal] not-italic overflow-clip relative shrink-0 whitespace-nowrap" data-node-id="16:1104" data-name="t">
                  <p className="font-['Inter:Semi_Bold'] font-semibold relative shrink-0 text-[#1f2a24] text-[28px]" data-node-id="16:1105">
                    Ravindu Kumara
                  </p>
                  <p className="font-['Inter:Regular'] font-normal relative shrink-0 text-[#5b6b62] text-[25px]" data-node-id="16:1106">
                    Field worker · DIV-006
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);}
