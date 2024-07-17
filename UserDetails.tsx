import { FC } from "react";
import { IUser } from "./UserList";
import { useNavigate, useParams } from "react-router-dom";
// import { NavLink } from "react-router-dom";

interface IProps extends IUser {
    changeIsDetails: (userDetails: IUser | null) => void;
}

const UserDetails: FC<IProps> = ({
  name: userName,
  company: { name: companyName },
  phone,
  email,
  address,
  website,
  changeIsDetails
}) => {
    const {street, city, geo, suite, zipcode} = address as {
        street: string;
        suite: string;
        city: string;
        zipcode: string;
        geo: {
            lat: string;
            lng: string;
        };
    }

    const { id } = useParams();
    console.log(id);
    

    const navigate = useNavigate();
  return (
    <div className="container mt-4 d-flex justify-content-center">
      <div className="card mb-3" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.1)", width: "400px" }}>
        <div className="card-body text-center">
          <h1 className="text-center mb-4">{userName}</h1>
          <p><strong>Company:</strong> {companyName}</p>
          <p><strong>Phone:</strong> {phone}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>Website:</strong> <a href={`http://${website}`} target="_blank" rel="noopener noreferrer">{website}</a></p>
          <h5 className="mt-4">Address:</h5>
          <ul className="list-unstyled">
            <li><strong>Street:</strong> {street}</li>
            <li><strong>Suite:</strong> {suite}</li>
            <li><strong>City:</strong> {city}</li>
            <li><strong>Zipcode:</strong> {zipcode}</li>
            <li><strong>Geolocation:</strong> {geo.lat} (latitude), {geo.lng} (longitude)</li>
          </ul>
          {/* <NavLink to='/users'> */}
            <button onClick={() => {
              changeIsDetails(null)
              navigate('/users');
            }} className="btn btn-secondary mt-3">
              Close
            </button>
          {/* </NavLink> */}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;
