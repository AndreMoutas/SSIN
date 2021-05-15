import React from "react";
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';

function SideBar() {
    return (
        <ProSidebar>
            <Menu iconShape="square">
                <MenuItem >Authentication</MenuItem>
                <SubMenu title="Features" >
                    <MenuItem>Operations</MenuItem>
                    <MenuItem>Messages</MenuItem>
                </SubMenu>
            </Menu>
        </ProSidebar>
    );
}

export default SideBar;