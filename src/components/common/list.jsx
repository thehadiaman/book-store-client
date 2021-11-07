import React from "react";
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";

function Lists ({rows, head, properties}) {
    console.log(rows);
    return (
        <TableContainer>
            <Table aria-label="simple table" className={'table-list'}>
                <TableHead>
                    <TableRow>
                        {head.map(h=><TableCell style={{fontWeight: 'bold'}} key={`${h}head`} align="left">{h.toUpperCase()}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => {
                        if(row.cartItems) {
                            row.cartItems.total = row.cartItems.price * row.cartItems.quantity;
                            return <TableRow key={row.cartItems._id}>
                                {properties.map(p => <TableCell align="left" key={`${p}cell`}
                                >{String(row.cartItems[p]).toUpperCase()}</TableCell>)}
                            </TableRow>
                        }else{
                            return <TableRow key={row._id}>
                                {properties.map(p => <TableCell align="left" key={`${p}cell`}
                                >{p==='action'? row[p]():  String(row[p]).toUpperCase()}</TableCell>)}
                            </TableRow>
                        }

                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default Lists;