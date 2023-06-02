import React from "react";
import {Outlet} from "react-router-dom"
import ProfileNav from "../components/ProfileNav";

function Profile(){
    return(
        <React.Fragment>
            <div className="grid mx-2 my-4">
                <div className="justify-self-center w-3/4">
                    <h1 className="text-2xl">Your Account</h1>
                    <ProfileNav />
                </div>
            </div>
            <div className="justify-self-start">
                <Outlet />
            </div>

        </React.Fragment>
    )
}

export default Profile;
