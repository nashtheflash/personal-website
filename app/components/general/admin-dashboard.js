import hokuasiWordLogo from '@/public/hokusai-nashborwns-logo.png'

const menuItems = [
    {name: 'Blog', href: '/blog'},
]

export function AdminDashboard() {

    return(
        <div className="flex flex-col justify-start items-center gap-5 pb-10 w-full h-fit min-h-screen bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <h2 className='text-center font-mono'>Widgets</h2>
            <AddTenant/>
            <AddUser/>
        </div>

    )
}

function AddTenant() {

    return(
        <div className="card w-96 bg-base-300 card-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Add New Tennant</h2>
                <fieldset className="fieldset">

                    <label className="label">Tenant Name</label>
                    <input type="text" className="input" placeholder="New Brand" />

                </fieldset>
                <div className="justify-end card-actions">
                    <button className="btn btn-primary">Add Tenant</button>
                </div>
            </div>
        </div>
    )
}

function AddUser() {

    return(
            <div className="card w-96 bg-base-100 card-xl shadow-sm">
                <div className="card-body">
                    <h2 className="card-title">Add New User</h2>
                <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">

                    <label className="label">Tenant</label>
                    <select defaultValue="Pick a color" className="select">
                        <option disabled={true}>Select Tennant</option>
                        <option>Nash Browns</option>
                        <option>Tune Outdoor</option>
                    </select>

                    <label className="label">First Name</label>
                    <input type="firstname" className="input" placeholder="Semore" />

                    <label className="label">Last Name</label>
                    <input type="lastname" className="input" placeholder="Butts" />

                    <label className="label">Email</label>
                    <input type="email" className="input" placeholder="cMOREbutts@now.com" />
                </fieldset>
                    <div className="justify-end card-actions">
                        <button className="btn btn-primary">Invite User</button>
                    </div>
                </div>
            </div>
    )
}
