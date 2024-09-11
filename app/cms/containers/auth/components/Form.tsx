import { Link } from 'react-router-dom'

const Form = () => {
    return (
        <div className="md:w-1/2 bg-white md:flex md:justify-center md:items-center min-h-screen pt-60 w-full md:pt-0">
            <div className="max-w-sm w-full px-6 py-8">
                <h2 className="text-center font-semibold text-2xl mb-4 uppercase">
                    sign up
                </h2>
                <form>
                    <div className="mb-2">
                        <label
                            htmlFor="Email"
                            className="block mb-2 text-sm font-medium text-gray-900"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Email"
                            required
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none w-full mt-4"
                    >
                        Login
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p>
                        Already have an account?
                        <Link to="/portal/register">
                            <span className="text-blue-500 cursor-pointer ml-2">
                                Sign In
                            </span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Form
