import { RustChapter2 } from "@/app/components/blog";
import { BoltIcon, ArrowTrendingUpIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/outline'

export function SiteLanding() {
    return(
        <div className='h-full w-full bg-gray-500 p-2'>
            <div className='grid grid-cols-1 gap-1 justify-center items-start lg:grid-cols-6 lg:grid-rows-12'>
                <About/>
                <BlogSection/>
                <Topic/>
                <StravaFeed/>
                <SocialMedia/>
                <ProjectShowcase/>
                <RecentYoutube/>
            </div>
        </div>
    )
}

export function BlogSection() {
    return(
        <div className='flex col-span-4 row-span-2 w-full h-full bg-base-100 rounded-md p-2'>
            <h1>Blog Posts</h1>

            <h1>Travel</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            
            <h1>Programing</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://imgk.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            
            <h1>Outdoor</h1>
            <div className="carousel w-full">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide4" className="btn btn-circle">❮</a> 
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide2" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a> 
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide3" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a> 
                        <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                </div> 
                <div id="slide4" className="carousel-item relative w-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.jpg" className="w-full" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a> 
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function BlogRecent() {
    return(
    <h1>personal landing</h1>
    )
}

export function RecentYoutube(){
    return(
        <div className='col-span-3 row-span-3 h-full w-full flex flex-col justify-start items-start bg-base-200 rounded-md'>
            <h1 className='font-mori text-6xl w-fill font-bold tracking-wide mb-6'>Recent Youtube</h1>
            <p>This video continues the Youtube searies of reviewing Neovim plugins. The plugin that is being looked at is comment.nvim. I have been using this for awhile and really like it!</p>
            <div className='flex justify-center items-center w-full mt-3'>
                    <iframe 
                        width="660" 
                        height="460" 
                        src="https://www.youtube.com/embed/3N2lB26FTPU?si=8k-ufvhqwOd1gcQo" 
                        title="YouTube video player" 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                        referrerPolicy="strict-origin-when-cross-origin" 
                        allowFullScreen>
                    </iframe>
            </div>
        </div>
    )
}

export function StravaFeed() {
    return(
    <div className='row-span-3 md:row-span-6 lg:row-span-4 min-[1480px]:row-span-4 h-full col-span-4 py-5 bg-base-100 rounded-md'>
            <h1 className='font-mori text-6xl w-fill font-bold tracking-wide mb-6'>Strava Feed</h1>
            <div className='flex flex-col gap-3 justify-center items-center'>
                <StravaActivityBrief/>
                <StravaActivityBrief/>
                <StravaActivityBrief/>
                <StravaActivityBrief/>
                <StravaActivityBrief/>
                <StravaActivityBrief/>
            </div>
        </div>
    )
}

export function StravaActivityBrief() {
    return(
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 min-[1480px]:grid-cols-4 bg-base-300">

            <div className="stat place-items-center">
                <div className="stat-title">Activity</div>
                <div className="stat-value text-secondary">
                    <BoltIcon className='h-8 w-8'/>
                </div>
                <div className="stat-desc">Jan 1st</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <ArrowPathIcon className='h-8 w-8'/>
                </div>
                <div className="stat-title">Distance</div>
                <div className="stat-value">31K</div>
            </div>

                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <ClockIcon className='h-8 w-8'/>
                    </div>
                    <div className="stat-title">Total Time</div>
                    <div className="stat-value">4,200</div>
                </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <ArrowTrendingUpIcon className='h-8 w-8'/>
                </div>
                <div className="stat-title">Elevation Gain</div>
                <div className="stat-value">1,200</div>
            </div>

        </div>
    )
}


export function ProjectShowcase() {
    return(
        <div className='col-span-3 row-span-2 bg-base-100 rounded-md'>
            <h1 className='font-mori text-6xl w-fill font-bold tracking-wide mb-6'>Recent Project</h1>
            <p>I am learingin rust. In the process I am adding all of the projects to this websit. The below game is chapter 2 from the book. It is actuall rust code! Pretty cool right?</p>
            <RustChapter2/>
        </div>
    )
}

export function BlogFeature() {
    return(
        <div>
            <h1>Featured Artical</h1>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        Shoes!
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline">Fashion</div> 
                        <div className="badge badge-outline">Products</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function SocialMedia() {
    return(
        <div className='flex flex-col col-span-2 row-span-1 w-full h-full px-2 py-1 bg-base-100 rounded-md'>
            <h1 className='font-mori text-2xl'>Social Media</h1>
            <div className="divider mt-0"></div>
            <div className='flex justify-between items-center gap-6'>
                {/* Github */}
                <span className="[&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-48 [&>svg]:max-w-48">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 496 512">
                        <path
                            d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
                    </svg>
                </span>
                {/* Instagram */}
                <span className="[&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-48 [&>svg]:max-w-48">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512">
                        <path
                            d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                    </svg>
                </span>

                {/* Linkedin */}
                <span className="[&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-48 [&>svg]:max-w-48">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 448 512">
                        <path
                            d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                    </svg>
                </span>

                {/* Youtube */}
                <span className="[&>svg]:h-full [&>svg]:w-full [&>svg]:max-h-48 [&>svg]:max-w-48">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 576 512">
                        <path
                            d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" />
                    </svg>
                </span>
            </div>
        </div>
    )
}

export function About() {
    return(
        <div className='flex flex-col col-span-2 row-span-2 w-full h-full bg-base-100 rounded-md'>
           
            <div className='flex justify-start items-end gap-4 p-2'>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <h1 className='font-mori text-6xl font-bold tracking-wide'>Wired Woodsman</h1>
            </div>
            <div className="divider mt-0"></div>
            <p className='font-neue text-6xl'>Enjoying the <span className="text-accent">outdoors</span></p> 
            <p className='font-neue text-6xl'>Building <span className="text-accent">software</span></p>
            <p className='font-neue text-6xl text-accent'>Alaska</p>
            <br/>
        </div>
    )
}

export function Topic() {
    return(
        <div className="bg-base-100 w-fill h-full col-span-2 row-span-3 rounded-md">
            <h1 className='font-mori text-6xl font-bold tracking-wide'>Navagation</h1>
            <ul className="menu bg-base-100 w-56 rounded-box">
                <li><a>Item 1</a></li>
                <li>
                    <details open>
                        <summary>Parent</summary>
                        <ul>
                            <li><a>Submenu 1</a></li>
                            <li><a>Submenu 2</a></li>
                            <li>
                                <details open>
                                    <summary>Parent</summary>
                                    <ul>
                                        <li><a>Submenu 1</a></li>
                                        <li><a>Submenu 2</a></li>
                                    </ul>
                                </details>
                            </li>
                        </ul>
                    </details>
                </li>
                <li><a>Item 3</a></li>
            </ul>
        </div>
    )
}
