// actions.js
import { redirect } from "react-router-dom";

export async function applyJobAction({ request, navigate }) {
    // const formData = await request.formData();
    // const jobApplication = {
    //     fullname: formData.get('fullname'),
    //     mobilenumber: formData.get('mobilenumber'),
    //     email: formData.get('email'),
    //     jobRole: formData.get('jobRole'),
    //     address: formData.get('address'),
    //     city: formData.get('city'),
    //     state: formData.get('state'),
    //     postalcode: formData.get('postalcode'),
    //     about: formData.get('about'),
    //     // Add other form fields as needed
    // };
    // console.log('Job Application:', jobApplication);

    // // Example of sending data to the backend
    // const response = await fetch('http://localhost:8080/applyjob', {
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(jobApplication),
    // });

    const formData = await request.formData();

    console.log('FormData entries:', [...formData.entries()]);

    // Note: No need to manually create an object; you can use FormData directly
    const response = await fetch('http://localhost:8080/applyjob', {
        method: 'POST',
        body: formData, // FormData automatically sets the correct headers
    });

    const resData = await response.json();
    const role = resData.job.jobRole;

    if (!response.ok) {
        throw new Error('Failed to submit job application');
    }

    // Redirect or handle success
    return redirect(`/hire/${role}`); // or { redirect: '/some-path' }
}
