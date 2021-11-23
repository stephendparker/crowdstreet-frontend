import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import BasicLayout from '../../layout/BasicLayout';
import * as applicationStore from '../../features/application/applicationSlice';

function SuccessPage()
{
    const applicationResult = useAppSelector(applicationStore.selectResult);

    if (applicationResult !== undefined && applicationResult.qualify === false) 
    {
        return <Navigate to="/disqualification" />;
    }
    if (applicationResult === undefined)
    {
        return <Navigate to="/" />;
    }

    return (
        <BasicLayout>
            <div>
                Congratulations you qualified
            </div>
            <div>
                Next steps:
                <ul>
                    <li>Call 123-456-789</li>
                    <li>Meet at the corner of Smith and Frank street with a briefcase full of money</li>
                    <li>Give briefcase to man in yellow hat</li>
                </ul>
            </div>
            <div>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </div>
        </BasicLayout>
    );
}

export default SuccessPage;