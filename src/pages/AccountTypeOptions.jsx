import AccountTypeCard from "../components/forms/AccountTypeCard"
import {MdFastfood} from 'react-icons/md'
import {RiMotorbikeFill} from 'react-icons/ri'
import {VscOrganization} from 'react-icons/vsc'

const AccountTypeOptions = () => {
    
  return (
    <div>
        <h3 className="text-4xl font-bold mb-10 text-gray-600 ">Choose your account type</h3>
      <div className="flex flex-row">
        <AccountTypeCard type={"Restaurant"}>
            <MdFastfood className='w-full h-40 mt-4 text-amber-500'/>
        </AccountTypeCard>
        <AccountTypeCard type={"Delivery Partner"}>
            <RiMotorbikeFill className='w-full h-40 mt-4 text-gray-500'/>
        </AccountTypeCard>
        <AccountTypeCard type={"Organization"}>
            <VscOrganization className='w-full h-40 mt-4 text-green-800'/>
        </AccountTypeCard>
      </div>
    </div>
  )
}

export default AccountTypeOptions
