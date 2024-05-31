// actions.js
import { redirect } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function applyJobAction({ request }) {
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

    //* if i want to show error below respective fields i have to use state, therefore i have to move this code inside a function on that component page only with the help of formdata.

    // Extracting data of the form with the help of formData
    const formData = await request.formData();
    console.log('FormData entries:', [...formData.entries()]);
    // extracting token || to only proceed with if the req if the user is authenticated
    const token = localStorage.getItem('token');

    try {
        // Sending a req to tha backend with form data.
        const response = await fetch('http://localhost:8080/applyjob', {
            method: 'POST',
            body: formData, // FormData automatically sets the correct headers
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        const resData = await response.json();
        const role = resData.job.jobRole;

        if (!response.ok) {
            console.log('Failed to submit job application')
            throw new Error(resData.message || 'Failed to submit job application');
        }

        // looging the data for development mode
        console.log('Job: ', resData.job);
        // Toast Message
        toast.success(resData.message);
        // Redirect or handle success
        return redirect(`/hire/${role}`);
    } catch (err) {
        toast.error(err.message);
        console.error('Error in creating a job:', err.message, err);
    }
}


export async function signUpAction({ request }) {
    const formData = await request.formData();
    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    };
    console.log('user Application:', user);

    // Example of sending data to the backend
    const response = await fetch('http://localhost:8080/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    // It works, to make it work you have to add a middleware (fileupload.none() )in the route on the backend
    // const formData = await request.formData();

    // console.log('FormData entries:', [...formData.entries()]);

    // // Note: No need to manually create an object; you can use FormData directly
    // const response = await fetch('http://localhost:8080/register', {
    //     method: 'POST',
    //     body: formData, // FormData automatically sets the correct headers
    // });

    if (!response.ok) {
        console.log('Failed to SignUp');
        throw new Error('Failed to SignUp');
    }

    // toast message
    toast.success('Signed Up Successfully');
    // Redirect or handle success
    return redirect(`/login`); // or { redirect: '/some-path' }
}

export async function loginAction({ request }) {
    const formData = await request.formData();
    const user = {
        email: formData.get('email'),
        password: formData.get('password'),
    };
    console.log('user Application:', user);

    // Example of sending data to the backend
    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        console.log('Failed to login');
        throw new Error('Failed to login');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log(data.message);

    // Redirect or handle success
    return redirect(`/`); // or { redirect: '/some-path' }
}