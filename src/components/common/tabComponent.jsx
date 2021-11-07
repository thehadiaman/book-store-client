import React from "react";
import {Tabs, Tab} from '@mui/material';
import Svgs from "./svgs";
import {Container} from "@mui/material";

class TabComponent extends Svgs {

    getIndicatorColor=()=>{
        return (this.props.value==="cancelled")? "#d20c2c" : "rgb(25, 118, 210)";
    }

    render() {
        const {value, user} = this.props;
        const width = (user && user.type!=='delivery_partner')?"20%":"25%";
        const style={
            width: width
        }

        return (
            <Container>
                <Tabs indicatorColor={value==='cancelled'?'secondary':'primary'} scrollButtons={true} value={value} variant={'scrollable'} onChange={this.props.handleChange}>
                    <Tab style={style} icon={this.renderOrderedIcon(value==='ordered')} label="ordered" value={'ordered'} />
                    <Tab style={style} icon={this.renderPackedIcon(value==='packed')} label="packed" value={'packed'} />
                    <Tab style={style} icon={this.renderShippedIcon(value==='shipped')} label="shipped" value={'shipped'} />
                    <Tab style={style} icon={this.renderDeliveredIcon(value==='delivered')} label="delivered" value={'delivered'} />
                    {user.type!=='delivery_partner' && <Tab style={value==='cancelled'?{width: '20%', color: 'red'}:style} icon={this.renderCancelledIcon(value==='cancelled')} label='cancelled' value={'cancelled'} />}
                </Tabs>
            </Container>
        );
    }
}

export default TabComponent;