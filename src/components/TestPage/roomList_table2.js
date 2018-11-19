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
    onRowClick: (rowData, rowMeta) => {
        console.log(rowData, rowMeta);

    }
    // onRowsSelect: (currentRowsSelected, allRowsSelected) => {
    //     const newRowsSelected
    //     currentRowsSelected
    // }
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

export default withStyles(styles)(EnhancedTable);
