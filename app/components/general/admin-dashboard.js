import { addUser, addContentDocument, sendEmail } from '@/lib/server-actions/firebase/firestore'
import { useForm } from "react-hook-form"

import hokuasiWordLogo from '@/public/hokusai-nashborwns-logo.png'

export function AdminDashboard() {

    return(
        <div className="flex flex-col justify-start items-center gap-5 pb-10 w-full h-fit min-h-screen bg-[url('/textures/noise-yellow-1.png')] bg-repeat bg-[length:50px]">
            <h2 className='text-center font-mono'>Widgets</h2>
            <AddContent/>
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

    const newUser = () => {
        const userData = { firstName: 'test', lastName: 'name', email: 'test@nashbrowns.com', tenant: 0};

        addUser(userData)

    }

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
                    <button 
                        onClick={newUser}
                        className="btn btn-primary"
                    >Invite User
                    </button>
                </div>
            </div>
        </div>
    )
}

function AddContent() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const onSubmit = async (data) => {
        try {
            const contentData = { 
                contentId: data.contentId,
                title: data.title,
                format: data.format,
                comments: parseInt(data.comments) || 0,
                last_updated: new Date(),
                likes: parseInt(data.likes) || 0,
                platform: data.platform,
                platform_id: data.platform_id,
                published_at: data.published_at,
                sponsored: data.sponsored === 'true',
                tenant: data.tenant ? [parseInt(data.tenant)] : [],
                type: data.type,
                views: parseInt(data.views) || 0,
            };

            await addContentDocument(contentData);
            reset(); // Clear form after successful submission
            console.log('Content added successfully');
        } catch (error) {
            console.error('Error adding content:', error);
        }
    }

    return(
        <div className="card w-96 bg-base-300 card-xl shadow-sm">
            <div className="card-body">
                <h2 className="card-title">Add Content</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">

                        <label className="label">Content ID</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="/blog/articles/test"
                            {...register("contentId", { required: "Content ID is required" })}
                        />
                        {errors.contentId && <span className="text-error text-sm">{errors.contentId.message}</span>}

                        <label className="label">Title</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="Content Title"
                            {...register("title", { required: "Title is required" })}
                        />
                        {errors.title && <span className="text-error text-sm">{errors.title.message}</span>}

                        <label className="label">Format</label>
                        <select 
                            className="select select-bordered w-full"
                            {...register("format", { required: "Format is required" })}
                        >
                            <option value="">Select Format</option>
                            <option value="article">Article</option>
                            <option value="short_form">Short Form Video</option>
                            <option value="long">Long Form Video</option>
                        </select>
                        {errors.format && <span className="text-error text-sm">{errors.format.message}</span>}

                        <label className="label">Platform</label>
                        <select 
                            className="select select-bordered w-full"
                            {...register("platform", { required: "Platform is required" })}
                        >
                            <option value="">Select Platform</option>
                            <option value="nashbrowns">Nash Browns</option>
                            <option value="youtube">YouTube</option>
                            <option value="tiktok">TikTok</option>
                        </select>
                        {errors.platform && <span className="text-error text-sm">{errors.platform.message}</span>}

                        <label className="label">Platform ID</label>
                        <input 
                            type="text" 
                            className="input" 
                            placeholder="youtube-video-id"
                            {...register("platform_id", { required: "Platform ID is required" })}
                        />
                        {errors.platform_id && <span className="text-error text-sm">{errors.platform_id.message}</span>}

                        <label className="label">Tenant</label>
                        <select 
                            className="select select-bordered w-full"
                            {...register("tenant")}
                        >
                            <option value="">Select Tenant</option>
                            <option value="0">Nash Browns</option>
                            <option value="1">Tune Outdoor</option>
                        </select>

                        <label className="label">Type</label>
                        <select 
                            className="select select-bordered w-full"
                            {...register("type", { required: "Type is required" })}
                        >
                            <option value="">Select Type</option>
                            <option value="blog">Blog</option>
                            <option value="video">video</option>
                        </select>
                        {errors.type && <span className="text-error text-sm">{errors.type.message}</span>}
                        <label className="label">Published At</label>
                        <input 
                            type="datetime-local" 
                            className="input"
                            {...register("published_at", { required: "Published date is required" })}
                        />
                        {errors.published_at && <span className="text-error text-sm">{errors.published_at.message}</span>}

                        <label className="label">Sponsored</label>
                        <select 
                            className="select select-bordered w-full"
                            {...register("sponsored")}
                        >
                            <option value="false">No</option>
                            <option value="true">Yes</option>
                        </select>

                        <label className="label">Initial Views</label>
                        <input 
                            type="number" 
                            className="input" 
                            placeholder="0"
                            {...register("views", { min: 0 })}
                        />

                        <label className="label">Initial Likes</label>
                        <input 
                            type="number" 
                            className="input" 
                            placeholder="0"
                            {...register("likes", { min: 0 })}
                        />

                        <label className="label">Initial Comments</label>
                        <input 
                            type="number" 
                            className="input" 
                            placeholder="0"
                            {...register("comments", { min: 0 })}
                        />



                    </fieldset>
                    <div className="justify-end card-actions">
                        <button 
                            type="submit"
                            className="btn btn-primary"
                        >
                            Add Content
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
