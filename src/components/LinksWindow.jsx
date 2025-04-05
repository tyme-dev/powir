import openExternalLink from './utils/openExternalLink'

function LinksWindow() {
  let helpLinks = [
    {
      id: 0,
      heading: 'Issues/Bugs',
      iconUrl: 'assets/images/repository.png',
      url: 'https://github.com/tyme-dev/powir/issues',
      message:
        'Looking for any help related to the product or want to report a bug? Feel free to raise an issue on Github',
    },
    {
      id: 2,
      heading: 'Feedback/Enquiry',
      iconUrl: 'assets/images/mail-contact.png',
      url: 'mailto:powir@timothy.dev',
      message: 'Old school? Write me a mail at: powir@timothy.dev',
    },
  ]

  return (
    <div>
      <div className='flex flex-wrap border-bottom mt-3 pb-3'>
        <div className='w-full'>
          <div className='border-bottom pb-2'>
            <div className='mt-2 mb-4'>
              <div className='flex'>
                <img
                  className='no-border mr-2'
                  src='assets/images/help.png'
                  alt='help'
                />
                <h3>Help</h3>
              </div>
              <div>
                <span>Looking for any kind of help?</span>
              </div>
            </div>
            {helpLinks.map((helpLink) => {
              return (
                <div key={helpLink.id}>
                  <div className='flex mt-2'>
                    <div className='content-center'>
                      <img
                        className='no-border mr-2'
                        src={helpLink.iconUrl}
                        alt={helpLink.iconUrl}
                      />
                      <h4>
                        <button
                          className='clean-button'
                          onClick={() => openExternalLink(helpLink.url)}
                        >
                          {helpLink.heading}
                        </button>
                      </h4>
                    </div>
                  </div>
                  <span className='mt-1'>{helpLink.message}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LinksWindow
