import * as React from 'react';
import { ComboBox, IComboBoxOption } from 'office-ui-fabric-react/lib/ComboBox';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';

export interface ITableEditCellProps {
    options: any[],
    itemIndex: number,
    selectedKey: string | number | undefined,
    column: IColumn,
    customValue: string | undefined,
    updateDataTableItemFunc: (itemIndex: number, fieldName: string | undefined, fieldValue: string) => void
  }
  
  export class TableEditCell extends React.Component<ITableEditCellProps, any> {
    render() {
  
        return (          
            <ComboBox
                selectedKey={this.props.selectedKey}
                allowFreeform={true}
                options={this.props.options}
                onChanged={this._onChanged}
                text={this.props.customValue ? this.props.customValue.toString() : ""}
                onMenuOpen={() => console.log('ComboBox menu opened')}
                onPendingValueChanged={(option, pendingIndex, pendingValue) =>
                    console.log(
                        'Preview value was changed. Pending index: ' + pendingIndex + '. Pending value: ' + pendingValue
                    )
                }
            />
        )
    }
  
    private _onChanged = (option: IComboBoxOption, index: number, value: string): void => {
        console.log('_comboBoxOnChanged() is called: option = ' + JSON.stringify(option), index, value);
        if (option !== undefined) {
            console.log(option.key + " " + option.text);
            this.props.updateDataTableItemFunc(this.props.itemIndex, this.props.column.fieldName, option.text)
        } 
        else if (value !== undefined) {
            this.props.updateDataTableItemFunc(this.props.itemIndex, this.props.column.fieldName, value)
        }
    };
  }