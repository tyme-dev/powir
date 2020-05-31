import React from "react";

function AboutWindow() {
    let features = [
        {
            'text': 'Provides you with a simple and clean UI to list your battery and system information.',
            'icon': 'https://img.icons8.com/doodle/48/000000/picture.png'
        },{
            'text': 'Shows you the change in battery capacity since the OS was installed.',
            'icon': 'https://img.icons8.com/doodle/48/000000/high-battery.png'
        },{
            'text': 'Analyzes the current and overall estimated battery life of your system.',
            'icon': 'https://img.icons8.com/doodle/48/000000/hourglass--v1.png'
        },{
            'text': 'Computes various statistics to give a better understanding of your power usage.',
            'icon': 'https://img.icons8.com/doodle/48/000000/statistics--v1.png'
        },{
            'text': 'Ability to export all of the data via various formats: PDF (app), JSON (processed), HTML (original report).',
            'icon': 'https://img.icons8.com/doodle/48/000000/rescan-document.png'
        },{
            'text': '100% free and completely open-source for absolute transparency.',
            'icon': 'https://img.icons8.com/doodle/48/000000/console--v2.png'
        },{
            'text': 'Completely portable app with no installation required, ready to use out of the box.',
            'icon': 'https://img.icons8.com/doodle/48/000000/audio-cable.png'
        }
    ]
    let reasons = [
        {
            'text': 'Complete lack of any such power/battery monitoring analyzing tool available in the market.',
            'icon': 'https://img.icons8.com/doodle/48/000000/error.png'
        },{
            'text': 'Obscure documentation over how to find battery statuses on the Internet.',
            'icon': 'https://img.icons8.com/doodle/48/000000/delete-sign.png'
        },{
            'text': 'Required to use terminal in order to run a command showing information about the system.',
            'icon': 'https://img.icons8.com/doodle/48/000000/iphone-spinner.png'
        },{
            'text': 'Devoid of any simple and understandable metrics from the underlying API or report.',
            'icon': 'https://img.icons8.com/doodle/48/000000/api.png'
        },
    ]
    return (
        <div>
            <div className="flex flex-wrap border-bottom mt-3 pb-3">
                <div className="w-full">
                    <div className="flex flex-wrap pb-2 border-bottom">
                        <div className="w-full lg:w-1/2">
                            <div>
                                <div className="flex">
                                    <img className="no-border mr-2" src="https://img.icons8.com/doodle/48/000000/windows-client.png"/>
                                    <h3>What is Powir?</h3>
                                </div>
                                <div className="p-3">
                                    <p>Powir is a Windows 10 based tool to monitor and analyze your system's power and battery usage.</p>
                                    <p className='mt-1'>It provides you with various information and statistics about the current and
                                        overall history of the power and battery usage of your system.</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div>
                                <div className="flex">
                                    <img className="no-border mr-2" src="https://img.icons8.com/doodle/48/000000/so-so.png"/>
                                    <h3>Who build it?</h3>
                                </div>
                                <div className="p-3">
                                    <p>Hey there! I'm <a href="#">Ujjwal</a> who goes around with the name Slapbot in open source communities,
                                        You'd often find me blabbering my completely biased opinions in /r/soccer or busy building new things.</p>
                                    <p className='mt-1'>I'm most accessible via Twitter and tend to update about whatever I'm working there, so feel free to follow or
                                        send a dm there. :) </p>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="flex flex-wrap pt-2 border-bottom">
                        <div className="w-full lg:w-1/2">
                            <div className="">
                                <div className="flex flex-wrap">
                                    <img className="no-border mr-2" src="https://img.icons8.com/doodle/48/000000/used-product.png"/>
                                    <h3>What it does?</h3>
                                </div>
                                <div className="p-1 mt-2">
                                    <ol>
                                        {features.map(item => {
                                            return <li className="mb-1 flex">
                                                <div className='content-center'>
                                                    <img className="no-border mr-1" src={item.icon}/>
                                                    <p>{item.text}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="">
                                <div className="flex">
                                    <img className="no-border mr-2" src="https://img.icons8.com/doodle/48/000000/hammer--v1.png"/>
                                    <h3>Why build it?</h3>
                                </div>
                                <div className="p-1 mt-2">
                                    <ol>
                                        {reasons.map(item => {
                                            return <li className="mb-1 flex">
                                                <div className='content-center'>
                                                    <img className="no-border mr-1" src={item.icon}/>
                                                    <p>{item.text}</p>
                                                </div>
                                            </li>
                                        })}
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full">
                    <div className='mt-2'>
                        <div className='flex mb-4'>
                            <img className="no-border mr-2" src="https://img.icons8.com/doodle/48/000000/help.png"/>
                            <h3>FAQs</h3>
                        </div>
                        <div className='mt-3'>
                            <h4>Is it completely free?</h4>
                            <p className='mt-1'>Yes, Powir is 100% free to download and use.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>Are the numbers displayed 100% correct?</h4>
                            <p className='mt-1'>Depends, Powir parses the raw reports generated from Windows and
                            does the computations of the various statistics and render the charts.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>What tooling was used to build the app?</h4>
                            <p className='mt-1'>Powir runs as an electron app (chromium web engine embedded) while using
                            React to facilitate the UI and data workflow.</p>
                        </div>
                        <div className='mt-3'>
                            <h4>Does it share my data anywhere?</h4>
                            <p className='mt-1'>No, Powir will never share your data anywhere outside your local system,
                            the entire source code of the app is online for anyone to check. Infact, it never makes any
                            request to a server since there is none. Its simply a client sided app.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutWindow
