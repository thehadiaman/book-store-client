import React, {Component} from "react";
// import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import {Box, Table, TableBody, TableContainer, TableCell, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar,
    Typography, Paper, Checkbox, IconButton, Tooltip} from '@mui/material';
import {Delete as DeleteIcon, Edit as EditIcon, Add as AddBoxIcon} from '@mui/icons-material';
import { visuallyHidden } from '@mui/utils';
import {Link} from "react-router-dom";

class TableComponent extends Component {

    state={
        order: 'asc',
        orderBy: 'title',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        headCells: this.props.headCells,
        rows: this.props.data
    }

    descendingComparator = (a, b, orderBy) => {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    getComparator = (order, orderBy) => {
        return order === 'desc'
            ? (a, b) => this.descendingComparator(a, b, orderBy)
            : (a, b) => -this.descendingComparator(a, b, orderBy);
    }

    stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    handleRequestSort = (event, property) => {
        const {orderBy, order} = this.state;
        const isAsc = orderBy === property && order === 'asc';
        this.setState({order: isAsc ? 'desc' : 'asc', orderBy: property});
    };

    handleSelectAllClick = (event) => {

        if (event.target.checked) {
            const newSelected = this.state.rows.map((n) => n._id);
            this.setState({selected: newSelected});
            return;
        }
        this.setState({selected: []});
    };

    handleClick = (event, _id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(_id);
        let newSelected = [];

        if (selectedIndex===-1) {
            newSelected = newSelected.concat(selected, _id);
        } else if (selectedIndex===0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({selected: newSelected})
    };

    handleChangePage = (event, newPage) => {
        this.setState({page: newPage});
    };

    handleChangeRowsPerPage = (event) => {
        this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
    };

    isSelected = (_id) => this.state.selected.indexOf(_id) !== -1;

    emptyRows = ()=>{
        const {page, rowsPerPage} = this.state;
        return page > 0 ? Math.max(0, (1 + page) * rowsPerPage - this.state.rows.length) : 0;
    }

    render() {
        const {selected, page, rowsPerPage, orderBy, order, headCells, rows} = this.state;

        const enhancedTableToolbar = () => {
            const numSelected = selected.length;

            return (
                <Toolbar
                    sx={{
                        pl: { sm: 2 },
                        pr: { xs: 1, sm: 1 },
                        ...(numSelected > 0 && {
                            bgcolor: (theme) =>
                                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                        }),
                    }}
                >
                    {numSelected > 0 ? (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            color="inherit"
                            variant="subtitle1"
                            component="div"
                        >
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography
                            sx={{ flex: '1 1 100%' }}
                            variant="h6"
                            id="tableTitle"
                            component="div"
                        >
                            Books
                        </Typography>
                    )}

                    {
                        numSelected===1 && (
                            <Tooltip title="Edit">
                                <IconButton onClick={()=>{console.log(selected)}}>
                                    <EditIcon fontSize={'large'} />
                                </IconButton>
                            </Tooltip>
                        )
                    }

                    {numSelected > 0 ? (
                        <Tooltip title="Delete">
                            <IconButton onClick={()=>{console.log(selected)}}>
                                <DeleteIcon fontSize={'large'} />
                            </IconButton>
                        </Tooltip>
                    ) : (
                        <Tooltip title="Add">
                            <Link to={this.props.newObjectLink}>
                                <IconButton>
                                    <AddBoxIcon fontSize={'large'} />
                                </IconButton>
                            </Link>
                        </Tooltip>
                    )}
                </Toolbar>
            );
        };

        const enhancedTableHead = () => {
            const numSelected = selected.length;
            const rowCount = rows.length;
            const onRequestSort = this.handleRequestSort;
            const createSortHandler = (property) => (event) => {
                onRequestSort(event, property);
            };

            return (
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                color="primary"
                                indeterminate={numSelected > 0 && numSelected < rowCount}
                                checked={rowCount > 0 && numSelected === rowCount}
                                onChange={this.handleSelectAllClick}
                                inputProps={{
                                    'aria-label': 'select all desserts',
                                }}
                            />
                        </TableCell>
                        {headCells.map((headCell) => (
                            <TableCell
                                key={headCell.id}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <Box component="span" sx={visuallyHidden}>
                                            {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                        </Box>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
            );
        }

        const punctuationCondition = (authors, author)=>{
            if(authors.length>1 && authors[authors.length-1] !== author)
                return <span>, </span>
        }

        return (
            <Box sx={{ width: '100%' }}>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    {enhancedTableToolbar()}
                    <TableContainer>
                        <Table
                            sx={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                            size={'medium'}
                        >
                            {enhancedTableHead()}
                            <TableBody>
                                {this.stableSort(rows, this.getComparator(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row, index) => {
                                        const isItemSelected = this.isSelected(row._id);
                                        const labelId = `enhanced-table-checkbox-${index}`;

                                        return (
                                            <TableRow
                                                hover
                                                onClick={(event) => this.handleClick(event, row._id)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row._id}
                                                selected={isItemSelected}
                                            >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={isItemSelected}
                                                        inputProps={{
                                                            'aria-labelledby': labelId,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                >
                                                    <Link to={`/book/${row._id}`} className={'link-title'}>{row.title.toUpperCase()}</Link>
                                                </TableCell>
                                                <TableCell>{row.author.map(author=>
                                                    <span key={author}>{author}{punctuationCondition(row.author, author)}</span>
                                                )}</TableCell>
                                                <TableCell>{row.price}</TableCell>
                                                <TableCell>{row.rating}</TableCell>
                                                <TableCell>{row.sales}</TableCell>
                                            </TableRow>
                                        );
                                    })}
                                {this.emptyRows > 0 && (
                                    <TableRow
                                        style={{
                                            height: (53) * this.emptyRows,
                                        }}
                                    >
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={this.handleChangePage}
                        onRowsPerPageChange={this.handleChangeRowsPerPage}
                    />
                </Paper>
            </Box>
        );
    }
}

export default TableComponent;