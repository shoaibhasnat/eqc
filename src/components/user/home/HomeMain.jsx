'use client';

import React from 'react' 
import IntroSection from './IntroSection'   
import Banner from './Banner' 
import SocialPlatforms from './SocialPlatforms'
import LecturesSection from './LecturesSection'
import ContactForm from '../contact/ContactForm'
import WhyChooseUs from '../about/WhyChooseUs'
import AskQuestion from './AskQuestion'
import ZakatCalculator from './ZakatCalculator'
import PageFaq from '@/components/seo/PageFaq'
import { HOME_FAQS } from '@/lib/faqs'
// import InheritanceCalculator from './InheritenceCalculator'
function HomeMain() {
  return (
    <> 
      <Banner /> 
      <IntroSection /> 
      <LecturesSection/>
      <WhyChooseUs/>
      <ZakatCalculator/>
      {/* <InheritanceCalculator/> */}
      <AskQuestion/>
      <SocialPlatforms/> 
      <PageFaq faqs={HOME_FAQS} />
      <ContactForm/> 
    </>
  )
}

export default HomeMain