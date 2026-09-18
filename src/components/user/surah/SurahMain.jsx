'use client';

import React, { Suspense } from 'react' 
import SurahList from './SurahList'  

 
function SurahMain() {
  return (
    <Suspense fallback={null}>
      <SurahList />
    </Suspense>
  )
}

export default SurahMain
