import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Preloader from '../components/Preloader'
import About from '../components/About'
import SectionTransition from '../components/SectionTransition'
import Projects from '../components/Projects'
import Education from '../components/Education'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useEntryAnimation, ENTRY_PHASE } from '../hooks/useEntryAnimation'

const Index = () => {
  const {
    phase,
    progress,
    isPreloaderVisible,
    isHeroRevealing,
    handleExitComplete,
    handleHeroRevealComplete,
    exitDuration,
    heroRevealDuration,
  } = useEntryAnimation()

  return (
    <div className="min-h-screen relative" style={{ overflowX: 'hidden' }}>
      {isPreloaderVisible && (
        <Preloader
          progress={progress}
          isExiting={phase === ENTRY_PHASE.EXITING}
          onExitComplete={handleExitComplete}
          exitDuration={exitDuration}
        />
      )}

      <Navbar />

      <main>
        <div id="home">
          <Hero
            isRevealed={isHeroRevealing}
            onRevealComplete={handleHeroRevealComplete}
            revealDuration={heroRevealDuration}
          />
        </div>

        <About />
        <SectionTransition
          fromSection="About"
          toSection="Projects"
          chapterNumber="03"
        />
        <Projects />
        <SectionTransition
          fromSection="Projects"
          toSection="Education"
          chapterNumber="04"
        />
        <Education />
        <SectionTransition
          fromSection="Education"
          toSection="Contact"
          chapterNumber="05"
        />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default Index