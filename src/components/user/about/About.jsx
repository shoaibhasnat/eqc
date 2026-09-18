'use client';

import React from "react";

import VisionSection from "./VisionSection";  
import QuranAcademy from "./QuranAcademy";
import StatsSection from "./StatsSection"; 
import WhyChooseUs from "./WhyChooseUs";
import PageFaq from '@/components/seo/PageFaq';
import { ABOUT_FAQS } from '@/lib/faqs';

function About() {
  return (
    <>
    <VisionSection /> 
    <WhyChooseUs/>
    <QuranAcademy/>
    <StatsSection/>
    <PageFaq
      title="About Easy Quran Class"
      subtitle="Easy Quran Class is an online Quran academy for kids and adults who want to learn Quran, Tajweed, Tafsir, and namaz with qualified teachers."
      faqs={ABOUT_FAQS}
    />
    </>
  );
}

export default About;