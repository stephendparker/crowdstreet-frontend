import React from "react";
import "./BasicLayout.css"

interface IProps
{
    children: React.ReactNode;
}

export class BasicLayout extends React.Component<IProps>
{
    render()
    {
        return (
            <div>
                <div className="header">
                    <h1>Investment Application</h1>
                </div>

                <div className="page-content">
                    {this.props.children}
                </div>

                <div className="footer">
                    <div className="footer-content">
                        Footer type stuff here
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicLayout;