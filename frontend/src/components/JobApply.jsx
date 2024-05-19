import { Form } from "react-router-dom";

export default function JobApply() {
    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-3xl text-bold my-5'>Apply for job</h1>
                <hr />
            </div>
            <div className="max-w-4xl mx-auto py-10">
                <Form method="post" className="space-y-8">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
                        <p className="text-sm text-gray-500 mb-4">This information will be displayed publicly so be careful what you share.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Website</label>
                                <input type="text" name="website" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" placeholder="http://www.example.com" />
                            </div>

                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About</label>
                                <textarea name="about" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Write a few sentences about yourself."></textarea>
                            </div>

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

                            <div className="col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Cover photo</label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H22V16H16V22H28V8ZM22 22V40H34V30H36V36C36 37.1 35.1 38 34 38H22V22H22ZM16 6C15.45 6 15 6.45 15 7V21C15 21.55 15.45 22 16 22H30V20H18V7H16V6H16ZM10 22C9.45 22 9 22.45 9 23V41C9 41.55 9.45 42 10 42H34C34.55 42 35 41.55 35 41V39H18V23H10V22H10ZM32 6H30V2H18V6H16V8H32V6ZM26 6V4H22V6H26Z" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-2xl font-semibold mb-4">Personal Information</h2>
                        <p className="text-sm text-gray-500 mb-4">Use a permanent address where you can receive mail.</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">First name</label>
                                <input type="text" name="first-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Last name</label>
                                <input type="text" name="last-name" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email address</label>
                                <input type="email" name="email" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Country</label>
                                <select name="country" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                                    <option>United States</option>
                                    {/* Add more options as needed */}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Street address</label>
                                <input type="text" name="street-address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
                                <input type="text" name="postal-code" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        <button type="button" className="ml-4 bg-white text-gray-700 py-2 px-4 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Cancel</button>
                    </div>
                </Form>
            </div>
        </>
    )
}
