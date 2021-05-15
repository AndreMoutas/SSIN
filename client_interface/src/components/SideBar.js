import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom'
import 'react-pro-sidebar/dist/css/styles.css';

function SideBar() {
    return (
        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem ><Link to="/">Authentication</Link></MenuItem>
                <SubMenu title="Features" >
                    <MenuItem><Link to="/operations">Operations</Link></MenuItem>
                    <MenuItem>Messages</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    );
}

export default SideBar;