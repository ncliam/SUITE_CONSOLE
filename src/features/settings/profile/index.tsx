import ContentSection from '../components/content-section'
import ProfileForm from './profile-form'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { TopNav } from '@/components/layout/top-nav'

export default function SettingsProfile() {
  return (
    <>
      <Header>
            <TopNav />
            <div className='ml-auto flex items-center space-x-4'>
              <Search />
              <ThemeSwitch />
              <ProfileDropdown />
            </div>
          </Header>
          <Main>
              <ContentSection
                title='Profile'
                desc='This is how others will see you on the site.'>
                <ProfileForm />
              </ContentSection>
          </Main>
    </>
    
  )
}
