import { Hero } from '@/components/landing/Hero';
import { PopularCategories } from '@/components/landing/PopularCategories';
import { HowItWorks } from '@/components/landing/HowItWorks';
import { Features } from '@/components/landing/Features';
import { Statistics } from '@/components/landing/Statistics';
import { Testimonials } from '@/components/landing/Testimonials';
import { FAQ } from '@/components/landing/FAQ';
import { DownloadApp } from '@/components/landing/DownloadApp';
import { CallToAction } from '@/components/landing/CallToAction';

export default function Landing() {
  return (
    <>
      <Hero />
      <PopularCategories />
      <HowItWorks />
      <Statistics />
      <Features />
      <Testimonials />
      <FAQ />
      <DownloadApp />
      <CallToAction />
    </>
  );
}