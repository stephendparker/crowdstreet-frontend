
import React from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "../../app/hooks";
import BasicLayout from '../../layout/BasicLayout';
import * as applicationStore from '../../features/application/applicationSlice';


const DisqualificationPage = () =>
{
    const applicationResult = useAppSelector(applicationStore.selectResult);

    if (applicationResult !== undefined && applicationResult.qualify) 
    {
        return <Navigate to="/success" />;
    }
    if (applicationResult === undefined) 
    {
        return <Navigate to="/" />;
    }

    return (
        <BasicLayout>
            Sorry, you did not qualify

            <div>
                {applicationResult.disqualificationMessage}
            </div>

            <div>
                Please contact customer service at 1-800-CRD-STRT
            </div>
        </BasicLayout>
    );
}

export default DisqualificationPage;