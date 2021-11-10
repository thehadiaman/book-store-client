import React from "react";
import {Tabs, Tab} from '@mui/material';
import Svgs from "./svgs";
import {Container} from "@mui/material";

class TabComponent extends Svgs {

    getIndicatorColor=()=>{
        return (this.props.value==="cancelled")? "#d20c2c" : "rgb(25, 118, 210)";
    }

    render() {
        const {value} = this.props;
        const style={
            width: "20%"
        }

        return (
            <Container>
                <Tabs indicatorColor={value==='cancelled'?'secondary':'primary'} scrollButtons={true} value={value} variant={'scrollable'} onChange={this.props.handleChange}>
                    <Tab style={style} icon={this.renderOrderedIcon(value==='ordered')} label="ordered" value={'ordered'} />
                    <Tab style={style} icon={this.renderPackedIcon(value==='packed')} label="packed" value={'packed'} />
                    <Tab style={style} icon={this.renderShippedIcon(value==='shipped')} label="shipped" value={'shipped'} />
                    <Tab style={style} icon={this.renderDeliveredIcon(value==='delivered')} label="delivered" value={'delivered'} />
                    <Tab style={value==='cancelled'?{width: '20%', color: 'red'}:style} icon={this.renderCancelledIcon(value==='cancelled')} label='cancelled' value={'cancelled'} />
                </Tabs>
            </Container>
        );
    }
}

export default TabComponent;