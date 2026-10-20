import RuleIntro from "./RuleIntro";
import RuleMetrics from "./RuleMetrics";
import RuleBuilder from "./RuleBuilder";
import RuleFilters from "./RuleFilters";
import RuleCards from "./RuleCards";
import RuleStream from "./RuleStream";
export default function Rules() {
  return (
    <div className="composed rules">
      <RuleIntro />
      <RuleMetrics />
      <RuleBuilder />
      <RuleFilters />
      <RuleCards />
      <RuleStream />
    </div>
  );
}
