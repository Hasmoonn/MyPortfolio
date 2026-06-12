import React from 'react'
import { useEntryAnimation, ENTRY_PHASE } from '../hooks/useEntryAnimation'
import Preloader from './Preloader'

const EntryAnimation = ({ children }) => {
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
    <>
      {isPreloaderVisible && (
        <Preloader
          progress={progress}
          isExiting={phase === ENTRY_PHASE.EXITING}
          onExitComplete={handleExitComplete}
          exitDuration={exitDuration}
        />
      )}

      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        if (child.type?.displayName === 'Hero' || child.props?.id === 'hero') {
          return React.cloneElement(child, {
            isRevealed: isHeroRevealing,
            onRevealComplete: handleHeroRevealComplete,
            revealDuration: heroRevealDuration,
          })
        }

        return child
      })}
    </>
  )
}

export default EntryAnimation
