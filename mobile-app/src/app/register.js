import { config } from '../container.js';
import Real from '../presentation/screens/RegisterScreen.js';
import ComingSoon from '../presentation/screens/ComingSoonScreen.js';

// Presentation mode: this page is intentionally blank (see src/constants/config.js).
export default function Route() {
  return config.presentationMode ? <ComingSoon title="Register" /> : <Real />;
}
