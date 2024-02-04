import { DownloadSection, Features, Footer, Hero, TextSection } from '@/components/sections';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <TextSection
        title="Motivation"
        content="I have created this project with the aim of providing an installer for MinGW, as I have observed that many people struggle with the setup and configuration of the MinGW environment. Often, newcomers give up at this stage due to its complexity. The purpose of this installer is to simplify the process and create a fully functional environment with the latest version of GCC and other essential packages for production."
        backgroundColor="bg-gray-100"
        textColor="text-gray-800"
      />
      <div className="mx-4 md:mx-8 lg:mx-12">
        <Features />
        <DownloadSection />
      </div>
      <div className="flex-grow"></div>
      <Footer />
    </main>
  );
}
