import {
  DetailsList,
  IColumn
} from 'office-ui-fabric-react/lib/DetailsList';
import * as React from 'react';
import { TableEditCell } from './TableEditCell';

interface IAppProps {

}

interface IAppState {
  dataTable: any[],
  columns: any[]
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
    this.templateFields = ["Name", "Email", "Age", "State"];

    this.state = {
      dataTable: [
        {
          Name: "Alex",
          Email: "alex@domain.com",
          Age: 32,
          State: "NY"
        },
        {
          Name: "John",
          Email: "john@domain.com",
          Age: 33,
          State: "LA"
        },
        {
          Name: "Max",
          Email: "max@domain.com",
          Age: 32,
          State: "NY"
        },
        {
          Name: "Victoria",
          Email: "vika@domain.com",
          // Age: 0,
          State: "AK"
        },
        {
          Name: "Martin",
          Email: "martin@domain.com",
          // Age: 0,
          State: "AZ"
        },
        {
          Name: "Donald",
          Email: "donald@domain.com",
          // Age: 0,
          State: "AL"
        }
      ],
      columns: this._buildColumns()
    }
  }

  private templateFields: string[];

  public render() {
    return (
      <div>
        <DetailsList
          className="fieldMappingTable"
          compact={true}
          items={this.state.dataTable}
          setKey="set"
          columns={this.state.columns}
          onRenderItemColumn={this._renderItemColumnEditMode}
          onColumnHeaderClick={this._onColumnClick}
        />
      </div>
    );
  }

  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    // Sort the items.
    let sortedItems = this.state.dataTable.concat([]).sort((a, b) => {
      const firstValue = a[column.fieldName || ''];
      const secondValue = b[column.fieldName || ''];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      dataTable: sortedItems,
      columns: columns!.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  };

  private _renderItemColumnEditMode = (item: any, itemIndex: number, column: IColumn) => {

    console.log('_renderItemColumnEditMode()');

    //Generate options for DropDown
    var options = this.createOptionsForComboBox(item);
    let selectedKey = column.name;
    let customValue = item[column.name];

    return (
      <TableEditCell
        options={options}
        itemIndex={itemIndex}
        updateDataTableItemFunc={this.updateDataTableItemProperty}
        column={column}
        selectedKey={selectedKey}
        customValue={customValue}
      ></TableEditCell>
    );

  }

  public updateDataTableItemProperty = (itemIndex: number, fieldName: string | undefined, fieldValue: string): void => {
    if (typeof fieldName !== 'undefined') {
      var dataTable = Object.assign([], this.state.dataTable);
      dataTable[itemIndex][fieldName] = fieldValue;
      this.setState({ dataTable });
    }
  }

  private createOptionsForComboBox = (object: any) => {
    var entries = Object.entries(object);
    var options = entries.filter(item => item[1] != true && item[1] != null).map(item => {
      var key = item[0];
      var text: string = item[1].toString();
      return { key: key, text: text }
    });
    return options
  }

  private _buildColumns = () => {
    var columns: IColumn[] = new Array();

    for (let index = 0; index < this.templateFields.length; index++) {
      const element = this.templateFields[index];
      columns.push(
        {
          key: index.toString(),
          name: element,
          fieldName: element,
          minWidth: 100,
          maxWidth: 200,
          isResizable: true
        }
      )
    }

    return columns;
  }
}

export default App;
