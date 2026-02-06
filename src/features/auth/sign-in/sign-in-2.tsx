import ViteLogo from '@/assets/vite.svg'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  return (
    <div className='relative flex h-svh flex-col lg:grid lg:grid-cols-2'>
      {/* Branding panel - half screen on mobile, left column on desktop */}
      <div className='relative flex h-[50svh] flex-col items-center justify-center bg-zinc-900 px-6 py-6 text-white lg:h-full lg:px-10 lg:py-10 lg:dark:border-r'>
        <div className='relative z-20 flex w-full items-center text-lg font-medium lg:absolute lg:left-10 lg:top-10 lg:w-auto'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
            className='mr-2 h-6 w-6'
          >
            <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
          </svg>
          SuiteConsole
        </div>

        <img
          src={ViteLogo}
          className='relative z-20 my-auto w-[100px] sm:w-[150px] lg:w-[301px]'
          alt='Vite'
        />

        <div className='relative z-20'>
          <blockquote className='space-y-1 text-center lg:space-y-2 lg:text-left'>
            <p className='text-sm sm:text-base lg:text-lg'>
              Cung cấp bộ công cụ bổ trợ cho ERP của bạn
            </p>
            <footer className='text-xs sm:text-sm'>Cloud Enterprise Vietnam</footer>
          </blockquote>
        </div>
      </div>

      {/* Form panel - half screen on mobile, right column on desktop */}
      <div className='flex h-[50svh] items-center justify-center p-6 lg:h-full lg:p-8'>
        <div className='flex w-full max-w-[350px] flex-col justify-center space-y-2'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight text-center'>Login</h1>
            <p className='text-muted-foreground px-8 text-center text-sm'>
              Khi ấn đăng nhập, bạn đã đồng ý với {' '}
              <a
                href='/terms'
                className='hover:text-primary underline underline-offset-4'
              >
                Điều khoản dịch vụ
              </a>{' '}
              và{' '}
              <a
                href='/privacy'
                className='hover:text-primary underline underline-offset-4'
              >
                Chính sách bảo mật
              </a>
              .
            </p>
          </div>
          <UserAuthForm />
        </div>
      </div>
    </div>
  )
}
