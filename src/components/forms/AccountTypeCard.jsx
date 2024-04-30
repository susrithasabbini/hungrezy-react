

const AccountTypeCard = ({type,children}) => {
  return (
    <div className='flex flex-col w-80 h-2/3 p-4 mr-12 rounded-md shadow-md'>
      {children}
      <h3 className='text-center text-2xl mt-4 font-semibold text-gray-500'>{type}</h3>
        <button  className="h-10 mt-6 w-full text-gray-500 border-2 border-gray-500  text-md font-semibold hover:bg-amber-500 hover:text-white transition-colors duration-300 ease-in-out hover:border-none rounded-md">
            Sign in to your account
        </button>
        <button  className="h-10 my-6 w-full text-gray-500  border-2 border-gray-500 text-md font-semibold hover:bg-green-600 hover:text-white transition-colors duration-300 ease-in-out hover:border-none rounded-md">
            Create an account
        </button>
    </div>
  )
}

export default AccountTypeCard
