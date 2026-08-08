import { useEffect, useRef, useState } from 'react';

const API_BASE_URL = 'http://localhost:3000';

const Manager = () => {
    const ref = useRef();
    const [passwordArray, setpasswordArray] = useState([]);
    const passwordRef = useRef()



    const [form, setform] = useState({
        site: "",
        username: "",
        password: ""
    });

    useEffect(() => {
        const fetchPasswords = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/`);
                if (!response.ok) {
                    throw new Error('Failed to load passwords');
                }

                const passwords = await response.json();
                setpasswordArray(passwords);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPasswords();
    }, []);


    const showPassword = () => {
        // alert("This feature is not implemented yet. Please check back later.");
        passwordRef.current.type = "text";
        if (ref.current.src.includes("closed-eyes.png")) {
            ref.current.src = "https://cdn-icons-png.flaticon.com/512/159/159604.png";
        } else {
            ref.current.src = "/closed-eyes.png";
        }
    }

    const savePassword = async () => {
        try {
            const passwordPayload = {
                id: crypto.randomUUID(),
                ...form,
            };

            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(passwordPayload),
            });

            if (!response.ok) {
                throw new Error('Failed to save password');
            }

            const data = await response.json();
            setpasswordArray((currentPasswords) => [...currentPasswords, data.result]);
            setform({ site: '', username: '', password: '' });
        } catch (error) {
            console.error(error);
        }
    }

    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }




    return (
        <>
            <div className="absolute inset-0 -z-10 min-h-screen w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#63e_100%)]"></div>
            <div className="mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-8 lg:px-12">
                <h1 className='text-2xl font-bold text-center'>
                    <span className='text-green-700'>&lt;</span>
                    Pass
                    <span className='text-green-700'>Guard/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your Own Password Manager</p>

                <div className='flex w-full flex-col gap-6 p-4 text-white sm:gap-8'>
                    <input value={form.site} onChange={handleChange} placeholder='Enter Your Website URL' type="text" name='site' id='' className='rounded-full border border-green-500 w-full text-black p-4 py-1' />

                    <div className="flex w-full flex-col gap-4 md:flex-row md:gap-8">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Your Username' type="text" name='username' id='' className='rounded-full border border-green-500 w-full text-black p-4 py-1 md:w-1/2' />

                        <div className="relative w-full md:w-1/2">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Your Password' type="password" name='password' id='' className='rounded-full border border-green-500 w-full text-black p-4 py-1' />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 transform cursor-pointer text-gray-500" onClick={showPassword}>
                                <img ref={ref} className='p-1 cursor-pointer' width="25" src="https://cdn-icons-png.flaticon.com/512/159/159604.png" alt="" />
                            </span>
                        </div>


                    </div>
                    <div className='flex justify-center w-full'>
                        <button onClick={savePassword} className='flex w-full items-center justify-center gap-2 rounded-full bg-green-500 py-2 font-bold text-white hover:bg-green-600 sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <lord-icon
                                src="https://cdn.lordicon.com/vjgknpfx.json"
                                trigger="hover"
                                colors="primary:#2516c7,secondary:#000000">
                            </lord-icon>
                            Add
                        </button>
                    </div>
                </div>
                <div className="password px-4 pb-6">
                    <h2 className='text-lg font-semibold text-black'>Your Passwords</h2>
                    {passwordArray.length === 0 && <p className='text-center text-green-900'>No Passwords Found</p>}
                   
                    {passwordArray.length != 0 && <div className='mt-3 w-full overflow-x-auto rounded-md border border-green-500'><table className="min-w-160 table-auto w-full overflow-hidden">
                        <thead className='bg-green-500 text-white' >
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                <td className='w-32 px-2 py-2 text-center'><a className='break-all' href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a></td>
                                <td className='w-32 px-2 py-2 text-center break-all'>{item.username}</td>
                                <td className='w-32 px-2 py-2 text-center break-all'>{item.password}</td>
                            </tr>
                             })}
                           
                        </tbody>
                    </table></div>}
                </div>
            </div>
            
        </>
    )
}

export default Manager
