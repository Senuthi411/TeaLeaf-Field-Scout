import RoleIntro from "./RoleIntro";
import RoleFilters from "./RoleFilters";
import RoleMatrix from "./RoleMatrix";
import RoleCoverage from "./RoleCoverage";
import RoleActions from "./RoleActions";
export default function Roles() {
  return (
    <div className="composed">
      <RoleIntro />
      <RoleFilters />
      <RoleMatrix />
      <RoleCoverage />
      <RoleActions />
    </div>
  );
}
