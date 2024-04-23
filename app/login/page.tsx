import AppLogo from '@/components/AppLogo/AppLogo';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function LoginPage() {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center gap-8'>
      <AppLogo size='lg' />
      <LoginForm />
    </main>
  );
}
