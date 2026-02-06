import ContentSection from '../components/content-section'
import { WebhookForm } from './webhook-form'
import ComingSoon from '@/components/coming-soon'

export default function Webhooks() {

  return (
    <ContentSection
      title='Webhooks'
      desc='Send event notifications to your integration system.'
    >
        <ComingSoon/>
    </ContentSection>
  )
}