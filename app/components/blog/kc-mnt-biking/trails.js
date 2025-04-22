export function TrailDescription({data}) {
    return(
        <div className="h-32 bg-black overflow-x-auto">
            <table className="table table-xs table-pin-rows table-pin-cols">
                <thead>
                    <tr>
                        <th></th>
                        <td>Name</td>
                        <td>Direction</td>
                        <td>Description</td>
                        <td>features</td>
                        <td>Difficulty</td>
                        <td>Rateing</td>
                        <td>Action</td>
                    </tr>
                </thead>
                <tbody>
                    { 
                        data.gpxTracks && data.gpxTracks.map((trail, index) => {
                            //add must ride
                            return (
                                <tr key={index}>
                                    <th>{index}</th>
                                    <td>{trail.name}</td>
                                    <td>{trail.oneWay ? 'One Way' : 'Bidirectional'}</td>
                                    <td>{trail.description}</td>
                                    <td>{trail.features}</td>
                                    <td>{trail.difficulty}</td>
                                    <td>{trail.rating}</td>
                                    <td>Download GPX</td>
                                </tr>
                            )}
                        )}
                </tbody>
            </table>
        </div>
    )
}
