export async function TopicLanding({topics}) {
    return(
        <div className='h-full w-full'>
            <div className='grid grid-cols-6 w-full gap-2'>
                {
                        topics.map((Topics) => (
                            <div className="w-full h-full col-span-3">
                                { Topics }
                            </div>
                        ))
                }
            </div>
        </div>
    )
}
