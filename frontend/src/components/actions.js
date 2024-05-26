// actions.js
import { redirect } from "react-router-dom";

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

    const data = await response.json();
    localStorage.setItem('token', data.token);


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