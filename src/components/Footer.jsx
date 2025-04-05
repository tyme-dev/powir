import openExternalLink from './utils/openExternalLink'

function Footer() {
  return (
    <div className='custom-border border-top'>
      <div className='mt-2 flex'>
        <div></div>
        <div>
          <button
            className='clean-button'
            onClick={() => openExternalLink('https://icons8.com/')}
          >
            Many thanks to Icons8 for all of the lovely icons
          </button>
        </div>
      </div>
    </div>
  )
}

export default Footer
