import { useState , useEffect} from "react";
import EmployeeService from "../services/EmployeeService";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
function MyProfile() {
    const [profileInfo, setProfileInfo] = useState({});
    const navigate = useNavigate();
    const [token, setToken] = useState(EmployeeService.getToken());

    useEffect(()=>{
        fecthProfileInfo();
    },[])

    const fecthProfileInfo = async () => {
        try{
            const response = await EmployeeService.getYourProfile(token)
            console.log(response.employee);
            swal("Successful", `Xin chào ${response.employee.empName}`, "success")
            setProfileInfo(response.employee);
        }catch(error){
            console.log(error);
        }
    }
    
    return (
        <div>
            <br></br>
            <div className="card col-md-6 offset-md-3">
                <h3 className="text-center">My Profile</h3>
                <div className="card-body text-center">
                    <div className="row">
                        <label>Employee No: </label>
                        <div>{profileInfo.id}</div>
                    </div>
                    <div className="row">
                        <label>Employee Name: </label>
                        <div>{profileInfo.empName}</div>
                    </div>
                    <div className="row">
                        <label>Username: </label>
                        <div>{profileInfo.username}</div>
                    </div>
                    <div className="row">
                        <label>Employee position: </label>
                        <div>{profileInfo.position}</div>
                    </div>
                </div>
            </div>
        </div>
    )
   
}

export default MyProfile;