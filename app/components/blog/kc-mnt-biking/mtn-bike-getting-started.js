//TODO: need to build ot the beginning state of the page
export function MtnBikeGettingStarted() {
    return(
        <div className="w-full h-full min-h-screen bg-[#f2f1ed] text-black">
            <HowToUse/>
            <Beginner/>
            <WhenToRide/>
            <Wildlife/>
            <TrailGrading/>
            <Saftey/>
            <BikeShops/>
            <Bike/>
            <Tools/>
            <RidingClub/>
        </div>
    )
}

function HowToUse() {
    return(
        <h1>How to Use this Book</h1>
    )
}

function RidingClub() {
    return(
        <h1>Wyco riding club</h1>
    )
}

function Beginner() {
    return(
        <>
            <h1>I am new to mountain biking where should I go?</h1>
            <ul>
                <li>Lexington Lake</li>
                <li>Hodge Park</li>
                <li>Cedar Niles</li>
            </ul>
        </>
    )
}

function WhenToRide() {
    return(
        <h1>What time of year is good to ride?</h1>
    )
}

function Wildlife() {
    return(
        <>
            <h1>Wildlife</h1>
            <ul>
                <li>Deer</li>
                <li>cyotes</li>
                <li>spiders</li>
                <li>snakes</li>
                <li>tickes</li>
                <li>poins ivy</li>
                <li>poins oak</li>
                <li>Oak Mites</li>
                <li>Osage orange thornes</li>
            </ul>
        </>
    )
}

function TrailGrading() {
    return(
        <h1>Grading system</h1>
    )
}

function Saftey() {
    return(
        <h1>Parts of Town good bad?</h1>
    )
}

function BikeShops() {
    return(
        <h1>Bike shops. Rental??</h1>
    )
}

function Bike() {
    return(
        <h1>What bike shoule i have</h1>
    )
}

function Tools() {
    return(
        <h1>Bike tools to keep on the bike and in the car</h1>
    )
}
