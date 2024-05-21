import { Form } from "react-router-dom";

export default function JobApply() {
    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Apply for job</h1>
                <hr />
            </div>
            <div className="max-w-4xl mx-auto py-10">
                <Form method="post" action='/apply' className="space-y-8">
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
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Photo</label>
                                <div className="mt-1 flex items-center">
                                    <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                                        <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M24 0v24H0V0h24z" fill="none" />
                                            <path d="M12 2a10 10 0 00-10 10 10 10 0 0010 10 10 10 0 0010-10A10 10 0 0012 2zm0 3a3 3 0 110 6 3 3 0 010-6zm0 14c-3.31 0-6.07-1.64-7.75-4.25.03-2.5 5-3.75 7.75-3.75s7.72 1.25 7.75 3.75C18.07 17.36 15.31 19 12 19z" />
                                        </svg>
                                    </span>
                                    <button type="button" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Change
                                    </button>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About</label>
                                <textarea name="about" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Write a few sentences about yourself."></textarea>
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                    </div>
                </Form>
            </div>
        </>
    )
}
