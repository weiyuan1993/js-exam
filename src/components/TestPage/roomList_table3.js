import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from "mui-datatables";

const columns = ["Name", "Company", "City", "State"];

const data = [
    ["Joe James", "Test Corp", "Yonkers", "NY"],
    ["John Walsh", "Test Corp", "Hartford", "CT"],
    ["Bob Herm", "Test Corp", "Tampa", "FL"],
    ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
    filterType: 'checkbox',
};

class EnhancedTable extends React.Component {

    render() {
        return (
            <MUIDataTable
                title={"Employee List"}
                data={data}
                columns={columns}
                options={options}
            />
        );
    }
}

const styles = theme => ({
    // root: {
    //     width: '100%',
    //     marginTop: theme.spacing.unit * 3,
    // },
    // table: {
    //     minWidth: 1020,
    // },
    // tableWrapper: {
    //     overflowX: 'auto',
    // },
});

export default withStyles(styles)(EnhancedTable);
