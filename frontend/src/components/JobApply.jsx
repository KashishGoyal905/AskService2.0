import { Form } from "react-router-dom";

export default function JobApply() {
    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Apply for job</h1>
                <hr />
            </div>
            <div className="max-w-4xl mx-auto py-10">
                <Form method="post" action='/apply' className="space-y-8" encType="multipart/form-data">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full name</label>
                                <input type="text" name="fullname" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                                <input type="number" name="mobilenumber" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                <p className="text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Applying for</label>
                                <select name="jobRole" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option>maid</option>
                                    <option>cook</option>
                                    <option>cleaner</option>
                                    <option>babycaretaker</option>
                                    <option>driver</option>
                                    <option>perosnalworker</option>
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Street address</label>
                                <input type="text" name="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">City</label>
                                <input type="text" name="city" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">State / Province</label>
                                <input type="text" name="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                <input type="text" name="postalcode" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
                                <input type="file" name="avatar" accept=".jpg,.png,.jpeg" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About</label>
                                <textarea name="about" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Write a few words about yourself."></textarea>
                            </div>

                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
                    </div>
                </Form>
            </div>
        </>
    )
}
