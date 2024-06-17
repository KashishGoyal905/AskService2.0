import { Form, Link } from "react-router-dom";
import { useContext } from "react";
import authContext from '../context/AuthContext';

export default function JobApply() {
    const { isAuthenticated, user } = useContext(authContext);

    return (
        <>
            <div className='mt-5'>
                <h1 className='text-center text-2xl md:text-3xl md:text-bold my-5'>Apply for job</h1>
                <hr />
            </div>
            <div className="max-w-4xl mx-auto p-4 md:py-10">
                <Form method="post" action='/apply' className="space-y-8" encType="multipart/form-data">
                    <div className="bg-white shadow-md rounded-lg p-8">
                        <h2 className="text-xl md:text-2xl font-bold mb-4 text-center">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Full name<span className="required-asterisk">*</span></label>
                                <input type="text" name="fullname" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Mobile Number<span className="required-asterisk">*</span></label>
                                {/* minLength & maxLength works only on type texts and password | therefore i have to use regular expressions here */}
                                <input type="text" name="mobilenumber" required minLength={10} maxLength={10} pattern="\d{10}" title="It must contains exactly 10 digits" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Email address<span className="required-asterisk">*</span></label>
                                {user
                                    ? <>
                                        <input type="email" name="email" disabled value={user.email} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                                        <input type="hidden" name="email" value={user.email} />
                                    </>
                                    : <input type="email" name="email" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />}
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Applying for<span className="required-asterisk">*</span></label>
                                <select name="jobRole" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm uppercase">
                                    <option className="text-xs md:text-sm">maid</option>
                                    <option className="text-xs md:text-sm">cook</option>
                                    <option className="text-xs md:text-sm">cleaner</option>
                                    <option className="text-xs md:text-sm">babycaretaker</option>
                                    <option className="text-xs md:text-sm">driver</option>
                                    <option className="text-xs md:text-sm">perosnalworker</option>
                                </select>
                                {/* <p className="text-sm text-gray-500 m-0">Select a Job Profile</p> */}
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">Street address</label>
                                <input type="text" name="address" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">City<span className="required-asterisk">*</span></label>
                                <input type="text" name="city" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">State / Province</label>
                                <input type="text" name="state" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
                                <input type="text" name="postalcode" minLength={6} maxLength={6} pattern="\d{6}" title="It must contain exactly 6 digits" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700">Profile Picture<span className="required-asterisk">*</span></label>
                                <input type="file" name="avatar" accept=".jpg,.png,.jpeg" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700">About<span className="required-asterisk">*</span></label>
                                <textarea name="about" required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" rows="3" placeholder="Write a few words about yourself."></textarea>
                                <p className="text-sm text-gray-500">This will help people to know about you.</p>

                            </div>

                        </div>
                    </div>
                    <div className="md:mt-6 mb-4 flex justify-center md:justify-end">
                        {isAuthenticated
                            ? <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create</button>
                            : <Link to='/login' className="btn btn-primary">Login to create</Link>}
                    </div>
                </Form>
            </div>
        </>
    )
}
