import RecentBlog from '@/components/recentBlog';
import FeaturesSection from '@/components/featuersGrid';
import HeroSection from '@/components/heroSlider';
import Intro from '@/components/intro';
import WhatWeOffer from '@/components/offer';
import Trainers from '@/components/trainers';
import CoursesWithFeedback from '@/components/testimonial';
import FAQSection from '@/components/faqSection';
import CoursesAvailableSection from '@/components/CoursesAvailableSection';
  
export default function HomePage() {
  return (
    <>
      <HeroSection/>
      <FeaturesSection/>
      <WhatWeOffer/>
      <FAQSection/>
      <Intro/>
      <CoursesAvailableSection/>
      <Trainers isMargin={false}/>
      <RecentBlog/>
      <CoursesWithFeedback/>
    </>
  );
}