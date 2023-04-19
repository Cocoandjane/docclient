import React from 'react'
import CallToAction from './CallToAction'
import Image from 'next/image'
export default function Feature() {
    return (
        <div>
            <section >
                <div className="container mx-auto">
                    {/* <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4">
                            <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
                                <span className="text-primary mb-2 block text-lg font-semibold">
                                    Welcome to
                                </span>
                                <h2
                                    className="text-dark mb-4 text-3xl font-bold sm:text-4xl md:text-[40px]"
                                >
                                    JaneWrite
                                </h2>
                                <p className="text-body-color text-base">
                                    JaneWrite is a platform for writers to share their work and
                                    connect with other writers.
                                </p>
                            </div>
                        </div>
                    </div> */}

                    <CallToAction />
                    <div className="mx-auto max-w-[510px] text-center lg:mb-20">
                        <span className="text-primary mb-2 block text-lg font-semibold">
                            App guide
                        </span>
                        <p className="text-body-color text-base">
                            JaneWrite is a platform for writers to share their work and
                            connect with other writers.
                        </p>
                    </div>

                    <div className="-mx-4 flex flex-wrap">
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/autoSave.png" alt="image-1" border="0" />
                                <h4 className="text-dark mb-3 text-xl font-semibold">
                                    Content Editing
                                </h4>
                                <p className="text-body-color">
                                    Doucument saves automatically as you type.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/share.png" alt="Group-1" border="0" />
                                <h4 className="text-dark mb-3 text-xl font-semibold">
                                    Share Documents
                                </h4>
                                <p className="text-body-color">
                                    Share to either one or multiple writers.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/theme.png" alt="Group-1" border="0" />
                                <h4 className="text-dark mb-3 text-xl font-semibold">Toggle Theme</h4>
                                <p className="text-body-color">
                                    Allow users to toggle between light and dark mode.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/shared.png" alt="Group-1" border="0" />

                                <h4 className="text-dark mb-3 text-xl font-semibold">View Docs</h4>
                                <p className="text-body-color">
                                    View all your documents and documents shared with you.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/sync.png" alt="Group-1" border="0" />
                                <h4 className="text-dark mb-3 text-xl font-semibold">
                                    Real Time Sync
                                </h4>
                                <p className="text-body-color">
                                    All changes made by you and other writers are reflected in real time.
                                </p>
                            </div>
                        </div>
                        <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                            <div
                                className="mb-8 rounded-[20px] bg-white p-10 shadow-md hover:shadow-lg md:px-7 xl:px-10"
                            >
                                <Image
                                    width={500}
                                    height={500}
                                    priority={true}
                                    src="/images/emailapi.png" alt="Group-1" border="0" />
                                <h4 className="text-dark mb-3 text-xl font-semibold">Email API</h4>
                                <p className="text-body-color">
                                    Send varification emails to users.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </div>
    )
}
