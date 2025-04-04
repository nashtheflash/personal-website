"use client";

import { 
    HeaderSection,
    StatsSection,
    StorySection,
    MtnBikePhotoGallery,
    MtnBikeMap,
    TrailDescription,
    FAQSection,
} from "../";

export function Area({data}) {
    
    const { 
        name, 
        rank, 
        featuredImage, 
        stats, 
        mapStartingLat,
        mapStartingLon,
        mapZoom,
        gpxTracks, 
        photos, 
        accessInfo, 
        faqHighlights, 
        faqFoodDrink
    } = data;
    
    return(
        <div className="w-full h-full min-h-screen bg-[#f2f1ed]">
            <HeaderSection name={name} featuredImage={featuredImage}/>
            <StatsSection stats={stats}/>
            <StorySection name={name}/>
            <MtnBikeMap data={data} />
            <MtnBikePhotoGallery photos={photos}/>
            {/* <TrailDescription data={data}/> */}
            <FAQSection accessInfo={accessInfo} faqHighlights={faqHighlights} faqFoodDrink={faqFoodDrink} />
        </div>
    )
}
