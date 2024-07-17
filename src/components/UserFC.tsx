import { FC, useState } from 'react'
import { IUser } from './UserList'
import { useDispatch } from 'react-redux';

interface IProps {
    user: IUser
}

const UserFC: FC<IProps> = ( user ) => {
    const[isEdit, setIsEdit] = useState<boolean>(false);
    const[userName, setUserName] = useState<string>("");
    const[companyName, setCompanyName] = useState<string>("");
    const[phone, setPhone] = useState<string>("");

    const dispatch = useDispatch();
    
  return (
    <div>
      UserFC
    </div>
  )
}

export default UserFC
