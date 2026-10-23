import { Redirect } from 'expo-router';
import { useAuth } from '../presentation/state/AuthContext.js';

export default function Index() {
  const { worker } = useAuth();
  return <Redirect href={worker ? '/home' : '/login'} />;
}
